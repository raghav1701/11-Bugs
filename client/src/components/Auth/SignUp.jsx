import React, { useState } from "react";
import { NavLink, useHistory, useNavigate } from "react-router-dom";
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
import { Box, Card, useTheme } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    // width: '100vw',
    minHeight: "90vh",
    margin: "0",
    display: "flex",
    alignItems: "center",
    // border: `1px solid ${theme.palette.divider}`,
    // borderRadius: '1rem',
  },
  form: {
    width: "100%",
    maxWidth: 350,
    padding: 30,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  lock: {},
}));

const Signup = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = React.useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loader, setLoader] = useState(false);

  const classes = useStyles();
  const avatarStyle = { backgroundColor: "#1bbd7e", margin: "auto 0.5rem" };
  const btnstyle = { margin: "8px 0" };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
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
      setLoader(true);
      let res = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      res = await res.json();
      if (res._id) {
        setUser(res);
        setErrors("");
        navigate("/");
      } else {
        setErrors(res.message || "Something went wrong");
      }
      setLoader(false);
    } catch (e) {
      console.log(e);
      setErrors("Something went wrong");
      setLoader(false);
    }
    // console.log(name, email, profession, password);
    // setErrors("");
  };

  return (
    <Grid className={classes.container}>
      <Card elevation={5} className={classes.form}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar style={avatarStyle} className={classes.lock}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography>Sign Up</Typography>
        </Box>
        <TextField
          label="Name"
          variant="outlined"
          placeholder="Enter name"
          fullWidth
          required
          style={{ marginTop: "20px" }}
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
        <Button
          type="submit"
          color="success"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={submitHandler}
          disabled={loader}
        >
          Signup
        </Button>

        <Typography>
          <NavLink
            to="/auth/signin"
            style={{ color: theme.palette.text.primary }}
          >
            Already have an account?
          </NavLink>
        </Typography>
      </Card>
    </Grid>
  );
};

export default Signup;
