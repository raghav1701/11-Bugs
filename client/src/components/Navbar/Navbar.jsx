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
import BugReportIcon from "@mui/icons-material/BugReport";

const useStyles = makeStyles((theme) => ({
  options: {
    margin: theme.spacing(1),
  },
  svg: {
    fill: theme.palette.text.primary,
    stroke: theme.palette.text.primary,
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
        <Link
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            color: theme.palette.text.primary,
          }}
          to="/"
        >
          <Typography
            variant="h5"
            color={theme.palette.text.primary}
            sx={{ verticalAlign: "center", font: "Stencil" }}
          >
            11
          </Typography>
          <BugReportIcon sx={{ fontSize: 32 }} />
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
