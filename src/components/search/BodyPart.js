import React from "react";
import { Stack, Typography } from "@mui/material";
import gymIcon from "../../assets/icons/gym.png";
import { useDispatch, useSelector } from "react-redux";
import { exSliceActions } from "../../store/exerciseSlice";

const BodyPart = ({ item }) => {
  const bodyPart = useSelector((state) => state.exSlice.bodyPart);
  const dispatch = useDispatch();

  //set body part to selected item
  const setBodyPartHandler = () => {
    dispatch(exSliceActions.setBodyPart(item));
    dispatch(
      exSliceActions.filterExercises({
        filterIndex: "bodyPart",
        filterValue: item,
      })
    );
    window.scrollTo({ top: "1800", left: "100", behavior: "smooth" });
  };

  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
        borderTop: bodyPart === item ? "4px solid #FF2625" : "",
        background: "#fff",
        borderBottomLeftRadius: "20px",
        width: "270px",
        height: "282px",
        cursor: "pointer",
        gap: "47px",
      }}
      onClick={setBodyPartHandler}
    >
      <img
        src={gymIcon}
        alt="dumbbell"
        style={{ width: "40px", height: "40px" }}
      />
      <Typography
        fontSize="24px"
        fontWeight="24px"
        color="#3A1212"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
