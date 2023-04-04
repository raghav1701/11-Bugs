import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";

const useStyle = makeStyles((theme) => ({
  card: {
    display: "flex",
    alignItems: "center",
    flexFlow: "column",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "4px",
    boxShadow: "2px 2px 5px #00000016",
  },
  svg: {
    fill: alpha(theme.palette.common.black, 0.25),
  },
  rank: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
    color: "#222222",

    border: `1px solid ${theme.palette.divider}`,
    boxSizing: "border-box",
  },
}));

const CFCard = (props) => {
  const classes = useStyle();

  return (
    <Card className={classes.card}>
      <div>
        <svg
          height="30"
          width="28"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            className={classes.svg}
            d="M22.5,10.5c0.8,0,1.5,0.7,1.5,1.5v7.5c0,0.8-0.7,1.5-1.5,1.5h-3c-0.8,0-1.5-0.7-1.5-1.5V12c0-0.8,0.7-1.5,1.5-1.5H22.5z"
          />
          <path
            className={classes.svg}
            d="M13.5,3C14.3,3,15,3.7,15,4.5v15c0,0.8-0.7,1.5-1.5,1.5h-3C9.7,21,9,20.3,9,19.5v-15C9,3.7,9.7,3,10.5,3H13.5z"
          />
          <path
            className={classes.svg}
            d="M4.5,7.5C5.3,7.5,6,8.2,6,9v10.5C6,20.3,5.3,21,4.5,21h-3C0.7,21,0,20.3,0,19.5V9c0-0.8,0.7-1.5,1.5-1.5H4.5z"
          />
        </svg>
      </div>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ marginBottom: "0" }}
        color="text.primary"
      >
        2600
      </Typography>
      <Typography
        variant="caption"
        sx={{ fontWeight: "700" }}
        color="text.secondary"
      >
        Legendary Grandmaster
      </Typography>
      <Typography variant="h6" color="text.secondary">
        3000
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Highest rating
      </Typography>
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid item container xs={6} className={classes.rank}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h6"
            color="text.primary"
          >
            2
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: "8px" }}
            variant="caption"
            color="text.secondary"
          >
            Friends
          </Typography>
        </Grid>
        <Grid item container xs={6} className={classes.rank}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h6"
            color="text.primary"
          >
            2
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: "8px" }}
            variant="caption"
            color="text.secondary"
          >
            Contributions
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid item container xs={6} className={classes.rank}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h6"
            color="text.primary"
          >
            100
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: "8px" }}
            variant="caption"
            color="text.secondary"
          >
            Problem Solved ( All time )
          </Typography>
        </Grid>
        <Grid item container xs={6} className={classes.rank}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h6"
            color="text.primary"
          >
            200
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: "8px" }}
            variant="caption"
            color="text.secondary"
          >
            Problem Solved ( Last Year )
          </Typography>
        </Grid>
        <Grid item container xs={6} className={classes.rank}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h6"
            color="text.primary"
          >
            200
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: "8px" }}
            variant="caption"
            color="text.secondary"
          >
            Problem Solved ( Last Month )
          </Typography>
        </Grid>
      </Grid>

      {/* view profile  */}
      <CardActions>
        <Button size="small">View Profile</Button>
      </CardActions>
    </Card>
  );
};

export default CFCard;