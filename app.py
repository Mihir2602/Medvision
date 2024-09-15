import streamlit as st
from PIL import Image
import io
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from scipy import ndimage
import plotly.graph_objects as go
import matplotlib.pyplot as plt
import base64
import jinja2

# Global variable for the AI model
model = None




def load_model():
    global model
    model = tf.keras.models.load_model('brain_tumor_detection_model (1).h5')


def predict_tumor(image):
    img = image.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, 0)
    prediction = model.predict(img_array)
    return prediction[0][0]


def load_and_preprocess(image):
    img_array = np.array(image.convert('L'))
    img_array = ndimage.gaussian_filter(img_array, sigma=1.5)
    p2, p98 = np.percentile(img_array, (2, 98))
    img_array = np.clip(img_array, p2, p98)
    scaler = MinMaxScaler()
    img_array = scaler.fit_transform(img_array)
    return img_array


def extract_tumor(img_array, threshold=0.6):
    tumor_mask = img_array > threshold
    tumor_array = np.zeros_like(img_array)
    tumor_array[tumor_mask] = img_array[tumor_mask]
    return tumor_array, tumor_mask


def create_3d_plot(img_array, tumor_mask):
    x = np.arange(0, img_array.shape[1], 1)
    y = np.arange(0, img_array.shape[0], 1)
    x, y = np.meshgrid(x, y)
    img_array_colored = np.where(tumor_mask, img_array * 1.5, img_array)
    fig = go.Figure(data=[go.Surface(z=img_array_colored, x=x, y=y, colorscale='plasma')])
    fig.update_layout(title='3D MRI Scan Visualization with Tumor Highlighted',
                      scene=dict(xaxis_title='X (pixels)', yaxis_title='Y (pixels)', zaxis_title='Intensity',
                                 bgcolor='black'),
                      width=800, height=700, margin=dict(l=65, r=50, b=65, t=90))
    return fig


def generate_html_report(patient_info, tumor_info, img_array, tumor_array, fig_3d):
    # Convert 2D images to base64
    img_buffer = io.BytesIO()
    plt.figure(figsize=(12, 6))
    plt.subplot(121)
    plt.imshow(img_array, cmap='gray')
    plt.title('Original Image')
    plt.subplot(122)
    plt.imshow(tumor_array, cmap='gray')
    plt.title('Extracted Tumor')
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)
    img_base64 = base64.b64encode(img_buffer.getvalue()).decode()

    # Convert 3D plot to JSON
    plot_json = fig_3d.to_json()

    # HTML template
    template = jinja2.Template("""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Brain Tumor Detection Report</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        <style>
            body {
                background-color: #f8f9fa;
            }
            .custom-shadow {
                box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
            }
            .custom-card-header {
                background-color: #007bff;
                color: white;
            }
            #plotly-div {
                height: 600px;
            }
        </style>
    </head>
    <body>
        <div class="container py-5">
            <h1 class="text-center mb-5">Brain Tumor Detection Report</h1>

            <div class="row mb-4">
                <div class="col-md-6 mb-4 mb-md-0">
                    <div class="card custom-shadow h-100">
                        <div class="card-header custom-card-header">
                            <h2 class="h4 mb-0">Patient Information</h2>
                        </div>
                        <div class="card-body">
                            <p><strong>Name:</strong> {{ patient_info['name'] }}</p>
                            <p><strong>Age:</strong> {{ patient_info['age'] }}</p>
                            <p><strong>Gender:</strong> {{ patient_info['gender'] }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card custom-shadow h-100">
                        <div class="card-header custom-card-header">
                            <h2 class="h4 mb-0">Tumor Analysis Results</h2>
                        </div>
                        <div class="card-body">
                            <p><strong>Tumor Detected:</strong> 
                                <span class="badge {% if tumor_info['detected'] %}bg-danger{% else %}bg-success{% endif %}">
                                    {{ 'Yes' if tumor_info['detected'] else 'No' }}
                                </span>
                            </p>
                            {% if tumor_info['detected'] %}
                                <p><strong>Tumor Probability:</strong> {{ '{:.2%}'.format(tumor_info['probability']) }}</p>
                                <p><strong>Tumor Location:</strong> {{ tumor_info['location'] }}</p>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-danger" role="progressbar" style="width: {{ tumor_info['probability'] * 100 }}%"
                                         aria-valuenow="{{ tumor_info['probability'] * 100 }}" aria-valuemin="0" aria-valuemax="100">
                                        {{ '{:.2%}'.format(tumor_info['probability']) }}
                                    </div>
                                </div>
                            {% endif %}
                        </div>
                    </div>
                </div>
            </div>

            <div class="card custom-shadow mb-4">
                <div class="card-header custom-card-header">
                    <h2 class="h4 mb-0">MRI Scan Analysis</h2>
                </div>
                <div class="card-body">
                    <img src="data:image/png;base64,{{ img_base64 }}" alt="MRI Scan Analysis" class="img-fluid rounded">
                </div>
            </div>

            <div class="card custom-shadow">
                <div class="card-header custom-card-header">
                    <h2 class="h4 mb-0">3D MRI Visualization</h2>
                </div>
                <div class="card-body">
                    <div id="plotly-div"></div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
        <script>
            var plotlyJson = {{ plot_json | safe }};
            Plotly.newPlot('plotly-div', plotlyJson.data, plotlyJson.layout);
        </script>
    </body>
    </html>
    """)

    # Render the template
    html_report = template.render(
        patient_info=patient_info,
        tumor_info=tumor_info,
        img_base64=img_base64,
        plot_json=plot_json
    )

    return html_report


