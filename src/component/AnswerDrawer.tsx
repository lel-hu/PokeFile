import React from "react";
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  Drawer,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IosShareIcon from "@mui/icons-material/IosShare";
import XIcon from "@mui/icons-material/X";
import { typesList } from "../utils/typeData";

interface AnswerDrawerProps {
  isCorrect: boolean | null;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | null>>;
  pokemon: {
    ja: string;
    en: string;
    types: string[];
    image: string;
  };
  handleNextPokemon: () => Promise<void>;
}

const AnswerDrawer: React.FC<AnswerDrawerProps> = ({
  isCorrect,
  setIsCorrect,
  pokemon,
  handleNextPokemon,
}) => {
  return (
    <Drawer
      anchor={"bottom"}
      open={isCorrect !== null}
      onClose={() => setIsCorrect(null)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#E7EDF5",
        }}
      >
        <Box sx={{ p: 2 }} />
        <Paper
          elevation={3}
          sx={{
            borderRadius: 1,
            maxWidth: "360px",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          }}
        >
          <Box sx={{ p: 1 }} />
          {isCorrect ? (
            <Typography
              sx={{
                p: 1,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              😃
              <br />
              Correct!!
              <br /> せいかい!!
            </Typography>
          ) : (
            <Typography
              sx={{
                p: 1,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              ☹️
              <br /> Incorrect... <br />
              ざんねん...不正解
            </Typography>
          )}
          <Box sx={{ p: 1 }} />

          <Accordion
            sx={{
              backgroundColor: "#ECF4F8",
              borderRadius: "4px 4px 8px 8px",
              maxWidth: "360px",
              width: "100%",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Show answer / こたえ</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "rgba(180, 200, 255, 0.2)",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <Paper
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    borderRadius: 2,
                    p: 1,
                  }}
                >
                  <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                    {pokemon.en}
                  </Typography>
                  <Divider sx={{ width: "100%" }} />
                  <Typography sx={{ fontWeight: "bold", fontStyle: "italic" }}>
                    {pokemon.ja}
                  </Typography>
                </Paper>

                <Box sx={{ p: 1 }} />
                {pokemon.types.map((type) => {
                  const cleanedType = type
                    .replace("タイプのポケモン", "")
                    .trim();
                  const typeData = typesList.find((t) =>
                    t.jpn.includes(cleanedType)
                  );
                  return (
                    <Typography key={type} sx={{ fontWeight: "bold" }}>
                      ・{" "}
                      {typeData ? `${typeData.eng} / ${typeData.jpn} ` : type}
                    </Typography>
                  );
                })}
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Paper>
        <Box sx={{ p: 2 }} />
        <Button
          variant="outlined"
          href="https://twitter.com/intent/tweet?text=%E3%83%9D%E3%82%B1%E3%83%A2%E3%83%B3%E3%82%BF%E3%82%A4%E3%83%97%E8%A8%80%E3%81%88%E3%82%8B%E3%81%8B%E3%81%AA%EF%BC%9F%0APokeFile%E3%81%A7%E9%81%8A%E3%82%93%E3%81%A7%E3%81%BF%E3%82%88%E3%81%86%EF%BC%81%0Ahttps%3A%2F%2Fpokefile-final.web.app%2F"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 40,
            width: 360,
            height: 56,
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Typography variant="caption">Share this app with</Typography>
            <XIcon
              sx={{ marginLeft: 0.5, marginRight: 0.5, fontSize: "0.7rem" }}
            />
            <Typography
              sx={{
                marginTop: -0.6,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              アプリを
              <XIcon
                sx={{
                  fontSize: "1rem",
                  marginLeft: 0.2,
                  marginRight: 0.2,
                  position: "relative",
                  top: "-1.5px",
                }}
              />
              で共有
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: "80%",
              top: "58%",
              transform: "translateX(-50%) translateY(-50%)",
            }}
          >
            <IosShareIcon />
          </Box>
        </Button>
        <Box sx={{ p: 1 }} />
        <Button
          variant="contained"
          onClick={async () => await handleNextPokemon()}
          sx={{
            display: "flex",
            backgroundColor: "#03A9F4",
            alignItems: "center",
            borderRadius: 40,
            width: 360,
            height: 56,
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Typography variant="caption">Next Pokémon</Typography>
            <Typography sx={{ marginTop: -0.8, fontWeight: "bold" }}>
              次のポケモン
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: "80%",
              top: "58%",
              transform: "translateX(-50%) translateY(-50%)",
            }}
          >
            <ArrowForwardIcon />
          </Box>
        </Button>
        <Box sx={{ p: 2 }} />
      </Box>
    </Drawer>
  );
};

export default AnswerDrawer;
