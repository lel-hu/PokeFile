console.log("Script is running...");
import SparqlClient from 'sparql-http-client';
import fetch from 'isomorphic-fetch';

const endpointUrl = 'https://query.wikidata.org/sparql';
const client = new SparqlClient({ endpointUrl, fetch });

async function queryWikidata() {
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

  try {
    const stream = await client.query.select(query);
    const pokemons = []; // ポケモン情報を格納する配列
    let hasResults = false;

    stream.on('data', row => {
      console.log("Data received:", row.pokemonLabel.value, row.pokemonEnLabel.value); // データが受信されたことを確認
      pokemons.push({ ja: row.pokemonLabel.value, en: row.pokemonEnLabel.value }); // ポケモン情報を配列に追加
      hasResults = true;
    });

    stream.on('end', () => {
      if (!hasResults) {
        console.log("No data found or query returned empty results.");
      } else {
        console.log("Query completed successfully.");
        
        // ランダムにポケモンを選択
        const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
        console.log("Randomly selected Pokémon:", randomPokemon.ja, "(", randomPokemon.en, ")");
      }
    });

    stream.on('error', error => {
      console.error('Stream error:', error); // ストリームエラーの表示
    });
  } catch (error) {
    console.error('Error during query execution:', error); // クエリ実行エラーの表示
  }
}

queryWikidata();
