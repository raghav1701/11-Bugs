import { Grid, CardMedia, Typography } from "@mui/material";

const Error = ({ error }) => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CardMedia
          component="img"
          image={process.env.PUBLIC_URL + "/sad.svg"}
          sx={{ width: "100%", maxWidth: 400 }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" color="error">
          {error}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Error;
