import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "darkslategray",
        color: "white",
      }}
    >
      <Typography variant="h1" component="h2" sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
        Page Not Found
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Stack>
  );
};

export default NotFound;
