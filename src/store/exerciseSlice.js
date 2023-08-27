import { createSlice } from "@reduxjs/toolkit";

const INITIAL_EXERCISE_STATE = {
  bodyPart: "all",
  exercises: [],
  filteredExercises: [],
};

const exerciseSlice = createSlice({
  name: "exSlice",
  initialState: INITIAL_EXERCISE_STATE,
  reducers: {
    setExercises(state, action) {
      state.exercises = action.payload;
    },
    filterExercises(state, action) {
      if (action.payload.filterIndex === "search") {
        state.filteredExercises = state.exercises.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(action.payload.filterValue) ||
            exercise.target
              .toLowerCase()
              .includes(action.payload.filterValue) ||
            exercise.equipment
              .toLowerCase()
              .includes(action.payload.filterValue) ||
            exercise.bodyPart.toLowerCase().includes(action.payload.filterValue)
        );
      } else if (action.payload.filterIndex === "bodyPart") {
        if (action.payload.filterValue === "all") {
          state.filteredExercises = state.exercises;
          return;
        }
        state.filteredExercises = state.exercises.filter(
          (exercise) => exercise.bodyPart === action.payload.filterValue
        );
      } else {
        state.filteredExercises = action.payload;
      }
    },
    setBodyPart(state, action) {
      state.bodyPart = action.payload;
    },
  },
});

export const exSliceActions = exerciseSlice.actions;

export default exerciseSlice;