def main():
    st.set_page_config(page_title="Brain Tumor Detection", layout="wide")

    # Set up sidebar navigation
    st.sidebar.title("Navigation")
    page = st.sidebar.radio("Go to", ["Upload MRI Scan", "Consultation", "Report"])

    # Page: Upload MRI Scan
    if page == "Upload MRI Scan":
        st.title("Upload MRI Scan")

        uploaded_file = st.file_uploader("Choose an MRI scan file", type=["jpg", "jpeg", "png", "dcm"])

        if uploaded_file is not None:
            if uploaded_file.type in ["image/jpeg", "image/png"]:
                image = Image.open(uploaded_file)
                st.image(image, caption="Uploaded MRI scan", use_column_width=True)

                if st.button("Analyze Scan"):
                    with st.spinner("Analyzing the MRI scan..."):
                        tumor_probability = predict_tumor(image)
                        st.session_state['tumor_probability'] = tumor_probability
                        st.session_state['image'] = image

                    st.success("Analysis complete!")
                    st.write(f"Tumor probability: {tumor_probability:.2%}")

                    if tumor_probability > 0.5:
                        st.warning("Potential tumor detected. Please proceed to consultation.")
                    else:
                        st.info(
                            "No significant tumor indicators detected. Please proceed to consultation for further evaluation.")

            elif uploaded_file.type == "application/dicom":
                st.write("DICOM file detected. Support for DICOM files is coming soon.")
            else:
                st.error("Unsupported file format. Please upload a JPG, PNG, or DICOM file.")

    # Page: Consultation
    elif page == "Consultation":
        st.title("Consultation")

        if 'tumor_probability' not in st.session_state or 'image' not in st.session_state:
            st.warning("Please upload and analyze an MRI scan before consultation.")
        else:
            st.subheader("Patient Information")
            patient_name = st.text_input("Patient Name")
            patient_age = st.number_input("Patient Age", min_value=0, max_value=120)
            patient_gender = st.selectbox("Patient Gender", ["Male", "Female", "Other"])

            st.subheader("Tumor Analysis Results")
            st.write(f"Tumor Probability: {st.session_state['tumor_probability']:.2%}")

            if st.session_state['tumor_probability'] > 0.5:
                tumor_location = st.text_input("Suspected Tumor Location")
            else:
                tumor_location = "N/A"

            st.subheader("Advanced MRI Analysis")
            img_array = load_and_preprocess(st.session_state['image'])
            tumor_array, tumor_mask = extract_tumor(img_array)

            fig_3d = create_3d_plot(img_array, tumor_mask)
            st.plotly_chart(fig_3d)

            if st.button("Save Consultation"):
                st.session_state['patient_info'] = {
                    "name": patient_name,
                    "age": patient_age,
                    "gender": patient_gender
                }
                st.session_state['tumor_info'] = {
                    "detected": st.session_state['tumor_probability'] > 0.5,
                    "probability": st.session_state['tumor_probability'],
                    "location": tumor_location
                }
                st.session_state['img_array'] = img_array
                st.session_state['tumor_array'] = tumor_array
                st.session_state['fig_3d'] = fig_3d
                st.success("Consultation data saved successfully!")

    # Page: Report
    elif page == "Report":
        st.title("Report Generation")

        if 'patient_info' not in st.session_state or 'tumor_info' not in st.session_state:
            st.warning("Please complete a consultation before generating a report.")
        else:
            patient_info = st.session_state['patient_info']
            tumor_info = st.session_state['tumor_info']
            img_array = st.session_state['img_array']
            tumor_array = st.session_state['tumor_array']
            fig_3d = st.session_state['fig_3d']

            st.subheader("Generate Report")

            if st.button("Generate HTML Report"):
                with st.spinner("Generating report..."):
                    html_report = generate_html_report(patient_info, tumor_info, img_array, tumor_array, fig_3d)
                    st.success("Report generated successfully!")

                    # Provide download link
                    b64 = base64.b64encode(html_report.encode()).decode()
                    href = f'<a href="data:text/html;base64,{b64}" download="Tumor_Detection_Report.html">Download the HTML report</a>'
                    st.markdown(href, unsafe_allow_html=True)


if __name__ == "__main__":
    load_model()
    main()