import React from "react";
import HeroBanner from "../components/banner/HeroBanner";
import SearchExercises from "../components/search/SearchExercises";
import Exercises from "../components/exercises/Exercises";
import { Box } from "@mui/material";
import { useState } from "react";

function HomePage() {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
}

export default HomePage;
