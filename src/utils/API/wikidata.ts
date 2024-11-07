console.log("Script is running...");
import SparqlClient from "sparql-http-client";

class Wikidata {
  private endpointUrl = "https://query.wikidata.org/sparql";
  private client = new SparqlClient({
    endpointUrl: this.endpointUrl,
  });
  private pokemons: { ja: string; en: string }[] = []; // ポケモン情報を格納する配列
  async fetchAllPokemonName(): Promise<{ ja: string; en: string }[]> {
    if (this.pokemons.length > 0) {
      console.log("Pokemons already fetched");
      return this.pokemons;
    }
    console.log("Starting SPARQL query...");
    const query = `
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX wikibase: <http://wikiba.se/ontology#>
    PREFIX bd: <http://www.bigdata.com/rdf#>

    SELECT DISTINCT ?pokemonLabel ?pokemonEnLabel WHERE {
      ?pokemon wdt:P31/wdt:P279* wd:Q3966183.

      FILTER EXISTS {
        ?pokemon rdfs:label ?pokemonLabel.
        FILTER(LANG(?pokemonLabel) = "ja")
      }

      ?pokemon rdfs:label ?pokemonEnLabel.
      FILTER(LANG(?pokemonEnLabel) = "en")

      SERVICE wikibase:label { bd:serviceParam wikibase:language "ja". }
    }
    ORDER BY ?pokemonLabel
  `;
    const stream = this.client.query.select(query);

    let hasResults = false;
    try {
      return new Promise((resolve, reject) => {
        stream.on("data", (row) => {
          console.log(
            "Data received:",
            row.pokemonLabel.value,
            row.pokemonEnLabel.value
          ); // データが受信されたことを確認
          this.pokemons.push({
            ja: row.pokemonLabel.value,
            en: row.pokemonEnLabel.value,
          }); // ポケモン情報を配列に追加
          hasResults = true;
        });

        stream.on("end", () => {
          if (!hasResults) {
            console.log("No data found or query returned empty results.");
          } else {
            console.log("Query completed successfully.");
          }
          resolve(this.pokemons);
        });

        stream.on("error", (error) => {
          console.error("Stream error:", error); // ストリームエラーの表示
          reject(error);
          console.log("error stream", stream);
        });
      });
    } catch (error) {
      console.error("Error fetching Pokemon names:", error);
      return [];
    }
  }

  async fetchRandomPokemon(): Promise<{ ja: string; en: string }> {
    const pokemons: { ja: string; en: string }[] =
      await this.fetchAllPokemonName();
    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
    console.log("Random Pokemon:", randomPokemon);
    return randomPokemon;
  }
}
export default new Wikidata();
