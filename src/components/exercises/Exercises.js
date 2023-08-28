import React, { useEffect, useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import ExerciseCard from "../reusable/ExerciseCard";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import Loader from "../reusable/Loader";

const Exercises = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filteredExercises: exercises } = useSelector(
    (state) => state.exSlice
  );
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  useEffect(() => {
    setIsLoading(true);
    if (exercises.length <= 0) {
      setError("no Exercise Found");
    } else {
      setError(null);
    }
    setIsLoading(false);
  }, [exercises]);

  let data = "";
  if (isLoading) {
    data = <Loader />;
  } else if (error) {
    data = <Typography variant="h5">No data found!</Typography>;
  } else {
    data = currentExercises.map((exercise) => (
      <ExerciseCard key={exercise.id} exercise={exercise} />
    ));
  }

  console.log(data);
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
      <Stack
        direction="row"
        sx={{ gap: { lg: "107px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {data}
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
    </Box>
  );
};

export default Exercises;
