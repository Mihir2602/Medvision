import React, { useContext } from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faNotesMedical,
  faLungs,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import { useStreamlit } from "../hooks/useStreamlit";


const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: "3rem",
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const forms = [
  { title: "Breast Cancer Screening", icon: faHeartbeat, color: "#FF69B4" },
  { title: "Brain Tumour", icon: faBrain, color: "#4CAF50" },
  
 
];

const Medivision = () => {
 
  const { streamlitComponent, setStreamlitComponent } = useStreamlit();
 

  const handleFormSubmit = async (formTitle) => {
   
    
    let streamlitUrl = '';

    if (formTitle === "Brain Tumour") {
      streamlitUrl = 'https://heart-disease-4wq3.onrender.com/';
    } else if (formTitle === "Breast Cancer Screening") {
      streamlitUrl = 'https://flask-tumor-prediction.onrender.com/';
    } else {
      console.error('Unhandled form:', formTitle);
      return;
    }

    // Open the Streamlit app in a new tab
    window.open(streamlitUrl, '_blank');
  
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Health Forms
      </Typography>
      <Grid container spacing={3}>
        {forms.map((form, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <IconWrapper>
                  <FontAwesomeIcon icon={form.icon} style={{ color: form.color }} />
                </IconWrapper>
                <Typography gutterBottom variant="h5" component="div">
                  {form.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Fill out this form to assess Medivision
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: "auto" }}
                  onClick={() => handleFormSubmit(form.title)}
                >
                  Start Form
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      {streamlitComponent && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Streamlit Output
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: streamlitComponent }} />
        </Box>
      )}
    </Box>
  );
};

export default Medivision;