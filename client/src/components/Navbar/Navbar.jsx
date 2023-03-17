import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Tooltip, useTheme } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";

const EmptySpace = styled("div")(({ theme }) => ({
  flexGrow: 1,
  margin: "auto 1rem",
}));

const Container = styled("div")(({ theme }) => ({
  // position: 'fixed',
  display: "flex",
  alignItems: "center",
  width: "100%",
}));

const Navbar = (props) => {
  const theme = useTheme();
  const [user, setUser] = React.useContext(UserContext);
  // console.log(user.id);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let res = await fetch("/auth/logout", { method: "POST" });
      res = await res.json();
      if (!res.success) throw res.error;
      else {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar
          style={{
            minHeight: "10vh",
            height: "10vh",
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              color={theme.palette.primary.contrastText}
              sx={{
                // flexGrow: 1,
                display: { sm: "block" },
              }}
            >
              11 BUGS
            </Typography>
          </Link>
          <EmptySpace />
          <Typography
            variant="h7"
            noWrap
            component="div"
            sx={{ p: 1, cursor: "pointer" }}
            color={theme.palette.primary.contrastText}
          >
            Profile
          </Typography>
          <Typography
            variant="h7"
            noWrap
            component="div"
            sx={{ p: 1, cursor: "pointer" }}
            color={theme.palette.primary.contrastText}
          >
            Login
          </Typography>
          {/* {user._id && ( */}
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <LogoutIcon
                sx={{
                  background: theme.palette.error.main,
                  color: "white",
                  p: 1,
                  borderRadius: "20px",
                }}
              />
            </IconButton>
          </Tooltip>
          {/* )} */}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Navbar;
