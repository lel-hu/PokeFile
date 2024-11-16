// PokeAPIを使ってポケモン画像を取得する関数
export const fetchPokemonImage = async (
  pokemonName: string
): Promise<string> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error("ポケモンのデータ取得に失敗しました");
    }
    const data = await response.json();
    return data.sprites.other["official-artwork"].front_default;
  } catch (error) {
    console.error("Error fetching image from PokeAPI:", error);
    return "";
  }
};
