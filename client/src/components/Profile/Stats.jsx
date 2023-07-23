import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Tooltip,
  IconButton,
  Divider,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import GitHubIcon from "@mui/icons-material/GitHub";
import ScoreCard from "../Misc/ScoreCard";
import { useEffect, useState } from "react";
import UsernameDialog from "./UsernameDialog";
import axios from "axios";
import Repos from "./Repos";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CodeChef from "../Misc/CodeChef";
import CodeForces from "../Misc/CodeForces";

const Stats = (props) => {
  const {
    handle,
    code,
    editable = false,
    userID,
    changeKarma = null,
    scoreSize = 72,
  } = props;
  const [stats, setStats] = useState([]);
  const [repos, setRepos] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialog, setDialog] = useState(false);

  const openDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);

  // Fill up the following functions
  const fetchStats = async () => {
    try {
      const res = await axios.post(`/scrap/${code.toLowerCase()}/${handle}`);
      return res.data;
    } catch (e) {
      setError("Could not load the user stats!");
    }
  };
  // const fetchCodeforcesStats = async () => {};
  // const fetchCodechefStats = async () => {};

  const getHandleLink = () => {
    let c = code.toLowerCase();
    let link = "https://" + c + ".com/";
    if (c === "codechef") {
      link += "user/";
    } else if (c === "codeforces") link += "profile/";
    return link + handle;
  };

  const updateScore = async (score) => {
    if (props.updateScore) props.updateScore(score, code, userID);
  };

  useEffect(() => {
    if (handle === "") {
      return setError(code + " handle is unavailable!");
    }

    setError("");
    // Uncomment to fetch stats
    // if (code !== "Github")
    fetchStats()
      .then((res) => {
        if (code === "Github") {
          setRepos(res.other.value);
        }
        setStats([{ label: "Username", value: handle }, ...res.stats]);
        setScore(res.score);
        updateScore(res.score);
        setLoading(false);
      })
      .catch((e) => {
        setError("Could not load the user stats!");
        setLoading(false);
      });
  }, [code, handle]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container alignItems="center" sx={{ width: "100%", mb: 2 }}>
          <Grid item sx={{ px: 1 }}>
            {code === "Github" ? <GitHubIcon /> : null}
            {code === "Codechef" ? <CodeChef /> : null}
            {code === "Codeforces" ? <CodeForces /> : null}
          </Grid>
          <Grid item sx={{ px: 1 }} xs={handle ? "" : true}>
            <Typography variant="h5">{code} Stats</Typography>
          </Grid>
          {handle && (
            <Grid item sx={{ px: 1 }} xs={true}>
              <Link href={getHandleLink()}>
                <OpenInNewIcon />
              </Link>
            </Grid>
          )}
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
        <Divider sx={{ marginBottom: 2 }} />
        {!error ? (
          !loading ? (
            <Grid container justifyContent="center" sx={{ width: "100%" }}>
              <Grid item xs={12} sm={true} sx={{ px: 1 }}>
                <Box>
                  {stats &&
                    stats.map((s, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          width: "100%",
                          maxWidth: 500,
                          // pl: 1,
                        }}
                      >
                        <Typography sx={{ mr: "auto" }} color="text.disabled">
                          {s.label}
                        </Typography>
                        <Typography sx={{ ml: "auto" }} color="primary">
                          {s.value}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Grid>
              <Grid item>
                <ScoreCard value={score} size={scoreSize} />
              </Grid>
              {code === "Github" && (
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography sx={{ px: 1 }} variant="h6">
                    Pinned Repos
                  </Typography>
                  <Repos repos={repos} handle={handle} />
                </Grid>
              )}
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
