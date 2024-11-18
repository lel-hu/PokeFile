import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
}

function InfoDialog({ open, onClose }: InfoDialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>このアプリについて / About this App</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          * ポケモンの名前やタイプは{" "}
          <a
            href="https://www.wikidata.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            WikiData
            <OpenInNewOutlinedIcon
              sx={{ fontSize: 16, verticalAlign: "middle" }}
            />
          </a>{" "}
          から取得しており、間違った情報が表示される場合があります。
        </Typography>
        <Typography variant="body1">
          * ポケモンの画像は{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PokeApi
            <OpenInNewOutlinedIcon
              sx={{ fontSize: 16, verticalAlign: "middle" }}
            />
          </a>{" "}
          から取得しています。一部のポケモンは画像が表示されません。
        </Typography>
        <Typography variant="body1">
          *
          ポケモンの名前が同じでも、フォルムの違いにより複数パターンのタイプが考えられるポケモンの場合、画像のポケモンのタイプと答えのタイプが一致しない場合があります。
          {"（例）アルセウス、ロトム、ウーラオスなど "}
        </Typography>
        <br />
        <Typography variant="body1">
          * The names and types of Pokémon are obtained from{" "}
          <a
            href="https://www.wikidata.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            WikiData
            <OpenInNewOutlinedIcon
              sx={{ fontSize: 16, verticalAlign: "middle" }}
            />
          </a>
          , and incorrect information may be displayed.
        </Typography>
        <Typography variant="body1">
          * Pokémon images are obtained from{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PokeApi
            <OpenInNewOutlinedIcon
              sx={{ fontSize: 16, verticalAlign: "middle" }}
            />
          </a>
          . Some Pokémon do not display images.
        </Typography>
        <Typography variant="body1">
          * In the case of Pokémon with multiple possible types due to
          differences in form, such as Arceus, Rotom, and Urshifu, the type of
          the Pokémon in the image and the type of the answer may not match.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
export default InfoDialog;
