import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

import axios from "axios";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { CircularProgress, IconButton } from "@mui/material";
import { useTheme, Box } from "@mui/material";
import Link from "@mui/material/Link";

import { alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import CodeChef from "../Misc/CodeChef";
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
        height: "100%",
    },
    LoaderGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "250px",
        border: `1px solid ${theme.palette.divider}`,
    },
}));

const CCCard = (props) => {
    const classes = useStyle();
    const theme = useTheme();
    const [data, setData] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchHandle = async () => {
        try {
            setError("");
            setLoading(true);
            let res = await axios.post(`/scrap/codechef/${props.handle}`);
            // let res = await axios.get(`scrap/codechef/gennady.korotkevich`);
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
                let required = ["Stars", "Maximum Rating", "Rating"];
                let fieldObj = {};
                res.forEach((ele) => {
                    if (required.includes(ele.label))
                        fieldObj[ele.label] = ele.value;
                });
                fieldObj[
                    "profile_link"
                ] = `https://www.codechef.com/users/${props.handle}`;
                setData(fieldObj);
            })
            .catch((e) => {
                setError(e.message || "Something went wrong!");
            });
    }, [props.handle]);

    return !loading ? (
        <Card className={classes.card} elevation={10} sx={{ p: 3 }}>
            <Box>
                <CodeChef />
            </Box>
            {data.Stars ? (
                <>
                    <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        sx={{ marginBottom: "0" }}
                        color="text.primary"
                    >
                        {data["Rating"]}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ fontWeight: "700" }}
                        color="text.secondary"
                    >
                        {Array(data["Stars"])
                            .fill("★")
                            .map((ele) => ele)}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {data["Maximum Rating"]}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Highest rating
                    </Typography>
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

export default CCCard;
