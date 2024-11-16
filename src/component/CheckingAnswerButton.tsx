import { Button, Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface CheckingAnswerButtonProps {
  handleCheckAnswer: () => void;
}

function CheckingAnswerButton({
  handleCheckAnswer,
}: CheckingAnswerButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={handleCheckAnswer}
      sx={{
        display: "flex",
        backgroundColor: "#03A9F4",
        alignItems: "center",
        borderRadius: 40,
        width: 360,
        height: 56,
        // justifyContent: "center",
        // padding: "0 16px",
        // position: "relative",
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
        <Typography variant="caption">Check Answer</Typography>
        <Typography sx={{ marginTop: -0.8, fontWeight: "bold" }}>
          こたえあわせ
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
        <SendIcon />
      </Box>
    </Button>
  );
}

export default CheckingAnswerButton;
