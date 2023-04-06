import React from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { makeStyles } from "@mui/styles";

import CCCard from "./CCCard";
import CFCard from "./CFCard";
import GHCard from "./GHCard";

const useStyle = makeStyles((theme) => ({
  cpBox: {
    display: "flex",
    justifyContent: "center",
    padding: "4px",
  },
}));

const UCBottom = (props) => {
  const classes = useStyle();


  return (
    <Grid item container xs={12}>
      <Grid item container xs={12} md={4} className={classes.cpBox}>
        <CCCard handle={props.handle.codechef} />
      </Grid>
      <Grid item container xs={12} md={4} className={classes.cpBox}>
        <GHCard handle={props.handle.github} />
      </Grid>
      <Grid item container xs={12} md={4} className={classes.cpBox}>
        <CFCard handle={props.handle.codeforces} />
      </Grid>
    </Grid>
  );
};

export default UCBottom;
