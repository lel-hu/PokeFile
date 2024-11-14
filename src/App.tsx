import { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Stack,
  Box,
  Paper,
  Drawer,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Wikidata from "./utils/API/wikidata";
import NoImage from "./assets/no_image.png";
import TypeButton from "./component/TypeButton";
import CheckingAnswerButton from "./component/CheckingAnswerButton";
import ResetButton from "./component/ResetButton";
import TopAppBar from "./component/TopAppBar";
import { types } from "./utils/typeData";
import { fetchPokemonImage } from "./utils/fetchPokemonImage";
import { handleTypeButtonClick } from "./utils/handleTypeButtonClick";
import { handleCheckAnswer } from "./utils/handleCheckAnswer";
import { handleNextPokemon } from "./utils/handleNextPokemon";

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
  const correctTypes: string[] = pokemon.types;

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

  return (
    <>
      <TopAppBar />
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#e7edf5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
              <img src={NoImage} alt="画像が見つかりませんでした" width="100" />
            )}
            <Typography variant="h6" sx={{ minWidth: "160px" }}>
              {pokemon.en}
              <br />
              {pokemon.ja}
            </Typography>
            <IconButton
              onClick={async () =>
                await handleNextPokemon(
                  setIsCorrect,
                  setSelectedTypes,
                  setPokemon
                )
              }
            >
              <ChangeCircleIcon />
            </IconButton>
          </Stack>
        </Paper>
        <Box sx={{ p: 1 }} />
        <Paper
          elevation={3}
          sx={{
            p: 1,
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
              <ResetButton setSelectedTypes={setSelectedTypes} />
            </Paper>
            <Box sx={{ p: "4px" }} />
            <Box
              sx={{
                maxWidth: 620,
                display: "flex",
                flexWrap: "wrap",
                width: "fit-content",
                justifyContent: "center",
              }}
            >
              {types.map((type) => (
                <TypeButton
                  selectedTypes={selectedTypes}
                  type={type}
                  handleButtonClick={() =>
                    handleTypeButtonClick(type.jpn, setSelectedTypes)
                  }
                />
              ))}
            </Box>
          </Box>
        </Paper>
        <Box sx={{ p: 1 }} />
        <CheckingAnswerButton
          handleCheckAnswer={() =>
            handleCheckAnswer(selectedTypes, correctTypes, setIsCorrect)
          }
        />
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
    </>
  );
};

export default App;
