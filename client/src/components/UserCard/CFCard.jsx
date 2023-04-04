import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { makeStyles } from "@mui/styles";

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
