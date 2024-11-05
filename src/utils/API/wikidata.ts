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
 
    SELECT DISTINCT ?pokemonLabel WHERE {
      ?pokemon wdt:P31/wdt:P279* wd:Q3966183.
      FILTER EXISTS {
        ?pokemon rdfs:label ?pokemonLabel.
        FILTER(LANG(?pokemonLabel) = "ja")
      }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "ja". }
    }
    ORDER BY ?pokemonLabel
  `;
 
  try {
    const stream = await client.query.select(query);
    let hasResults = false;
 
    stream.on('data', row => {
      console.log("Data received:", row.pokemonLabel.value); // データが受信されたことを確認
      hasResults = true;
    });
 
    stream.on('end', () => {
      if (!hasResults) {
        console.log("No data found or query returned empty results.");
      } else {
        console.log("Query completed successfully.");
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