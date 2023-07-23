import { Box, Divider, Typography, Grid } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import UserCard from "../UserCard/UserCard";

const HomeStyle = {
  // display: "flex",
  // justifyContent: "center",
  // alignItem: "center",
};

const Home = () => {
  const [user] = useContext(UserContext);
  return (
    <Grid container style={HomeStyle} sx={{ mt: 5 }}>
      <Grid item xs={12} md={8} sx={{ px: 1 }}>
        <Typography variant="h5" color="text.primary">
          Recommended User
        </Typography>
        <Box
          sx={{
            width: "100%",
            py: 2,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <UserCard />
        </Box>
      </Grid>
      <Divider />
      <Grid item sx={{ px: 2 }} xs={12} md={4}>
        <Box>
          <Typography variant="h5" color="text.primary">
            Global LeaderBoard
          </Typography>
          <LeaderBoard type={"global"} />
        </Box>
        <Divider />

        {user._id && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" color="text.primary">
              Friends LeaderBoard
            </Typography>
            <LeaderBoard type={"friends"} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
