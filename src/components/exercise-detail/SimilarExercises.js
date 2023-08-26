import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import HorizontalScrollbar from "../reusable/HorizontalScrollBar";
import Loader from "../reusable/Loader";

const SimilarExercises = ({ exercises, title }) => {
  console.log("exercises", exercises);
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0px" } }}>
      <Typography
        sx={{ fontSize: { lg: "36px", xs: "25px" }, ml: "20px" }}
        fontWeight={700}
        color="#000"
        mb="33px"
      >
        Similar {title} exercises
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: "relative" }}>
        {exercises.length !== 0 ? (
          <HorizontalScrollbar data={exercises} />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
