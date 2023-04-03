import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Tooltip, useTheme } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import ProfilePop from "./ProfilePop";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { makeStyles } from "@mui/styles";
import { ThemeChangeContext } from "../../contexts/ThemeChangeContext";
import { alpha } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  options: {
    margin: theme.spacing(1),
  },
  svg: {
    fill: alpha(theme.palette.common.black, 1),
    stroke: alpha(theme.palette.common.black, 1),
  },
}));

const EmptySpace = styled("div")(({ theme }) => ({
  flexGrow: 1,
  margin: "auto 1rem",
}));

const Navbar = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [mode, changeMode] = React.useContext(ThemeChangeContext);
  const [user, setUser] = React.useContext(UserContext);
  const [profilePop, setProfilePop] = React.useState({
    open: false,
    anchor: null,
  });

  const handleProfilePopOpen = (event) => {
    setProfilePop({ open: true, anchor: event.currentTarget });
  };

  const handleProfilePopClose = () => {
    setProfilePop({ open: false, anchor: null });
  };

  return (
    <AppBar
      position="sticky"
      sx={{ background: theme.palette.background.paper }}
    >
      <Toolbar>
        <Link style={{ textDecoration: "none" }} to="/">
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            color={theme.palette.text.primary}
          >
            11 BUGS
          </Typography> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56.857"
            height="35"
            viewBox="0 0 56.857 35"
          >
            <g
              id="Group_3"
              data-name="Group 3"
              transform="translate(-289 -242)"
            >
              <g id="Group_2" data-name="Group 2">
                <text
                  id="_11"
                  data-name="11"
                  transform="translate(289 269)"
                  className={classes.svg}
                  font-size="30"
                  font-family="Stencil"
                >
                  <tspan x="0" y="0">
                    11
                  </tspan>
                </text>
                <g id="High-contrast-bug-buddy" transform="translate(320 242)">
                  <path
                    id="Path_1"
                    data-name="Path 1"
                    d="M5.177,5l18.5,20.68M23.68,5,5.177,25.68m20.68-8.707H3"
                    transform="translate(0 0)"
                    className={classes.svg}
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                  <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M17.075,8c-4.091.377-7.216,4.85-7.07,10.121s3.512,9.446,7.614,9.446,7.467-4.175,7.614-9.446S22.254,8.377,18.163,8Zm.272,0V27.047m.544,0V8.544"
                    transform="translate(-3.19 -1.367)"
                    fill="#fff"
                    className={classes.svg}
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                  <path
                    id="Path_3"
                    data-name="Path 3"
                    d="M12,15.53a6.53,6.53,0,0,1,13.061,0"
                    transform="translate(-4.102 -1.823)"
                    className={classes.svg}
                    className={classes.svg}
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                </g>
              </g>
            </g>
          </svg>
        </Link>
        <EmptySpace />
        <Tooltip title="Change Theme" className={classes.options}>
          <IconButton onClick={changeMode}>
            <Brightness4Icon />
          </IconButton>
        </Tooltip>
        {user._id ? (
          <>
            <Tooltip title="Profile" className={classes.options}>
              <IconButton onClick={handleProfilePopOpen}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>

            <ProfilePop
              open={profilePop.open}
              anchor={profilePop.anchor}
              handleClose={handleProfilePopClose}
            />
          </>
        ) : (
          <Link
            to="/auth/signin"
            style={{ textDecoration: "none" }}
            className={classes.options}
          >
            <Button color="primary" variant="contained">
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
