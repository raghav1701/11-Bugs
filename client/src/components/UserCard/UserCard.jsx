import * as React from "react";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";

import UCTop from "./UCTop";
import UCBottom from "./UCBottom";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  CARD: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    // border: "1px solid #D1D1D1",
    // borderRadius: "4px",
    boxShadow: "2px 2px 5px #00000016",
    padding: "10px",
    margin: "20px",
    width: "100%",
    maxWidth: 700,
  },
  NextButton: {
    // position: absolu
  }
}));


const UserCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.CARD}>
      <Grid container>
        {/* top */}
        <Grid item container xs={12}  md={12}>
          <UCTop />
        </Grid>

        {/* bottom */}
        <Grid item container xs={12} md={12}>
          <UCBottom />
        </Grid>
      </Grid> 
      <Button className={classes.NextButton}>
        <NavigateNextIcon />
      </Button>
    </Card>
  );
};

export default UserCard;
