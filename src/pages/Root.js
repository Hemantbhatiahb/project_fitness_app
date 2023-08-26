import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import { Box } from "@mui/material";
import Footer from "../assets/Footer";

function RootPage() {
  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
}

export default RootPage;
