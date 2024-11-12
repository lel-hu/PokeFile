import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";

document.getElementById('firstMessage')!.style.display = "none";

createRoot(document.getElementById("root")!).render(
  <CssBaseline>
    <App />
  </CssBaseline>
);
