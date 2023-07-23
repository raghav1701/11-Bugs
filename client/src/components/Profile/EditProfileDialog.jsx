import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const EditProfileDialog = (props) => {
  const { open, handleClose, prev } = props;
  const [error, setError] = useState("");
  const [data, setData] = useState(prev);
  const imgInput = useRef(null);

  const handleChange = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const save = async () => {
    try {
      const res = await axios.patch("/profile", {
        name: data.name,
        email: data.email,
        resume: data.resume,
        avatar: data.avatar,
      });
      window.location.reload();
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    setData(prev);
  }, [prev]);

  const handleClick = () => {
    imgInput.current.click();
    // imgInput.current.
  };

  const handleImageChange = (e) => {
    try {
      const file = e.target.files[0];
      var reader = new FileReader();

      reader.onload = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        setData((prev) => ({
          ...prev,
          avatar: "data:image/jpeg;base64," + btoa(binaryString),
        }));
      };

      reader.readAsBinaryString(file);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <FormControl sx={{ width: "100%" }}>
          <Box>
            <Avatar
              alt="Avatar"
              src={`${data.avatar}`}
              onClick={handleClick}
              sx={{ cursor: "pointer", height: 100, width: 100 }}
            />
            <input
              ref={imgInput}
              type="file"
              onChange={handleImageChange}
              accept="image/jpeg, image/png, image/jpg"
              style={{ visibility: "hidden" }}
            />
          </Box>
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
