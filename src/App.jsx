// Import di Bootstrap (CSS, JS e icone)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import css
import "./index.css";

// Import hook useState da React
import { useState } from "react";

// Import funzione per mostrare bandiera lingua
import getFlagEmoji from "./components/getFlagEmoji";

// Componente principale dell'applicazione
function App() {
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;

  function handleSearch(e) {
    e.preventDefault();
    const ApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=it-IT&query=${search}`;

    fetch(ApiUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => {
        alert("Si è verificato un errore nel caricamento, riprova più tardi");
      });
  }

  return (
    <>
      <header>
        <div className="container-fluid bg-light py-2 px-3">
          <div className="d-flex align-items-center justify-content-between">
            {/* Logo */}
            <img src="/img/boolflix.png" alt="Logo" height="40" />

            {/* Barra di ricerca */}
            <form
              onSubmit={handleSearch}
              className="d-flex ms-3 flex-grow-1"
              role="search"
            >
              <input
                className="form-control me-2 input-focus-red"
                type="search"
                placeholder="Nome film..."
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
            <p className="text-center text-muted">Cerca un film per iniziare</p>
          ) : movies.length === 0 ? (
            // Ricerca fatta, ma nessun film trovato
            <p className="text-center text-danger">Nessun film trovato.</p>
          ) : (
            // Film trovati: mostra le card
            <div className="row g-4">
              {movies.map((movie) => (
                <div key={movie.id} className="col-12 col-md-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Titolo originale: {movie.original_title}
                      </h6>
                      <p className="card-text">
                        <strong>Lingua:</strong> {movie.original_language}{" "}
                        {getFlagEmoji(movie.original_language)}
                        <br />
                        <strong>Voto:</strong> {movie.vote_average}
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
