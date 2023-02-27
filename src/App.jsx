import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import { Hearts } from "react-loading-icons";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// xs, extra-small: 0px
// xl, extra-large: 1536px
const Root = styled("div")(({ theme }) => ({
  // sm, small: 600px
  [theme.breakpoints.up("sm")]: {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    margin: "auto",
    height: 300,
    width: 400,
  },
  // md, medium: 900px
  [theme.breakpoints.up("md")]: {
    position: "relative",
    left: "30%",
    transform: "translateX(-50%)",
    width: 500,
  },
  // lg, large: 1200px
  [theme.breakpoints.up("lg")]: {
    width: 600,
    left: "20%",
  },
}));

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const BASE_URL = "https://api.api-ninjas.com/v1/inflation?country=";

  useEffect(() => {
    const fetchFromAPI = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}${searchTerm}`, {
          headers: {
            "X-Api-Key": "ISUZaaHNb4qCUcB/M/FBSw==MYA7OWtNcUozm6pe",
          },
        });
        const data = await response.json();
        setSearchResult(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    if (searchTerm.length > 0 && searchResult.length === 0) {
      fetchFromAPI();
    }
  }, [searchTerm]);

  return (
    <Root>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          borderRadius: "16px",
        }}
      >
        <Container
          sx={{
            backgroundColor: "blue",
            width: 600,
            height: 500,
            color: "white",
            borderRadius: "10px",
            padding: "30px 10px",
          }}
        >
          <Typography
            variant="h3"
            color="white"
            textAlign="center"
            mb={2}
            sx={{ Typography: { lg: "h3", sm: "h4", xs: "h6" } }}
          >
            INFLATION CHECK
          </Typography>
          <FormControl sx={{ display: "flex", margin: "0px 60px" }}>
            <InputLabel focused variant="outlined" htmlFor="search" />
            <Input
              type="text"
              sx={{
                color: "blue",
                background: "white",
                padding: "10px",
                fontSize: "20px",
              }}
              id="search"
              disabled={false}
              variant="outlined"
              placeholder="Type country name..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </FormControl>
          {error && <div>{error.message}</div>}
          <Grid2
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            margin="30px"
          >
            {loading ? (
              <Typography variant="h7" textAlign="center">
                <Hearts /> <br />
                Loading...
              </Typography>
            ) : (
              searchResult &&
              searchResult.map((result) => (
                <Box key={result.toString()}>
                  <ul key={result.id}>
                    <li key={result.type}>
                      <Typography
                        variant="h6"
                        sx={{ typography: { lg: "h6", sm: "h7", xs: "body1" } }}
                      >
                        <TrendingUpOutlinedIcon /> Inflation Type:&nbsp;{" "}
                        {result.type}
                      </Typography>
                    </li>

                    <li key={result.period}>
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ typography: { lg: "h6", sm: "h7", xs: "body1" } }}
                      >
                        {" "}
                        <TimelapseOutlinedIcon /> Inflation Period: &nbsp;{" "}
                        <span>{result.period}</span>
                      </Typography>
                    </li>

                    <li key={result.monthly_rate_pct}>
                      <Typography
                        variant="h6"
                        sx={{ typography: { lg: "h6", sm: "h7", xs: "body1" } }}
                      >
                        {" "}
                        <CalendarMonthOutlinedIcon /> Monthly Rate: &nbsp;{" "}
                        {result.monthly_rate_pct}%
                      </Typography>
                    </li>

                    <li key={result.yearly_rate_pct}>
                      <Typography
                        variant="h6"
                        sx={{ typography: { lg: "h6", sm: "h7", xs: "body1" } }}
                      >
                        <CalendarMonthOutlinedIcon /> Yearly Rate:&nbsp;{" "}
                        {result.yearly_rate_pct}%
                      </Typography>
                    </li>
                  </ul>
                </Box>
              ))
            )}
          </Grid2>
        </Container>
      </Box>
    </Root>
  );
};

export default App;
