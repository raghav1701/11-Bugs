import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";

import UCTop from "./UCTop";
import UCBottom from "./UCBottom";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import {
    CircularProgress,
    Dialog,
    DialogContent,
    IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material";

import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Context from "@mui/base/TabsUnstyled/TabsContext";
import { UserContext } from "../../contexts/UserContext";

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
    CARD: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        // border: "1px solid #D1D1D1",
        // borderRadius: "4px",
        // boxShadow: "2px 2px 5px #00000016",
        // padding: "10px",
        // margin: "50px",
        [theme.breakpoints.down("sm")]: {
            // margin: "20px",
        },
        [theme.breakpoints.down("xs")]: {
            // margin: "5px",
        },
        width: "100%",
        maxWidth: 700,
    },
    LoaderGridTop: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "120px",
        marginBottm: "5px",
        border: `1px solid ${theme.palette.divider}`,
    },
    LoaderGridBottom: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
        border: `1px solid ${theme.palette.divider}`,
    },
    NextButton: {
        // position: absolu
    },
}));

const UserCard = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const [data, setData] = useState({
        email: "",
        name: "",
        karma: 0,
        avatar: "",
        scores: { github: 0, codechef: 0, codeforces: 0 },
        handles: { github: "", codechef: "", codeforces: "" },
        friends: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [counter, setCounter] = useState(0);
    const [user, setUser] = React.useContext(UserContext);
    const [prevId, setPrevId] = useState([]);
    const [end, setEnd] = useState({
        title: "",
        description: "",
    });
    const [preVote, setPreVote] = useState(0);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchUserProfile = async () => {
        try {
            setError("");
            setLoading(true);
            let res = await axios.post(`/recommend/no-auth?page=${counter}`, {
                user: user._id,
            });
            setLoading(false);
            return res.data.results[0];
        } catch (e) {
            setError(e.message || "Something went wrong!");
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUserProfile()
            .then((res) => {
                if (!res) {
                    setEnd({
                        title: "No more user exists",
                        description:
                            "You have scrolled through all available users in the list.",
                    });
                    // handleOpen();
                } else {
                    // setPrevId((prev) => {
                    //   return [...prev, res._id];
                    // });
                    setData(res);
                    const temp = res.review.find((r) => r.user === user._id);
                    setPreVote(temp.value);
                }
            })
            .catch((e) => {
                setError(e.message || "Something went wrong!");
            });
    }, [counter]);

    useEffect(() => {
        if (user._id) {
        }
    }, [data]);

    const handlePageChange = () => {
        setCounter((prev) => {
            return prev + 1;
        });
    };

    return (
        <Card className={classes.CARD} sx={{ p: 3 }}>
            {end.title ? (
                <Typography color={theme.palette.warning.main} align="center">
                    You have reached the end!
                </Typography>
            ) : (
                <>
                    <Grid container>
                        {/* top */}

                        {!loading ? (
                            <Grid item container xs={12} md={12}>
                                <UCTop data={{ ...data, preVote: preVote }} />
                            </Grid>
                        ) : (
                            <Grid
                                item
                                className={classes.LoaderGridTop}
                                container
                                xs={12}
                                md={12}
                            >
                                <CircularProgress
                                    sx={{
                                        p: theme.spacing(1),
                                        color: theme.palette.divider,
                                    }}
                                />
                            </Grid>
                        )}
                        {/* bottom */}

                        {!loading ? (
                            <Grid item container xs={12} md={12}>
                                <UCBottom
                                    Overloading={loading}
                                    handle={data.handles}
                                />
                            </Grid>
                        ) : (
                            <Grid
                                item
                                className={classes.LoaderGridBottom}
                                container
                                xs={12}
                                md={12}
                            >
                                <CircularProgress
                                    sx={{
                                        p: theme.spacing(1),
                                        color: theme.palette.divider,
                                    }}
                                />
                            </Grid>
                        )}
                    </Grid>

                    <Button
                        className={classes.NextButton}
                        onClick={handlePageChange}
                    >
                        <NavigateNextIcon />
                        {/* won't work on loading */}
                    </Button>
                </>
            )}
        </Card>
    );
};

export default UserCard;
