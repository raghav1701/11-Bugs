import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const EditProfileDialog = (props) => {
  const { open, handleClose, prev } = props;
  const [error, setError] = useState("");
  const [data, setData] = useState(prev);

  const handleChange = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const save = async () => {
    try {
      //   console.log(value);
      const res = await axios.patch("/profile", {
        name: data.name,
        email: data.email,
        resume: data.resume,
      });
      window.location.reload();
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    setData(prev);
  }, [prev]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            label="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            sx={{ my: 1 }}
          />
          <TextField
            label="Resume Link"
            name="resume"
            value={data.resume}
            onChange={handleChange}
            sx={{ my: 1 }}
          />
          {/* <TextField
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            sx={{ my: 1 }}
          /> */}
        </FormControl>
        {error && (
          <Typography align="center" color="error">
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
