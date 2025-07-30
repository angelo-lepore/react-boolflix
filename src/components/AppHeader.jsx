export default function AppHeader({ search, setSearch, handleSearch }) {
  return (
    <>
      <header>
        <div className="container-fluid bg-light py-2 px-3 bg-dark">
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
    </>
  );
}
