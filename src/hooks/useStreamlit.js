import { useState } from "react";

export const useStreamlit = () => {
  const [streamlitComponent, setStreamlitComponent] = useState(null);

  return { streamlitComponent, setStreamlitComponent };
};