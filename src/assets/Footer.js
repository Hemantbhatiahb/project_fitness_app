import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/images/Logo.png";

const Footer = () => (
  <Box mt="100px" bgcolor="#FFF3F4" >
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent:'center'}}
      flexWrap="wrap"
      spacing={3}
      px="50px"
      py="40px"
    >

    <img src={Logo} alt="logo" style={{ width: "48px", height: "48px " }} />
    <Typography
      sx={{ fontSize: { lg: "20px", xs: "16px" } , fontWeight:'lighter' }}
      textAlign="center"
      >
      Footer Section
    </Typography>
      </Stack>
  </Box>
);

export default Footer;
