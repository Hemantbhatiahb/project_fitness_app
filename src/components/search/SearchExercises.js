import React from "react";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { exerciseOptions, fetchData } from "../../utils/FetchData";
import HorizontalScrollBar from "../reusable/HorizontalScrollBar";
import { useDispatch } from "react-redux";
import { exSliceActions } from "../../store/exerciseSlice";

const SearchExercises = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [invalidInput, setInvalidInput] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBodyPartsData = async () => {
      try {
        const fetchedBodyParts = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          exerciseOptions
        );
        setBodyParts(["all", ...fetchedBodyParts]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBodyPartsData();
  }, []);

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const searchHandler = async () => {
    setInvalidInput(false);
    if (inputSearch.trim().length <= 0 && inputSearch === "") {
      setInvalidInput(true);
      return;
    }

    dispatch(
      exSliceActions.filterExercises({
        filterIndex: "search",
        filterValue: inputSearch,
      })
    );
    scrollToElement("exercises");
    setInputSearch("");
  };

  return (
    <Stack alignItems="center" justifyContent="center" mt="37px" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px", textAlign: "center" } }}
        mb="50px"
      >
        Awesome Exercise you <br /> should know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          label="Search Exercise" variant="outlined"
          error={invalidInput}
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "40px" },
            width: { lg: "1170px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          value={inputSearch}
          onChange={(e) => {
            setInputSearch(e.target.value.toLowerCase());
          }}
          type="search"
        />
        <Button
          className="search-btn"
          sx={{
            backgroundColor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "173px", xs: "80px" },
            height: "56px",
            fontSize: { lg: "20px", xs: "14px" },
            position: "absolute",
            right: "0px",
          }}
          onClick={searchHandler}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", padding: "20px" }}>
        <HorizontalScrollBar data={bodyParts} isBodyPart={true} />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
