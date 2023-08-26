import React, { useState, useEffect } from "react";
import { Stack, Typography, Box } from "@mui/material";
import ExerciseCard from "../reusable/ExerciseCard";
import Pagination from "@mui/material/Pagination";
import { fetchData, exerciseOptions } from "../../utils/FetchData";
import Loader from "../reusable/Loader";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];
      setIsLoading(true);
      try {
        if (bodyPart === "all") {
          exercisesData = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises",
            exerciseOptions
          );
        } else {
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
            exerciseOptions
          );
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      setExercises(exercisesData);
    };
    fetchExercisesData();
  }, [bodyPart, setExercises]);

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Box id="exercises" p="20px" mt="50px" sx={{ mt: { lg: "110px" } }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="46px"
      >
        Showing Results
      </Typography>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Stack
            direction="row"
            sx={{ gap: { lg: "107px", xs: "50px" } }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {currentExercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
          </Stack>
          <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
            {exercises.length > 9 && (
              <Pagination
                page={currentPage}
                onChange={paginate}
                color="standard"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(exercises.length / exercisesPerPage)}
                size="large"
              />
            )}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Exercises;
