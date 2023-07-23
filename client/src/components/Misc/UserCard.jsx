import {
  ListItem,
  Avatar,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import axios from "axios";
import Request from "./Request";
import { UserContext } from "../../contexts/UserContext";

const UserCard = (props) => {
  const { type } = props;
  const [user] = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const follow = () => {
    navigate(`/profile/${props.user._id}`);
  };
  const removeFriend = async () => {
    try {
      const res = await axios.post("/friends/remove", {
        user: props.user._id,
      });
      props.changeMount();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={follow}>
          <ListItemIcon>
            <Avatar src={props.user.avatar} />
          </ListItemIcon>
          <ListItemText primary={props.user.name} />
        </ListItemButton>
        {user._id && type === "friend" && props.data._id === user._id && (
          <Box>
            <Tooltip title="Remove">
              <IconButton onClick={removeFriend}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {type === "request" && (
          <Request
            user={props.user}
            changeMount={props.changeMount}
            setError={setError}
          />
        )}
      </ListItem>
    </>
  );
};

export default UserCard;
