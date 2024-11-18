import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import Logo from "../assets/PokeFile_logo.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React from "react";
import InfoDialog from "./InfoDialog";

function TopAppBar() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <img src={Logo} alt="PokeFile Logo" style={{ height: 30 }} />
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="information"
          onClick={handleClickOpen}
          sx={{ position: "absolute", right: 20 }}
        >
          <InfoOutlinedIcon sx={{ color: "#808080" }} />
        </IconButton>
      </Toolbar>
      <InfoDialog open={open} onClose={handleClose} />
    </AppBar>
  );
}

export default TopAppBar;
