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
  const pokemon: string = "ピカチュウ";
  const types = [
    { jpn: "ノーマル", eng: "nomal", color: "9FA19F" },
    { jpn: "ほのお", eng: "fire", color: "F08030" },
    { jpn: "みず", eng: "water", color: "4592C4" },
    { jpn: "でんき", eng: "electric", color: "F8D030" },
    { jpn: "くさ", eng: "grass", color: "78C850" },
    { jpn: "こおり", eng: "ice", color: "98D8D8" },
    { jpn: "かくとう", eng: "fighting", color: "C03028" },
    { jpn: "どく", eng: "poison", color: "A040A0" },
    { jpn: "じめん", eng: "ground", color: "E0C068" },
    { jpn: "ひこう", eng: "flying", color: "A890F0" },
    { jpn: "エスパー", eng: "psychic", color: "F85888" },
    { jpn: "むし", eng: "bug", color: "A8B820" },
    { jpn: "いわ", eng: "rock", color: "B8A038" },
    { jpn: "ゴースト", eng: "ghost", color: "705898" },
    { jpn: "ドラゴン", eng: "dragon", color: "7038F8" },
    { jpn: "あく", eng: "dark", color: "705848" },
    { jpn: "はがね", eng: "steel", color: "B8B8D0" },
    { jpn: "フェアリー", eng: "fairy", color: "EE99AC" },
  ];

  return (
    <div
      style={{
        // background: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          // background: "blue",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Box sx={{ p: 4 }}>
          <Typography variant="h3">PokeFile</Typography>
          <Typography variant="h6">
            このポケモンのタイプは何でしょう？
          </Typography>
          <Box sx={{ p: 2 }} />

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="h6">{pokemon}</Typography>
            <IconButton>
              <ChangeCircleIcon />
            </IconButton>
          </Stack>
          <Box sx={{ p: 2 }} />
            <Paper elevation={3} sx={{ p: 2, width: "fit-content" }}>
            <Typography variant="h6">タイプを選択</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", maxWidth: 720 }}>
              {types.map((type) => (
              <Button
                variant="contained"
                key={type.jpn}
                sx={{
                m: 1,
                bgcolor: `#${type.color}`,
                width: 120,
                height: 60,
                flex: "1 1 calc(16.66% - 16px)", // 16.66% for 6 items per row, minus margin
                maxWidth: "calc(16.66% - 16px)",
                }}
              >
                {type.jpn}
              </Button>
              ))}
            </Box>
            </Paper>

          <Box sx={{ p: 2 }} />
          <Button variant="contained">答え合わせ</Button>
        </Box>
      </div>
    </div>
  );
}

export default App;
