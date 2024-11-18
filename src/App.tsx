import { useEffect, useState } from "react";
import { Typography, Box, Paper } from "@mui/material";
import Wikidata from "./utils/API/wikidata";
import TypeButton from "./component/TypeButton";
import CheckingAnswerButton from "./component/CheckingAnswerButton";
import ResetButton from "./component/ResetButton";
import TopAppBar from "./component/TopAppBar";
import { typesList } from "./utils/typeData";
import { fetchPokemonImage } from "./utils/API/fetchPokemonImage";
import { handleTypeButtonClick } from "./utils/handleTypeButtonClick";
import { handleCheckAnswer } from "./utils/handleCheckAnswer";
import { handleNextPokemon } from "./utils/handleNextPokemon";
import PokemonDisplayContainer from "./component/PokemonDisplayContainer";
import AnswerDrawer from "./component/AnswerDrawer";

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
        <PokemonDisplayContainer pokemon={pokemon} />
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
              <Box sx={{ p: 1 }} />
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography variant="caption">Select type (up to 2)</Typography>
                <Typography sx={{ marginTop: -0.6, fontSize: "0.9rem" }}>
                  タイプを選択（2つまで）
                </Typography>
              </Box>
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
              {typesList.map((type) => (
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
        <AnswerDrawer
          isCorrect={isCorrect}
          setIsCorrect={setIsCorrect}
          pokemon={pokemon}
          handleNextPokemon={async () =>
            await handleNextPokemon(setIsCorrect, setSelectedTypes, setPokemon)
          }
        />
      </div>
    </>
  );
};

export default App;
