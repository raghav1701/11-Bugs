import React from "react";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { IconButton } from "@mui/material";

//icons
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ShareIcon from "@mui/icons-material/Share";

const useStyles = makeStyles((theme) => ({
  Header: {
    display: "flex",
    marginBottom: "5px",
  },
  card: {
    padding: "10px",
    // border: "1px solid grey",
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

  UserSummary: {},

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
}));

const UCTop = (props) => {
  const classes = useStyles();
  const [view, setView] = React.useState("list");

  const handleChange = (e) => {
    console.log(e.target, e);
    setView(e);
  };

  return (
    // <Card className={classes.Header}>
    <Grid container item className={classes.Header}>
      {/* top left */}
      <Grid item container xs={4} sm={3} className={classes.profile}>
        {/* avator left */}
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          className={classes.Avatar}
            sx={{ boxShadow: "0 0 12px #fff" }}
                  
        />
        {/* top left right */}
      </Grid>
      <Grid item container xs={8} sm={5}>
        <CardContent className={classes.UserSummary}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="text.primary"
          >
            Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            991
          </Typography>
          <IconButton size="small">
            <ShareIcon color="primary"/>
          </IconButton>
        </CardContent>
      </Grid>
      <Grid item container xs={12} sm={4} className={classes.vote}>
        <ToggleButtonGroup
          orientation="vertical"
          value={view}
          exclusive
          onChange={handleChange}
          className={classes.vote}
        >
          <ToggleButton className={[classes.VoteButton, classes.VoteUp]}>
            <ArrowCircleUpIcon sx={{ color: "#39C98A" }} />
          </ToggleButton>
          <ToggleButton
            sx={{ padding: "1px" }}
            className={[classes.VoteButton]}
          >
            up vote or down vote this developer
          </ToggleButton>
          <ToggleButton className={[classes.VoteButton, classes.VoteDown]}>
            <ArrowCircleDownIcon sx={{ color: "#C93947" }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default UCTop;
