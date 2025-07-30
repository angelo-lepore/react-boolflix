export default function AppMain({ movies, getFlagEmoji, renderStars }) {
  return (
    <>
      <main className="bg-dark">
        <div className="container py-4">
          {movies === null ? (
            // Nessuna ricerca ancora fatta
            <p className="text-center text-white">
              Cerca un film / serie TV per iniziare
            </p>
          ) : movies.length === 0 ? (
            // Ricerca fatta, ma nessun film trovato
            <p className="text-center text-white">
              Nessun film / serie TV trovato.
            </p>
          ) : (
            // Film trovati: mostra le card
            <div className="row g-4 ">
              {movies.map((movie) => (
                <div
                  key={`${movie.media_type}-${movie.id}`}
                  className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                >
                  <div className="card h-100 shadow-sm card-content rounded-3">
                    {/* Immagine */}
                    <div className="card-image">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                          className="card-img-top rounded-3"
                          style={{ height: "600px" }}
                          alt={
                            movie.media_type === "tv" ? movie.name : movie.title
                          }
                        />
                      ) : (
                        <div
                          className="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center rounded-3"
                          style={{
                            minHeight: "200px",
                            height: "621px",
                            maxHeight: "600px",
                            alignItems: "center",
                          }}
                        >
                          <span>Immagine non disponibile</span>
                        </div>
                      )}
                    </div>
                    {/* Dettagli */}
                    <div
                      className="card-body card-info"
                      style={{ height: "600px" }}
                    >
                      <span className="badge bg-danger mb-2">
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
                      <p className="card-text truncate-overview">
                        <strong>Trama:</strong> {movie.overview}
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
