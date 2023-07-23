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
import { Box, CircularProgress, IconButton, Link } from "@mui/material";

import axios from "axios";
import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";

//icons
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { UserContext } from "../../contexts/UserContext";

import Modal from "@mui/material/Modal";
import ScoreCard from "../Misc/ScoreCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  // Header: {
  //   display: "flex",
  //   marginBottom: "5px",
  //   minHeight: 100,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  card: {
    padding: "10px",
    // border: `1px solid grey`,
  },
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  // Avatar: {
  //   width: "100px",
  //   height: "100px",
  //   [theme.breakpoints.down("sm")]: {
  //     width: "70px",
  //     height: "70px",
  //   },
  // },
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
  const [vote, setVote] = React.useState(props.data.preVote || 0);
  const [user, setUser] = React.useContext(UserContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAlignment = (newVote) => {
    // console.log(event.target.value);
    // const newVote = event.target.value;
    console.log(newVote, vote);
    postVote(newVote)
      .then((res) => {
        if (vote === "") {
          setVote(newVote);
        } else {
          if (vote !== newVote) setVote(newVote);
        }
      })
      .catch((e) => {
        console.log(e);
        setError(e.message || "Something went wrong!");
      });
  };

  const postVote = async (vote) => {
    try {
      setLoading(true);
      console.log(props.data._id, props.data);
      let res = await axios.post(
        `/profile/${props.data._id}/${vote === 1 ? "upvote" : "downvote"}`
      );
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
      {error && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Error
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {error}
            </Typography>
          </Box>
        </Modal>
      )}
      <Grid
        item
        container
        xs={12}
        // sm={user._id ? 2.5 : 3}
        // className={classes.profile}
      >
        <Grid
          item
          xs={6}
          order={{ xs: 2 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={props.data.avatar}
            // className={classes.Avatar}
            sx={{ width: 128, height: 128, mr: 2 }}
          ></Avatar>
          {/* <Grid item xs={12}> */}
          <Box sx={{ textAlign: "center" }}>
            <Link href={`/profile/${props.data._id}`} target="_blank">
              <Typography align="center" variant="h6" color="text.primary">
                {props.data.name}
              </Typography>
            </Link>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              ({Math.round((props.data.karma + Number.EPSILON) * 100) / 100})
            </Typography>
            <Typography
              align="center"
              gutterBottom
              variant="caption"
              color="text.disabled"
            >
              {props.data.username}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={3}
          order={{ xs: 1 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("sm")]: { alignItems: "flex-end" },
          }}
        >
          {user._id && (
            <ToggleButton
              onClick={() => handleAlignment(1)}
              value={1}
              // className={[classes.VoteButton, classes.VoteUp]}
            >
              <ThumbUpAltOutlinedIcon color="success" />
            </ToggleButton>
          )}
        </Grid>
        <Grid
          item
          xs={3}
          order={{ xs: 3 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("sm")]: { alignItems: "flex-end" },
          }}
        >
          {user._id && (
            <ToggleButton
              onClick={() => handleAlignment(-1)}
              value={-1}
              // className={[classes.VoteButton, classes.VoteDown]}
            >
              <ThumbDownOutlinedIcon
                sx={{ color: theme.palette.error.light }}
              />
            </ToggleButton>
          )}
        </Grid>
        {/* {user._id && (
        <Grid item container xs={12} sm={4} className={classes.vote}>
          <ToggleButtonGroup
            orientation="vertical"
            value={vote}
            exclusive
            onChange={handleAlignment}
            className={classes.vote}
          >

            <Typography
              sx={{ padding: "1px" }}
              className={[classes.VoteButton]}
            >
              up vote or down vote this developer
            </Typography>

          </ToggleButtonGroup>
        </Grid>
      )} */}
        {/* avator left */}

        {/* </Grid> */}
        {/* top left right */}
      </Grid>
      {/* <Grid item container xs={8} sm={user._id ? 5.5 : 9}> */}
      {/* <Grid item container sm={12} className={classes.UserSummary}> */}
      {/* <Grid item xs={12}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="text.primary"
            >
              {props.data.karma}
            </Typography>
          </Grid> */}
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
      {/* </Grid> */}
      {/* </Grid> */}
    </Grid>
  );
};

export default UCTop;
