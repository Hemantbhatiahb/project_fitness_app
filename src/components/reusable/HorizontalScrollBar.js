import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box, Typography } from "@mui/material";
import RightArrowIcon from "../../assets/icons/right-arrow.png";
import LeftArrowIcon from "../../assets/icons/left-arrow.png";
import BodyPart from "../exercise-detail/BodyPart";
import ExerciseCard from "./ExerciseCard";

const LeftArrow = () => {
  const { scrollPrev, isFirstItemVisible } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img
        src={LeftArrowIcon}
        alt="right-arrow"
        disabled={isFirstItemVisible}
      />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext, isLastItemVisible } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img
        src={RightArrowIcon}
        alt="right-arrow"
        disabled={isLastItemVisible}
      />
    </Typography>
  );
};

const HorizontalScrollbar = ({ data, setBodyPart, bodyPart, isBodyPart }) => (
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {data.map((item) => (
      <Box
        key={item.id || item}
        itemId={item.id || item}
        title={item.id || item}
        m="0 40px"
      >
        {isBodyPart ? (
          <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
        ) : (
          <ExerciseCard exercise={item} />
        )}
      </Box>
    ))}
  </ScrollMenu>
);

export default HorizontalScrollbar;
