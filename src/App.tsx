import { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Stack,
  Box,
  Paper,
  Button,
  AppBar,
  Toolbar,
  Drawer,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Wikidata from "./utils/API/wikidata";
import SendIcon from "@mui/icons-material/Send";
import Logo from "./assets/PokeFile_logo.png";
import NoImage from "./assets/no_image.png";

const App: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [pokemon, setPokemon] = useState<{
    ja: string;
    en: string;
    types: string[];
    image: string;
  }>({
    ja: "",
    en: "",
    types: [],
    image: "",
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const result = await Wikidata.fetchRandomPokemon();
        const imageUrl = await fetchPokemonImage(result.en); // 画像URLを取得
        setPokemon({ ...result, image: imageUrl });
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
  }, []);

  // PokeAPIを使ってポケモン画像を取得する関数
  const fetchPokemonImage = async (pokemonName: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("ポケモンのデータ取得に失敗しました");
      }
      const data = await response.json();
      return data.sprites.other["official-artwork"].front_default;
    } catch (error) {
      console.error("Error fetching image from PokeAPI:", error);
      return ""; // エラーハンドリング: 画像が取得できない場合の処理
    }
  };

  const correctTypes: string[] = pokemon.types;
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
    console.log("Selected Types:", selectedTypes);
    console.log("Correct Types:", correctTypes);
    const isCorrect =
      selectedTypes.length === correctTypes.length &&
      selectedTypes.every((selectedType) =>
        correctTypes.some((correctType) => correctType.includes(selectedType))
      );
    setIsCorrect(isCorrect);
    console.log("Is Correct:", isCorrect);
  };

  const handleNextPokemon = () => {
    setIsCorrect(null); // 正誤結果をリセット
    setSelectedTypes([]); // 選択中のタイプをリセット
    const fetchPokemon = async () => {
      try {
        const result = await Wikidata.fetchRandomPokemon();
        const imageUrl = await fetchPokemonImage(result.en); // 画像URLを取得
        setPokemon({ ...result, image: imageUrl });
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };
    fetchPokemon();
  };

  return (
    <>
      <AppBar position="static" color="default" sx={{ alignItems: "center" }}>
        <Toolbar>
          <img src={Logo} alt="PokeFile Logo" style={{ height: 40 }} />
        </Toolbar>
      </AppBar>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#e7edf5",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "10px",
            backgroundColor: "#e7edf5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">ポケモンのタイプを当てよう！</Typography>
          <Box sx={{ p: 1 }} />

          <Paper sx={{ width: "fit-content", p: 2 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              {/* 画像を表示 */}
              {pokemon.image ? (
                <img src={pokemon.image} alt={pokemon.en} width="100" />
              ) : (
                <img
                  src={NoImage}
                  alt="画像が見つかりませんでした"
                  width="100"
                />
              )}
              <Typography variant="h6" sx={{ minWidth: "160px" }}>
                {pokemon.en}
                <br />
                {pokemon.ja}
              </Typography>
              <IconButton onClick={handleNextPokemon}>
                <ChangeCircleIcon />
              </IconButton>
            </Stack>
          </Paper>
          <Box sx={{ p: 1 }} />
          <Paper
            elevation={3}
            sx={{
              p: "16px 0px 16px 0px",
              width: "fit-content",
              borderRadius: "32px 8px 32px 8px",
              backgroundColor: "#E7EDF5",
            }}
          >
            <Box sx={{ justifyItems: "center", alignContent: "center" }}>
              <Paper
                elevation={3}
                sx={{
                  flexDirection: "row",
                  display: "flex",
                  backgroundColor: "#ECF4F8",
                  alignItems: "center",
                  borderRadius: 40,
                  p: "8px 16px 8px 16px",
                  width: "fit-content",
                }}
              >
                <Typography>タイプを選択（2つまで）</Typography>
                <Box sx={{ p: 1 }} />
                <Button
                  variant="outlined"
                  onClick={() => setSelectedTypes([])}
                  sx={{
                    borderRadius: 40,
                    color: "#FF0000",
                    border: `1px solid #FF0000`,
                  }}
                >
                  {" "}
                  リセット{" "}
                </Button>
              </Paper>
              <Box sx={{ p: "4px" }} />
              <Box
                sx={{
                  maxWidth: 720,
                  display: "flex",
                  flexWrap: "wrap",
                  width: "fit-content",
                  justifyContent: "center",
                }}
              >
                {types.map((type) => (
                  <Button
                    variant={
                      selectedTypes.includes(type.jpn)
                        ? "outlined"
                        : "contained"
                    }
                    key={type.jpn}
                    sx={{
                      m: "4px",
                      flex: "1 1 calc(33.333% - 16px)",
                      bgcolor: selectedTypes.includes(type.jpn)
                        ? "#FFFFFF"
                        : `#${type.color}`,
                      color: selectedTypes.includes(type.jpn)
                        ? `#${type.color}`
                        : "#FFFFFF",
                      border: `1px solid #${type.color}`,
                      width: "auto",
                      height: 56,
                      maxWidth: 140,
                      borderRadius: "24px 8px 24px 8px",
                    }}
                    onClick={() => handleButtonClick(type.jpn)}
                  >
                    {type.eng}
                    <br />
                    {type.jpn}
                  </Button>
                ))}
              </Box>
            </Box>
          </Paper>

          <Box sx={{ p: 1 }} />
          <Button
            variant="contained"
            onClick={handleCheckAnswer}
            sx={{
              flexDirection: "row",
              display: "flex",
              backgroundColor: "#03A9F4",
              alignItems: "center",
              borderRadius: 40,
              width: 320,
              height: 56,
            }}
            endIcon={<SendIcon />}
          >
            答え合わせ
            <br />
            checking answers
          </Button>
          {isCorrect !== null && <></>}
          <Drawer
            anchor={"bottom"}
            open={isCorrect !== null}
            onClose={() => setIsCorrect(null)}
          >
            <Typography variant="h6" sx={{ p: 16 }}>
              {isCorrect ? "正解です！" : "不正解です。"}
            </Typography>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default App;
