// 次のポケモンを取得する関数
import { fetchPokemonImage } from "./fetchPokemonImage";
import Wikidata from "./API/wikidata";

export const handleNextPokemon = async (
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | null>>,
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>,
  setPokemon: React.Dispatch<
    React.SetStateAction<{
      ja: string;
      en: string;
      types: string[];
      image: string;
    }>
  >
) => {
  setIsCorrect(null); // 正誤結果をリセット
  setSelectedTypes([]); // 選択中のタイプをリセット
  try {
    const result = await Wikidata.fetchRandomPokemon();
    const imageUrl = await fetchPokemonImage(result.en); // 画像URLを取得
    setPokemon({ ...result, image: imageUrl });
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
  }
};
