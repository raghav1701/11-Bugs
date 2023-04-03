import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfilePop = (props) => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  //   Logout
  const handleLogout = async () => {
    try {
      let res = await fetch("/auth/logout", { method: "POST" });
      res = await res.json();
      if (!res.success) throw res.error;
      else {
        props.handleClose();
        navigate("/auth/signin");
        setUser({});
      }
    } catch (e) {
      console.log(e);
    }
  };

  //   Profile Routing
  const goToProfile = () => {
    props.handleClose();
    navigate("/profile/" + user._id);
  };

  return (
    <Menu
      anchorEl={props.anchor}
      open={props.open}
      onClose={props.handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={goToProfile}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfilePop;
