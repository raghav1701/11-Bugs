import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import GitHubIcon from "@mui/icons-material/GitHub";
import ScoreCard from "../Misc/ScoreCard";
import { useEffect, useState } from "react";
import UsernameDialog from "./UsernameDialog";

const Stats = (props) => {
  const { score, handle, code, editable } = props;
  const [stats, setStats] = useState({
    pinned_repos: [{ Title: "", Description: "", Stars: "0", Forks: 0 }],
    star: 0,
    repos: 0,
    commits: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialog, setDialog] = useState(false);

  const openDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);

  // Fill up the following functions
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
    // Uncomment to fetch stats
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
          <Grid item sx={{ px: 1 }} xs={true}>
            <Typography variant="h5">{code} Stats</Typography>
          </Grid>
          {editable && (
            <Grid item sx={{ px: 1 }}>
              <Tooltip title="Change Username">
                <IconButton onClick={openDialog}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
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
      {editable && (
        <UsernameDialog
          open={dialog}
          code={code}
          handleClose={closeDialog}
          handle={handle}
        />
      )}
    </Card>
  );
};

export default Stats;
