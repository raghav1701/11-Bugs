import { useContext, useEffect } from "react";
import { ThemeChangeContext } from "../contexts/ThemeChangeContext";
import { createTheme } from "@mui/material/styles";
import { Box, ThemeProvider } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import Auth from "./Auth/Auth";
import Profile from "./Profile/Profile";
import { UserContext } from "../contexts/UserContext";
import Login from "./Auth/Login";
import Settings from "./Misc/Settings";
import { grey } from "@mui/material/colors";
import Navbar from "./Navbar/Navbar";
import Signup from "./Auth/SignUp";

const MainComponent = () => {
  const [mode] = useContext(ThemeChangeContext);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      let res = await fetch("/auth/user");
      let status = res.status;
      res = await res.json();
      if (status === 200) {
        return res;
      }
      throw Error(res.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser()
      .then((res) => {
        if (!res.status) {
          setUser(() => {
            return {
              ...res,
              id: res.id,
            };
          });
          console.log("Logged in");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  //   Theme
  const theme = createTheme({
    palette: {
      mode: mode,
      background: {
        paper: mode === "light" ? grey[300] : grey[900],
        default: mode === "light" ? grey[100] : "#121212",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        position="fixed"
        sx={{
          background: theme.palette.background.default,
          zIndex: -1,
          top: 0,
          left: 0,
        }}
      />
      <Navbar />
      <Settings />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/signin" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>
  );
};

export default MainComponent;
