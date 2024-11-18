import { Paper, Typography, Box, Divider } from "@mui/material";
import BackgroundImage from "../assets/poke_bg.jpg";
interface PokemonDisplayContainerProps {
  pokemon: {
    ja: string;
    en: string;
    image: string;
  };
}

function PokemonDisplayContainer({ pokemon }: PokemonDisplayContainerProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 4,
        width: "100%",
        maxWidth: 400,
      }}
    >
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
            sx={{
              width: 110,
              height: 110,
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontWeight: "bold",
                color: "#808080",
              }}
            >
              No Image
            </Typography>
          </Box>
        )}
      </Paper>
      <Box sx={{ width: 16 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "start",
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontStyle: "italic", fontSize: "1rem", fontWeight: "bold" }}
        >
          {pokemon.en}
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <Typography
          sx={{
            fontStyle: "italic",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {pokemon.ja}
        </Typography>
      </Box>
    </Paper>
  );
}

export default PokemonDisplayContainer;
