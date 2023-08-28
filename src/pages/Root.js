import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import { Box } from "@mui/material";

function RootPage() {
  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </Box>
  );
}

export default RootPage;
