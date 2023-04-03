import {
  ListItem,
  Avatar,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const UserCard = (props) => {
  const navigate = useNavigate();
  const follow = () => {
    navigate(`/profile/${props.user._id}`);
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={follow}>
        <ListItemIcon>
          <Avatar src={props.user.avatar} />
        </ListItemIcon>
        <ListItemText primary={props.user.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default UserCard;
