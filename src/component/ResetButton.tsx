import { Button } from "@mui/material";

interface ResetButtonProps {
  setSelectedTypes: (types: string[]) => void;
}

function ResetButton({ setSelectedTypes }: ResetButtonProps) {
  return (
    <Button
      variant="outlined"
      onClick={() => setSelectedTypes([])}
      sx={{
        borderRadius: 40,
        color: "#FF0000",
        border: `1px solid #FF0000`,
      }}
    >
      リセット
    </Button>
  );
}
export default ResetButton;
