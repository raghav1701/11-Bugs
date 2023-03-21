import { Box, Button, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ThemeChangeContext } from "../../contexts/ThemeChangeContext";

const Settings = () => {
  const theme = useTheme();
  const [mode, changeMode] = useContext(ThemeChangeContext);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      }}
    >
      <Button onClick={changeMode}>Change Theme</Button>
    </Box>
  );
};

export default Settings;
