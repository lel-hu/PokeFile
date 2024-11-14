import { Box, Button, Typography } from "@mui/material";

interface Type {
  jpn: string;
  eng: string;
  color: string;
}

interface TypeButtonProps {
  selectedTypes: string[];
  type: Type;
  handleButtonClick: (type: string) => void;
}

// ポケモンのタイプのボタン
function TypeButton({
  selectedTypes,
  type,
  handleButtonClick,
}: TypeButtonProps) {
  return (
    <Button
      variant={selectedTypes.includes(type.jpn) ? "outlined" : "contained"}
      key={type.jpn}
      sx={{
        m: "4px",
        flex: "1 1 calc(33.333% - 16px)",
        bgcolor: selectedTypes.includes(type.jpn)
          ? "#FFFFFF"
          : `#${type.color}`,
        color: selectedTypes.includes(type.jpn) ? `#${type.color}` : "#FFFFFF",
        border: `1px solid #${type.color}`,
        width: "auto",
        height: 56,
        maxWidth: 140,
        borderRadius: "24px 8px 24px 8px",
      }}
      onClick={() => handleButtonClick(type.jpn)}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption"> {type.eng}</Typography>
        <Typography sx={{ marginTop: -0.6, fontSize: "0.85rem" }}>
          {type.jpn}
        </Typography>
      </Box>
    </Button>
  );
}

export default TypeButton;
