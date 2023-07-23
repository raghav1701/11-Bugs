import { useContext, useEffect } from "react";
import { ThemeChangeContext } from "../contexts/ThemeChangeContext";
import { createTheme } from "@mui/material/styles";
import { Box, Container, ThemeProvider, GlobalStyles } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import Auth from "./Auth/Auth";
import Profile from "./Profile/Profile";
import { UserContext } from "../contexts/UserContext";
import Login from "./Auth/Login";
import { grey } from "@mui/material/colors";
import Navbar from "./Navbar/Navbar";
import Signup from "./Auth/SignUp";
import Search from "./Search/Search";
import LeaderBoard from "./LeaderBoard/LeaderBoard";

const MainComponent = () => {
  const [mode] = useContext(ThemeChangeContext);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      let res = await fetch("/auth/user", { method: "POST" });
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

  // Effect
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
          // navigate("/");
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
        paper: mode === "light" ? grey[100] : grey[800],
        default: mode === "light" ? grey[300] : grey[900],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          html: {
            backgroundColor: theme.palette.background.default,
          },
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: 10,
            height: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: mode === "light" ? grey[400] : grey[800],
            borderRadius: 10,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: mode === "light" ? grey[500] : grey[700],
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: mode === "light" ? grey[500] : grey[700],
            },
        }}
      />
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
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default MainComponent;
