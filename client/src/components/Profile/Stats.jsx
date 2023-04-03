import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ScoreCard from "../Misc/ScoreCard";
import { useEffect, useState } from "react";

const Stats = (props) => {
  const { score, handle, code } = props;
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGithubStats = async () => {};
  const fetchCodeforcesStats = async () => {};
  const fetchCodechefStats = async () => {};

  useEffect(() => {
    console.log(handle);
    if (handle === "") {
      return setError(code + " handle is unavailable!");
    }
    var fetcher = null;
    let c = code.trim().toLowerCase();
    if (c === "github") {
      fetcher = fetchGithubStats;
    } else if (c === "codeforces") {
      fetcher = fetchCodeforcesStats;
    } else {
      fetcher = fetchCodechefStats;
    }

    setError("");
    // fetcher()
    //   .then((res) => {
    //     setStats(res);
    //     setLoading(false);
    //   })
    //   .catch((e) => {
    //     setError(e.message);
    //     setLoading(false);
    //   });
  }, [code, handle]);

  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container alignItems="center" sx={{ width: "100%", mb: 2 }}>
          <Grid item sx={{ px: 1 }}>
            <GitHubIcon />
          </Grid>
          <Grid item sx={{ px: 1 }}>
            <Typography variant="h5">{code} Stats</Typography>
          </Grid>
        </Grid>
        {!error ? (
          !loading ? (
            <Grid container sx={{ width: "100%" }}>
              <Grid item>
                <Box display="flex">
                  {stats.map((s, i) => (
                    <Box>
                      <Typography>{s.label}</Typography>
                      <Typography>{s.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item>
                <ScoreCard value={score} size={72} />
              </Grid>
            </Grid>
          ) : (
            <CircularProgress sx={{ px: 1 }} />
          )
        ) : (
          <Typography sx={{ px: 1 }} color="error">
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Stats;
