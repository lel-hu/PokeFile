import { useState } from "react";
import {
  Typography,
  IconButton,
  Stack,
  Box,
  Paper,
  Button,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const App = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const pokemon: string = "ピカチュウ";
  const correctTypes: string[] = ["でんき"];
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

  const handleButtonClick = (type: string) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((t) => t !== type);
      } else if (prevSelectedTypes.length < 2) {
        return [...prevSelectedTypes, type];
      } else {
        return [type];
      }
    });
  };

  const handleCheckAnswer = () => {
    const isCorrect =
      selectedTypes.length === correctTypes.length &&
      selectedTypes.every((type) => correctTypes.includes(type));
    setIsCorrect(isCorrect);
  };

  return (
    <div>
      <Typography variant="h3">PokeFile</Typography>
      <Typography variant="h6">このポケモンのタイプは何でしょう？</Typography>
      <Box sx={{ p: 2 }} />

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="h6">{pokemon}</Typography>
        <IconButton>
          <ChangeCircleIcon />
        </IconButton>
      </Stack>
      <Box sx={{ p: 2 }} />
      <Paper elevation={3} sx={{ p: 2, width: "fit-content" }}>
        <Stack direction="row" spacing={2} sx={{alignItems:"center"}}>
          <Typography variant="h6">タイプを選択</Typography>
          <Button variant="outlined" onClick={() => setSelectedTypes([])}>
            {" "}
            リセット{" "}
          </Button>
        </Stack>
        <Box sx={{ p: 1 }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", maxWidth: 720 }}>
          {types.map((type) => (
            <Button
              variant={
              selectedTypes.includes(type.jpn) ? "outlined" : "contained"
              }
              key={type.jpn}
              sx={{
              m: 1,
              bgcolor: selectedTypes.includes(type.jpn)
                ? "#FFFFFF"
                : `#${type.color}`,
              color: selectedTypes.includes(type.jpn)
                ? `#${type.color}`
                : "#FFFFFF",
              border: `1px solid #${type.color}`,
              width: 106,
              height: 60,
              }}
              onClick={() => handleButtonClick(type.jpn)}
            >
              {type.eng}
              <br />
              {type.jpn}
            </Button>
          ))}
        </Box>
      </Paper>

      <Box sx={{ p: 2 }} />
      <Button variant="contained" onClick={handleCheckAnswer}>
        答え合わせ / checking answers
      </Button>
      {isCorrect !== null && (
        <Typography variant="h6">
          {isCorrect ? "正解です！" : "不正解です。"}
        </Typography>
      )}
    </div>
  );
};

export default App;
