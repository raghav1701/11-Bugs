import { Box, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

const Request = (props) => {
  const acceptRequest = async () => {
    try {
      const res = await axios.post("/friends/accept", { user: props.user._id });
      props.changeMount();
    } catch (e) {
      props.setError(e.message);
    }
  };
  const declineRequest = async () => {
    try {
      const res = await axios.post("/friends/decline", {
        user: props.user._id,
      });
      props.changeMount();
    } catch (e) {
      props.setError(e.message);
    }
  };
  return (
    <Box>
      <Tooltip title="Accept">
        <IconButton onClick={acceptRequest}>
          <CheckIcon color="success" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Decline">
        <IconButton onClick={declineRequest}>
          <CancelIcon color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default Request;
