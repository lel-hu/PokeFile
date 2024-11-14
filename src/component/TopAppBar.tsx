import { AppBar, Toolbar } from "@mui/material";
import Logo from "../assets/PokeFile_logo.png";

function TopAppBar() {
  return (
    <AppBar position="static" color="default" sx={{ alignItems: "center" }}>
      <Toolbar>
        <img src={Logo} alt="PokeFile Logo" style={{ height: 40 }} />
      </Toolbar>
    </AppBar>
  );
}
export default TopAppBar;
