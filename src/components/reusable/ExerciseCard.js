import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Button
          sx={{
            borderRadius: "20px",
            ml: "21px",
            backgroundColor: "#ffa9a9",
            color: "#fff",
            fontSize: "14px",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#ff4d4d",
            },
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            borderRadius: "20px",
            ml: "21px",
            backgroundColor: "#fcc757",
            color: "#fff",
            fontSize: "14px",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#faac05",
            },
          }}
        >
          {exercise.target}
        </Button>
      </Stack>
      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        sx={{ fontSize: { lg: "24px", xs: "20px" } }}
        mt="11px"
        pb="10px"
        textTransform="capitalize"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
