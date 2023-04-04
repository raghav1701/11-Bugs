import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  SvgIcon,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { useEffect, useState, useContext } from "react";
import ScoreCard from "../Misc/ScoreCard";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserCard from "../Misc/UserCard";
import Stats from "./Stats";
import Error from "../Misc/Error";
import { UserContext } from "../../contexts/UserContext";
import Edit from "@mui/icons-material/Edit";
import EditProfileDialog from "./EditProfileDialog";

const useStyles = makeStyles((theme) => ({
  cards: {
    padding: theme.spacing(2),
  },
}));

const Profile = () => {
  const theme = useTheme();
  const classes = useStyles();
  const params = useParams();
  const [user, setUser] = useContext(UserContext);

  const [edit, setEdit] = useState(false);
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

  const handleOpen = () => setEdit(true);
  const handleClose = () => setEdit(false);

  const fetchProfile = async () => {
    try {
      setError("");
      setLoading(true);
      let res = await axios.post(`/profile/${params.id}`);
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

  if (error) return <Error error={error} />;

  return (
    <Grid container sx={{ py: theme.spacing(2) }}>
      <Grid item container xs={12} sm={6} md={4}>
        <Grid item xs={12} className={classes.cards}>
          <Card sx={{ display: "flex", justifyContent: "center" }}>
            {!loading ? (
              <Box sx={{ width: "100%" }}>
                <CardContent sx={{ position: "relative" }}>
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
                      {data.resume && (
                        <Link href={data.resume}>
                          <Button startIcon={<LinkIcon />}>Resume</Button>
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                  {user._id === data._id && (
                    <Tooltip
                      title="Edit"
                      sx={{ position: "absolute", right: 0, bottom: 0 }}
                    >
                      <IconButton onClick={handleOpen}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  )}
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
            editable={user._id === data._id}
          />
        </Grid>
        <Grid item sx={{ width: "100%" }} className={classes.cards}>
          <Stats
            score={data.scores.codeforces}
            handle={data.handles.codeforces}
            code={"Codeforces"}
            editable={user._id === data._id}
          />
        </Grid>
        <Grid item sx={{ width: "100%" }} className={classes.cards}>
          <Stats
            score={data.scores.codechef}
            handle={data.handles.codechef}
            code={"Codechef"}
            editable={user._id === data._id}
          />
        </Grid>
      </Grid>
      {user._id === data._id && (
        <EditProfileDialog open={edit} handleClose={handleClose} prev={data} />
      )}
    </Grid>
  );
};
export default Profile;
