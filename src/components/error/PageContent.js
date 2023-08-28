import React from "react";
import { Stack, Typography } from "@mui/material";

function PageContent({ title, message }) {
  return (
    <Stack spacing={3} alignItems='center' justifyContent="center" mt="100px">
      <Typography variant='h4'>{title}</Typography>
      <Typography sx={{fontSize : {lg:'22px',xs:'18px'}}}>{message}</Typography>
    </Stack>
  );
}

export default PageContent;
