import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Link from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";

import { CircularProgress, IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";


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
  LoaderGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "250px",
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const GHCard = (props) => {
  const theme = useTheme();
  const classes = useStyle();
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHandle = async () => {
    try {
      setError("");
      setLoading(true);
      // let res = await axios.get(`/scrap/codeforces/${props.handle}`);
      let res = await axios.get(`/scrap/github/adijr9487`);
      setLoading(false);
      console.log(res.data.stats)
      return res.data.stats;
    } catch (e) {
      setLoading(false);
      // console.log(e);
      setError(e.message || "Something went wrong!");
    }
  };

  React.useEffect(() => {
    fetchHandle()
      .then((res) => {
        let required = ["Star", "Repository Count", "Total Commits"];
        let fieldObj = {};
        res.forEach((ele) => {
          if (required.includes(ele.label)) fieldObj[ele.label] = ele.value;
        });
        fieldObj["profile_link"] = `https://github.com/${"adijr9487"}`;
        setData(fieldObj);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message || "Something went wrong!");
      });
  }, [props.handle]);

  return !loading ? (
    <Card className={classes.card}>
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
            transform="scale(64)"
            fill="#1B1F23"
            className={classes.svg}
          />
        </svg>
      </div>

      <Typography
        variant="caption"
        sx={{ fontWeight: "700" }}
        color="text.secondary"
      >
        {Array(data["Star"])
          .fill("★")
          .map((ele) => ele)}
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
            {data["Total Commits"]}
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: "10px" }}
            variant="caption"
            color="text.secondary"
          >
            Total Commits
          </Typography>
        </Grid>
        <Grid item container xs={6} className={classes.rank}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h6"
            color="text.primary"
          >
            {data["Repository Count"]}
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: "10px" }}
            variant="caption"
            color="text.secondary"
          >
            Repository Count
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid
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
      </Grid> */}

      {/* view profile  */}
      <CardActions>
        <Link
          sx={{ fontSize: "10px" }}
          href={data["profile_link"]}
          underline="none"
        >
          <Button size="small">View Github Profile</Button>
        </Link>
      </CardActions>
    </Card>
  ) : (
    <Grid item className={classes.LoaderGrid} container xs={12} md={12}>
      <CircularProgress
        sx={{ p: theme.spacing(1), color: theme.palette.divider }}
      />
    </Grid>
  );
};

export default GHCard;
