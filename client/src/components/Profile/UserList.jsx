import {
  CircularProgress,
  Grid,
  List,
  Typography,
  useTheme,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import UserCard from "../Misc/UserCard";
import { useState } from "react";

const UserList = (props) => {
  const theme = useTheme();
  const { data, type, value, index, children } = props;

  const [loading, setLoading] = useState(false);

  const getType = () => {
    if (type === "friends") return "Friends";
    if (type === "request") return "Requests";
    return "Sent";
  };

  return (
    <>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        {!loading ? (
          value === index && (
            <List
              sx={{
                width: "100%",
                maxHeight: "60vh",
                overflow: "auto",
              }}
            >
              {children}
            </List>
          )
        ) : (
          <CircularProgress sx={{ p: theme.spacing(5) }} />
        )}
      </Grid>
    </>
  );
};
export default UserList;
