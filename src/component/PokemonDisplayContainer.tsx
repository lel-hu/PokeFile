import { Paper, Stack, Typography, IconButton, Box } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import NoImage from "../assets/no_image.png";
import BackgroundImage from "../assets/poke_bg.jpg";
interface PokemonDisplayContainerProps {
  pokemon: {
    ja: string;
    en: string;
    image: string;
  };
  handleNextPokemon: () => Promise<void>;
}

function PokemonDisplayContainer({
  pokemon,
  handleNextPokemon,
}: PokemonDisplayContainerProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 4,
        width: "100%",
        maxWidth: 636,
      }}
    >
      <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            p: 1,
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9)), url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {pokemon.image ? (
            <Box
              component="img"
              src={pokemon.image}
              alt={pokemon.en}
              sx={{
                width: 110,
                height: 110,
              }}
            />
          ) : (
            <Box
              component="img"
              src={NoImage}
              alt="画像が見つかりませんでした"
              sx={{
                width: 110,
                height: 110,
              }}
            />
          )}
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              {pokemon.en}
            </Typography>
            <Typography
              sx={{
                marginTop: -0.5,
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {pokemon.ja}
            </Typography>
          </Box>
          <IconButton onClick={async () => handleNextPokemon()}>
            <ChangeCircleIcon />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
}

export default PokemonDisplayContainer;
