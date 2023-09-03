import React, { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import Detail from "../components/exercise-detail/Detail";
import ExerciseVideos from "../components/exercise-detail/ExerciseVideos";
import SimilarExercises from "../components/exercise-detail/SimilarExercises";
import { Box } from "@mui/material";
import { exerciseOptions, fetchData, youtubeOptions } from "../utils/FetchData";
import Loader from "../components/reusable/Loader";
import Footer from "../assets/Footer";
import PageContent from "../components/error/PageContent";

function ExerciseDetailPage() {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [hasError, setHasError] = useState(false);
  // const allExercises = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);

  const { exerciseId } = useParams();

  // useEffect(() => {
  //   setIsLoading(true);
  //   window.scrollTo({ top: 0, behavior: "smooth" });

  //   const fetchExerciseData = async () => {
  //     const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
  //     const youtubeSearchUrl =
  //       "https://youtube-search-and-download.p.rapidapi.com";

  //     try {
  //       const exerciseDetailData = await fetchData(
  //         `${exerciseDbUrl}/exercises/exercise/${exerciseId}`,
  //         exerciseOptions
  //       );
  //       // const exerciseDetailData = allExercises.find(
  //       //   (exercise) => exercise.id === exerciseId
  //       // );
  //       setExerciseDetail(exerciseDetailData);
  //       const exerciseVideoData = await fetchData(
  //         `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
  //         youtubeOptions
  //       );
  //       setExerciseVideos(exerciseVideoData.contents);

  //       const targetMuscleExerciseData = await fetchData(
  //         `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
  //         exerciseOptions
  //       );

  //       const equipmentExerciseData = await fetchData(
  //         `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
  //         exerciseOptions
  //       );

  //       // const targetMuscleExerciseData = allExercises.filter(
  //       //   (exercise) => exercise.target === exerciseDetailData.target
  //       // );

  //       // const equipmentExerciseData = allExercises.filter(
  //       //   (exercise) => exercise.equipment === exerciseDetailData.equipment
  //       // );

  //       setIsLoading(false);
  //       setTargetMuscleExercises(targetMuscleExerciseData);
  //       setEquipmentExercises(equipmentExerciseData);
  //     } catch (error) {
  //       throw json({ message: "Could not fetch exercises" }, { status: "500" });
  //     }
  //   };

  //   fetchExerciseData();
  // }, [exerciseId]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchAllData = async () => {
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const fetchExerciseData = async () => {
        return fetch(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        )
          .then((response) => response.json())
          .then((allExercises) => allExercises)
          .catch((error) => error);
      };

      const fetchExerciseDetailData = (allExercises) => {
        return new Promise((resolve, reject) => {
          const exerciseDetailData = allExercises.find(
            (exercise) => exercise.id === exerciseId
          );
          if (exerciseDetailData) {
            resolve(exerciseDetailData);
          } else {
            reject("No exercise found with this Id.");
          }
        });
      };

      try {
        const allExercises = await fetchExerciseData();
        const exerciseDetailData = await fetchExerciseDetailData(allExercises);
        setExerciseDetail(exerciseDetailData);

        const exerciseVideoData = await fetchData(
          `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
          youtubeOptions
        );
        setExerciseVideos(exerciseVideoData.contents);
        setIsLoading(false);

        const targetMuscleExerciseData = allExercises.filter(
          (exercise) => exercise.target === exerciseDetailData.target
        );
        setTargetMuscleExercises(targetMuscleExerciseData);

        const equipmentExerciseData = allExercises.filter(
          (exercise) => exercise.equipment === exerciseDetailData.equipment
        );
        setEquipmentExercises(equipmentExerciseData);
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
        console.log(error);
      }
    };
    fetchAllData();
  }, [exerciseId]);


  return (
    <Box>
      {isLoading && !hasError && <Loader />}
      {hasError && <PageContent title="Not Found!" message="Could not find exercise"/>}
      {!isLoading && !hasError && (
        <React.Fragment>
          <Detail exerciseDetail={exerciseDetail} />
          <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          />
          <SimilarExercises exercises={targetMuscleExercises} title="target" />
          <SimilarExercises exercises={equipmentExercises} title="equipment" />
          <Footer />
        </React.Fragment>
      )}
    </Box>
  );
}

// Loader can be if user don't want to fetch data using multiple apis
export const loader = async () => {
  const response = await fetch(
    "https://exercisedb.p.rapidapi.com/exercises",
    exerciseOptions
  );
  if (!response.ok) {
    throw json({ message: "could not fetch Exercises" }, { status: 500 });
  } else {
    return response;
  }
};

export default ExerciseDetailPage;
