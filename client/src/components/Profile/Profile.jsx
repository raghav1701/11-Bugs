import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Link,
  List,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { useEffect, useState } from "react";
import ScoreCard from "../Misc/ScoreCard";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FormControlUnstyledContext } from "@mui/base";
import UserCard from "../Misc/UserCard";
import Stats from "./Stats";

const useStyles = makeStyles((theme) => ({
  cards: {
    padding: theme.spacing(2),
  },
}));

const Profile = () => {
  const theme = useTheme();
  const classes = useStyles();
  const params = useParams();

  const [data, setData] = useState({
    email: "",
    name: "",
    karma: 0,
    scores: { github: 0, codechef: 0, codeforces: 0 },
    handles: { github: "", codechef: "", codeforces: "" },
    friends: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setError("");
      setLoading(true);
      let res = await axios.get(`/profile/${params.id}`);
      setLoading(false);
      return res.data.user;
    } catch (e) {
      setLoading(false);
      console.log(e);
      setError(e.message || "Something went wrong!");
    }
  };

  // Testing friends
  const getFriends = () => {
    let friends = [];
    for (let i = 0; i < 50; i++) {
      friends.push({
        name: "Aditya",
        _id: "6521464565465165",
        avatar: "",
      });
    }
    return friends;
  };

  useEffect(() => {
    fetchProfile()
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message || "Something went wrong!");
      });
  }, [params.id]);

  if (error)
    return (
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CardMedia
            component="img"
            image={process.env.PUBLIC_URL + "/sad.svg"}
            sx={{ width: "100%", maxWidth: 400 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" color="error">
            {error}
          </Typography>
        </Grid>
      </Grid>
    );

  return (
    <Grid container sx={{ py: theme.spacing(2) }}>
      <Grid item container xs={12} sm={6} md={4}>
        <Grid item xs={12} className={classes.cards}>
          <Card sx={{ display: "flex", justifyContent: "center" }}>
            {!loading ? (
              <Box sx={{ width: "100%" }}>
                <CardContent>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Avatar sx={{ width: 72, height: 72 }} />
                    </Grid>
                    <Grid item xs={true} alignSelf="center" align="center">
                      <Typography variant="h6">{data.name}</Typography>
                      <Typography variant="caption">{data.name}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardContent>
                  <Grid container align="center" justifyContent="center">
                    <Grid item>
                      <ScoreCard
                        value={data.karma}
                        size={150}
                        title={"🔥Karma"}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>
            ) : (
              <CircularProgress sx={{ p: theme.spacing(5) }} />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.cards}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6">Friends</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {!loading ? (
                    <List
                      sx={{
                        width: "100%",
                        maxHeight: "60vh",
                        overflow: "auto",
                      }}
                    >
                      {data.friends.map((f, index) => (
                        <UserCard user={f} key={f._id} />
                      ))}
                    </List>
                  ) : (
                    <CircularProgress sx={{ p: theme.spacing(5) }} />
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container item xs={true}>
        <Grid item sx={{ width: "100%" }} className={classes.cards}>
          <Stats
            score={data.scores.github}
            handle={data.handles.github}
            code={"Github"}
          />
        </Grid>
        <Grid item sx={{ width: "100%" }} className={classes.cards}>
          <Stats
            score={data.scores.codeforces}
            handle={data.handles.codeforces}
            code={"Codeforces"}
          />
        </Grid>
        <Grid item sx={{ width: "100%" }} className={classes.cards}>
          <Stats
            score={data.scores.codechef}
            handle={data.handles.codechef}
            code={"Codechef"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Profile;
