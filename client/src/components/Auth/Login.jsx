import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from "@mui/styles";

import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  container: {
    // width: '100vw',
    height: "100vh",
    margin: "0",
    display: "flex",
    alignItems: "center",
    // border: `1px solid ${theme.palette.divider}`,
    // borderRadius: '1rem',
  },
  form: {
    padding: 30,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  lock: {},
}));
const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loader, setLoader] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const avatarStyle = { backgroundColor: "#1bbd7e", margin: "20px 0.5rem" };
  const btnstyle = { margin: "8px 0" };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setErrors("Please Fill the details");
        return;
      }
      // Check if Email is Valid or not
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      const result = await regex.test(email);
      if (result === false) {
        setErrors("Email is Badly Formatted");
        return;
      }
      // console.log(email,password);
      let res = await fetch("/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      res = await res.json();
      console.log(res);
      if (res._id) {
        setUser(res);
        navigate("/");
        setErrors("");
      } else {
        setErrors(res.message || "Something went wrong");
      }
    } catch (e) {
      console.log(e);
      setErrors("Something went wrong");
    }
  };

  return (
    <Grid className={classes.container}>
      <Paper elevation={20} className={classes.form}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar style={avatarStyle} className={classes.lock}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log In</h2>
        </div>
        <TextField
          label="Email"
          variant="outlined"
          placeholder="Enter Email"
          fullWidth
          required
          style={{ marginTop: "20px" }}
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          style={{ marginTop: "20px" }}
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors ? (
          <Typography style={{ color: "red" }}>{errors}</Typography>
        ) : null}
        {loader ? (
          <Button
            type="submit"
            color="success"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={submitHandler}
            disabled
          >
            Sign in
          </Button>
        ) : (
          <Button
            type="submit"
            color="success"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={submitHandler}
          >
            Sign in
          </Button>
        )}

        <Typography>
          <NavLink
            to="/register"
            style={{ textDecoration: "none", color: "black" }}
          >
            Do you have an account?
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
