import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/exercise-detail/Detail";
import ExerciseVideos from "../components/exercise-detail/ExerciseVideos";
import SimilarExercises from "../components/exercise-detail/SimilarExercises";
import { Box } from "@mui/material";
import { exerciseOptions, fetchData, youtubeOptions } from "../utils/FetchData";
import Loader from "../components/reusable/Loader";

function ExerciseDetailPage() {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { exerciseId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchExerciseData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      try {
        const exerciseDetailData = await fetchData(
          `${exerciseDbUrl}/exercises/exercise/${exerciseId}`,
          exerciseOptions
        );

        const exerciseVideoData = await fetchData(
          `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
          youtubeOptions
        );
        setIsLoading(false);

        const targetMuscleExerciseData = await fetchData(
          `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
          exerciseOptions
        );

        const equipmentExerciseData = await fetchData(
          `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
          exerciseOptions
        );

        setExerciseDetail(exerciseDetailData);
        setExerciseVideos(exerciseVideoData.contents);
        setTargetMuscleExercises(targetMuscleExerciseData);
        setEquipmentExercises(equipmentExerciseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExerciseData();
  }, [exerciseId]);

  if (!exerciseDetail) return <div>No Data</div>;
  return (
    <Box>
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Detail exerciseDetail={exerciseDetail} />
          <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          />
          <SimilarExercises exercises={targetMuscleExercises} title="target" />
          <SimilarExercises exercises={equipmentExercises} title="equipment" />
        </React.Fragment>
      )}
    </Box>
  );
}

export default ExerciseDetailPage;
