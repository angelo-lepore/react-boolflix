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
        setMovies(combined); // aggiorno movies con i dati combinati
        console.log("Risultati ricerca:", combined);
      })
      .catch((err) => {
        alert("Si è verificato un errore nel caricamento, riprova più tardi");
        console.error(err);
      });
  }

  return (
    <>
      <header>
        <div className="container-fluid bg-light py-2 px-3">
          <div className="d-flex align-items-center justify-content-between">
            {/* Logo */}
            <img src="/img/boolflix.png" alt="Logo" height="40" />

            {/* Pulsante Home */}
            <button
              className="btn btn-outline-danger ms-3"
              onClick={() => (window.location.href = "/")}
              aria-label="Home"
            >
              <i className="bi bi-house fs-5"></i>
            </button>

            {/* Barra di ricerca */}
            <form
              onSubmit={handleSearch}
              className="d-flex ms-3 flex-grow-1"
              role="search"
            >
              <input
                className="form-control me-2 input-focus-red"
                type="search"
                placeholder="Nome film / serie TV..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* Pulsante di ricerca */}
              <button className="btn btn-danger" type="submit">
                Cerca
              </button>
            </form>
          </div>
        </div>
      </header>
      <main>
        <div className="container py-4">
          {movies === null ? (
            // Nessuna ricerca ancora fatta
            <p className="text-center text-muted">
              Cerca un film / serie TV per iniziare
            </p>
          ) : movies.length === 0 ? (
            // Ricerca fatta, ma nessun film trovato
            <p className="text-center text-danger">
              Nessun film / serie TV trovato.
            </p>
          ) : (
            // Film trovati: mostra le card
            <div className="row g-4">
              {movies.map((movie) => (
                <div
                  key={`${movie.media_type}-${movie.id}`}
                  className="col-12 col-md-4"
                >
                  <div className="card h-100 shadow-sm">
                    {/* Immagine */}
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="card-img-top"
                        alt={
                          movie.media_type === "tv" ? movie.name : movie.title
                        }
                      />
                    ) : (
                      <div
                        className="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center"
                        style={{ height: "600px" }}
                      >
                        <span>Immagine non disponibile</span>
                      </div>
                    )}
                    <div className="card-body">
                      <span className="badge bg-secondary mb-2">
                        {movie.media_type === "movie" ? (
                          <i className="bi bi-film"></i>
                        ) : (
                          <i className="bi bi-tv"></i>
                        )}
                      </span>
                      <h5 className="card-title">
                        {movie.media_type === "tv" ? movie.name : movie.title}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Titolo originale:{" "}
                        {movie.media_type === "tv"
                          ? movie.original_name
                          : movie.original_title}
                      </h6>
                      <p className="card-text">
                        <strong>Lingua:</strong> {movie.original_language}{" "}
                        {getFlagEmoji(movie.original_language)}
                        <br />
                        <strong>Voto:</strong> {renderStars(movie.vote_average)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
