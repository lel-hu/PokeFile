console.log("Script is running...");
import SparqlClient from "sparql-http-client";

class Wikidata {
  private endpointUrl = "https://query.wikidata.org/sparql";
  private client = new SparqlClient({
    endpointUrl: this.endpointUrl,
  });
  private pokemons: {
    ja: string;
    en: string;
    typeLabel1?: string;
    typeLabel2?: string;
  }[] = []; // ポケモン情報を格納する配列

  async fetchAllPokemonName(): Promise<
    { ja: string; en: string; typeLabel1?: string; typeLabel2?: string }[]
  > {
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

      SELECT DISTINCT ?pokemonLabel ?pokemonEnLabel ?typeLabel1 ?typeLabel2 WHERE {
        # ポケモンのインスタンス
        ?pokemon wdt:P31/wdt:P279* wd:Q3966183.

        # 日本語と英語のポケモン名を取得
        ?pokemon rdfs:label ?pokemonLabel.
        FILTER(LANG(?pokemonLabel) = "ja")
        
        ?pokemon rdfs:label ?pokemonEnLabel.
        FILTER(LANG(?pokemonEnLabel) = "en")
        
        # ファーストタイプを取得
        OPTIONAL {
          ?pokemon p:P31 ?typeStatement1.
          ?typeStatement1 ps:P31 ?type1;
                          pq:P518 wd:Q25931659.  # ファーストタイプ
          ?type1 rdfs:label ?typeLabel1.
          FILTER(LANG(?typeLabel1) = "ja")
        }
        
        # セカンドタイプを取得
        OPTIONAL {
          ?pokemon p:P31 ?typeStatement2.
          ?typeStatement2 ps:P31 ?type2;
                          pq:P518 wd:Q25931668.  # セカンドタイプ
          ?type2 rdfs:label ?typeLabel2.
          FILTER(LANG(?typeLabel2) = "ja")
        }

        SERVICE wikibase:label { bd:serviceParam wikibase:language "ja". }
      }
      ORDER BY ?pokemonLabel
    `;

    const stream = this.client.query.select(query);

    let hasResults = false;
    try {
      return new Promise((resolve, reject) => {
        stream.on("data", (row) => {
          console.log("Complete Data Row:", row); // row全体を表示
          console.log(
            "Data received:",
            row.pokemonLabel.value,
            row.pokemonEnLabel.value,
            row.typeLabel1 ? row.typeLabel1.value : "N/A", // ファーストタイプの表示（存在しない場合は"N/A"）
            row.typeLabel2 ? row.typeLabel2.value : "N/A" // セカンドタイプの表示（存在しない場合は"N/A"）
          );

          this.pokemons.push({
            ja: row.pokemonLabel.value,
            en: row.pokemonEnLabel.value,
            typeLabel1: row.typeLabel1 ? row.typeLabel1.value : undefined,
            typeLabel2: row.typeLabel2 ? row.typeLabel2.value : undefined,
          });
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

  async fetchRandomPokemon(): Promise<{
    ja: string;
    en: string;
    types: string[];
  }> {
    const pokemons = await this.fetchAllPokemonName();
    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];

    // 正しいタイプを追加
    const types = [randomPokemon.typeLabel1, randomPokemon.typeLabel2].filter(
      Boolean
    );
    console.log("Random Pokemon:", randomPokemon, "Types:", types);

    return {
      ja: randomPokemon.ja,
      en: randomPokemon.en,
      types: types as string[],
    };
  }
}

export default new Wikidata();
