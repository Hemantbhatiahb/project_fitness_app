import React from "react";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { scrollHandler } from "../../utils/FetchData";
import { useLocation } from "react-router-dom";

const MainNavigation = () => {
  const location = useLocation();

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      sx={{
        gap: { sm: "123px", xs: "40px" },
        mt: { sm: "32px", xs: "20px" },
        justifyContent: "none",
      }}
      px="20px"
    >
      <Link to="/">
        <img
          src={Logo}
          alt="exerciseLogo"
          style={{ width: "48px", height: "48px", margin: "0 20px" }}
        />
      </Link>
      <Stack
        direction="row"
        gap="40px"
        fontFamily="Alegreya"
        fontSize="24px"
        alignItems="flex-end"
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            borderBottom: "3px solid #FF262f",
          }}
        >
          Home
        </Link>
        {location.pathname === "/" && (
          <a
            href="#exercises"
            style={{ textDecoration: "none", color: "#3A1212" }}
            onClick={(event) => {
              scrollHandler(event);
            }}
          >
            Exercises
          </a>
        )}
      </Stack>
    </Stack>
  );
};

export default MainNavigation;
