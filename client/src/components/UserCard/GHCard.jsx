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

import { CircularProgress, IconButton, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import GitHub from "@mui/icons-material/GitHub";
import OpenInNew from "@mui/icons-material/OpenInNew";

const useStyle = makeStyles((theme) => ({
  card: {
    display: "flex",
    alignItems: "center",
    flexFlow: "column",
    width: "100%",
    // padding: "20px",
    boxSizing: "border-box",
    // border: `1px solid ${theme.palette.divider}`,
    // borderRadius: "4px",
    // boxShadow: "2px 2px 5px #00000016",
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
      let res = await axios.post(`/scrap/github/${props.handle}`);
      // let res = await axios.get(`/scrap/github/adijr9487`);
      setLoading(false);
      return res.data.stats;
    } catch (e) {
      setLoading(false);
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
        fieldObj["profile_link"] = `https://github.com/${props.handle}`;
        setData(fieldObj);
      })
      .catch((e) => {
        setError(e.message || "Something went wrong!");
      });
  }, [props.handle]);

  return !loading ? (
    <Card className={classes.card} elevation={10} sx={{ p: 3 }}>
      <Box>
        <GitHub />
      </Box>
      {data.Star ? (
        <>
          <Typography
            variant="caption"
            sx={{ fontWeight: "700" }}
            color="text.secondary"
          >
            {data["Star"] + "★"}
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

          {/* view profile  */}
          <CardActions>
            <Link
              target="_blank"
              sx={{ fontSize: "10px" }}
              href={data["profile_link"]}
              underline="none"
            >
              <OpenInNew />
            </Link>
          </CardActions>
        </>
      ) : (
        <Typography color={theme.palette.error.light} align="center">
          Could not find the profile
        </Typography>
      )}
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
