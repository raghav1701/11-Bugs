import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { makeStyles, ThemeProvider } from "@mui/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Box, CircularProgress, IconButton } from "@mui/material";

import axios from "axios";
import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";

//icons
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ShareIcon from "@mui/icons-material/Share";
import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  Header: {
    display: "flex",
    marginBottom: "5px",
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: "10px",
    // border: `1px solid grey`,
  },
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Avatar: {
    width: "100px",
    height: "100px",
    [theme.breakpoints.down("sm")]: {
      width: "70px",
      height: "70px",
    },
  },
  UserSummary: {
    padding: "0 10px 0 0",
  },
  vote: {
    display: "flex",
    flexDirection: "column",
    p: "0",
  },
  VoteButton: {
    display: "flex",
    justifyContent: "space-around",
    fontSize: "10px",
  },
  VoteUp: {
    display: "flex",
    backgroundColor: "#37c2857d",
    fontSize: "16px",
  },
  VoteDown: {
    display: "flex",
    backgroundColor: "#c8384657",
    fontSize: "16px",
  },
  Val: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
  },
  CardVal: {
    margin: "2px",
  },
}));

const UCTop = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [view, setView] = React.useState("list");
  const [vote, setVote] = React.useState(props.data.preVote);
  const [user, setUser] = React.useContext(UserContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleAlignment = (event, newVote) => {
    postVote(newVote)
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
    setVote(newVote)
  };

  const postVote = async (vote) => {
    try {
      setLoading(true);
      console.log(props.data._id, props.data)
      let res = await axios.post(`/profile/${props.data._id}/${vote === 1 ? "upvote" : "downvote"}`);
      setLoading(false);
      console.log(res.data);
      // console.log(res.data.results[0]);
      return res.data;
    } catch (e) {
      console.log(e);
      setError(e.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <Grid container item className={classes.Header}>
      {/* top left */}
      <Grid
        item
        container
        xs={4}
        sm={user._id ? 2.5 : 3}
        className={classes.profile}
      >
        {/* avator left */}

        <Avatar
          alt="Remy Sharp"
          src={props.data.avatar}
          className={classes.Avatar}
          sx={{ boxShadow: "0 0 12px #fff" }}
        ></Avatar>
        {/* top left right */}
      </Grid>
      <Grid item container xs={8} sm={user._id ? 5.5 : 9}>
        <Grid item container sm={12} className={classes.UserSummary}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="text.primary"
            >
              {props.data.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="text.primary"
            >
              {props.data.karma}
            </Typography>
          </Grid>
          {/* <ThemeProvider theme={theme}>
            <Grid item xs={3} className={classes.CardVal}>
              <Card className={classes.Val} elevation={2} sm={3}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="text.primary"
                >
                  {props.data.karma}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  color="text.secondary"
                >
                  Karma
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={3} className={classes.CardVal}>
              <Card className={classes.Val} elevation={2} sm={3}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="text.primary"
                >
                  {props.data.karma}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  color="text.secondary"
                >
                  Karma
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={3} className={classes.CardVal}>
              <Card className={classes.Val} elevation={2} sm={3}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="text.primary"
                >
                  {props.data.karma}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  color="text.secondary"
                >
                  Karma
                </Typography>
              </Card>
            </Grid>
          </ThemeProvider> */}
          {/* <IconButton size="small">
            <ShareIcon color="primary" />
          </IconButton> */}
        </Grid>
      </Grid>
      {user._id && (
        <Grid item container xs={12} sm={4} className={classes.vote}>
          <ToggleButtonGroup
            orientation="vertical"
            value={vote}
            exclusive
            onChange={handleAlignment}
            className={classes.vote}
          >
            <ToggleButton
              value={1}
              className={[classes.VoteButton, classes.VoteUp]}
            >
              <ArrowCircleUpIcon sx={{ color: "#39C98A" }} />
            </ToggleButton>
            <Typography
              sx={{ padding: "1px" }}
              className={[classes.VoteButton]}
            >
              up vote or down vote this developer
            </Typography>
            <ToggleButton
              value={-1}
              className={[classes.VoteButton, classes.VoteDown]}
            >
              <ArrowCircleDownIcon sx={{ color: "#C93947" }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      )}
    </Grid>
  );
};

export default UCTop;
