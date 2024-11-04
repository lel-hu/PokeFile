import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

function App() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3">PokeFile</Typography>
      <Typography variant="h6">このポケモンのタイプは何でしょう？</Typography>
      <Box sx={{ p: 2 }} />

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="h6">ピカチュウ</Typography>
        <IconButton>
          <ChangeCircleIcon />
        </IconButton>
      </Stack>
      <Box sx={{ p: 2 }} />
      <Paper elevation={3} sx={{ p: 2, width: "fit-content" }}>
        <Typography variant="h6">タイプ1</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">でんき</Button>
          <Button variant="contained">くさ</Button>
          <Button variant="contained">ほのお</Button>
          <Button variant="contained">みず</Button>
        </Stack>
      </Paper>
      <Box sx={{ p: 2 }} />
      <Paper elevation={3} sx={{ p: 2, width: "fit-content" }}>
        <Typography variant="h6">タイプ2</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">でんき</Button>
          <Button variant="contained">くさ</Button>
          <Button variant="contained">ほのお</Button>
          <Button variant="contained">みず</Button>
        </Stack>
      </Paper>
      <Box sx={{ p: 2 }} />
      <Button variant="contained">答え合わせ</Button>
    </Box>
  );
}

export default App;
