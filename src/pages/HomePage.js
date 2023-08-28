import React from "react";
import HeroBanner from "../components/banner/HeroBanner";
import SearchExercises from "../components/search/SearchExercises";
import Exercises from "../components/exercises/Exercises";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { exerciseOptions, fetchData } from "../utils/FetchData";
import { useDispatch } from "react-redux";
import { exSliceActions } from "../store/exerciseSlice";
import { json } from "react-router-dom";
import Footer from "../assets/Footer";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
        dispatch(exSliceActions.setExercises(exercisesData));
        dispatch(exSliceActions.filterExercises(exercisesData));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllExercises();
  }, [dispatch]);

  return (
    <Box>
      <HeroBanner />
      <SearchExercises />
      <Exercises />
      <Footer />
    </Box>
  );
}

export const loader = async () => {
  const response = await fetch(
    "https://exercisedb.p.rapidapi.com/exercises",
    exerciseOptions
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch Exercises" }, { status: "500" });
  } else {
    return response;
  }
};

export default HomePage;
