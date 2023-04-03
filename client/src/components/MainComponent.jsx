import { useContext } from "react";
import { ThemeChangeContext } from "../contexts/ThemeChangeContext";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import Auth from "./Auth/Auth";
import Profile from "./Profile/Profile";
import { UserContext } from "../contexts/UserContext";
import Login from "./Auth/Login";

const MainComponent = () => {
  const [mode] = useContext(ThemeChangeContext);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      let res = await fetch("/auth/user");
      res = await res.json();
      return res;
    };
    fetchUser().then((res) => {
      if (!res.error) {
        setUser(() => {
          return {
            ...res,
            id: res.id,
          };
        });
        navigate("/");
      }
    });
  }, []);

  //   Theme
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/signin" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
};

export default MainComponent;
