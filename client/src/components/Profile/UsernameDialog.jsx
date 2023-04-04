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

const UsernameDialog = (props) => {
  const { open, code, handleClose, handle } = props;
  const [value, setValue] = useState(handle);
  const [error, setError] = useState("");

  const handleChange = (e) => setValue(e.target.value.trim());

  const save = async () => {
    try {
      console.log(value);
      const res = await axios.patch("/profile/handle", {
        handle: value,
        code: code,
      });
      window.location.reload();
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    setValue(handle);
  }, [handle]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit {code} Username</DialogTitle>
      <DialogContent>
        <FormControl sx={{ width: "100%" }}>
          <TextField name="handle" value={value} onChange={handleChange} />
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

export default UsernameDialog;
