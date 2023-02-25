import React, { useState, useEffect } from "react";

import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import { Hearts } from "react-loading-icons";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

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
            "X-Api-Key": import.meta.env.VITE_APP_API_KEY,
          },
        });
        const data = await response.json();
        setSearchResult(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    if (searchTerm.length > 0) {
      fetchFromAPI();
    }
  }, [searchTerm]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        borderRadius: "16px",
      }}
    >
      ;
      <Container
        sx={{
          backgroundColor: "blue",
          width: 600,
          height: 550,
          color: "white",
          borderRadius: "10px",
          padding: "40px 10px",
        }}
      >
        <Typography variant="h3" color="white" textAlign="center" mb={2}>
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
            searchResult.map((result) => (
              <div key={result.toString()}>
                <ul key={result.id} style={{ listStyle: "none" }}>
                  <li key={result.country}>
                    <PublicOutlinedIcon />
                    Country Name: {result.country}
                  </li>

                  <li key={result.type}>
                    <TrendingUpOutlinedIcon />
                    Inflation Type: {result.type}
                  </li>

                  <li key={result.period}>
                    {" "}
                    <TimelapseOutlinedIcon />
                    Inflation Period:{" "}
                    <span style={{ textTransform: "uppercase" }}>
                      {result.period}
                    </span>
                  </li>

                  <li key={result.monthly_rate_pct}>
                    <CalendarMonthOutlinedIcon />
                    Monthly Rate: {result.monthly_rate_pct}%
                  </li>

                  <li key={result.yearly_rate_pct}>
                    <CalendarMonthOutlinedIcon />
                    Yearly Rate: {result.yearly_rate_pct}%
                  </li>
                </ul>
              </div>
            ))
          )}
        </Grid2>
      </Container>
    </Box>
  );
};

export default App;
