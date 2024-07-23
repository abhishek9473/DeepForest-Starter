import React, { useEffect } from "react";
import Navbar from "../../common/Navbar";
import { Stack } from "@mui/material";
import { getAuth, getUid } from "../../../services/identity";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <Stack>
      <Navbar />
    </Stack>
  );
};

export default Home;
