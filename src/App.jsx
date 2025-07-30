// Import di Bootstrap (CSS, JS e icone)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import css
import "./index.css";

// Import hook useState da React
import { useState } from "react";

// Import funzione per mostrare bandiera lingua e stelle
import getFlagEmoji from "./components/getFlagEmoji";
import renderStars from "./components/renderStars";

// Import componenti
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";

// Componente principale dell'applicazione
function App() {
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;

  function handleSearch(e) {
    e.preventDefault();
    const ApiUrlMovie = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=it-IT&query=${search}`;
    const ApiUrlTV = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=it-IT&query=${search}`;

    Promise.all([
      fetch(ApiUrlMovie).then((res) => res.json()),
      fetch(ApiUrlTV).then((res) => res.json()),
    ])
      .then(([movieData, tvData]) => {
        const combined = [
          ...(movieData.results ?? []).map((item) => ({
            ...item,
            media_type: "movie",
          })),
          ...(tvData.results ?? []).map((item) => ({
            ...item,
            media_type: "tv",
          })),
        ];
        setMovies(combined);
        console.log("Risultati ricerca:", combined);
      })
      .catch((err) => {
        alert("Si è verificato un errore nel caricamento, riprova più tardi");
        console.error(err);
      });
  }

  return (
    <>
      <AppHeader
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <AppMain
        movies={movies}
        getFlagEmoji={getFlagEmoji}
        renderStars={renderStars}
      />
    </>
  );
}

export default App;
