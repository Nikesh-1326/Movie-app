import React, { useState } from "react";
import "./App.css";
import moviesData from "./movie.json";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState(moviesData);

  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Movies per page
  const moviesPerPage = 8;

  // Search movies
  const searchMovies = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      const filteredMovies = moviesData.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );

      if (filteredMovies.length === 0) {
        setMovies([]);
        setError("Movie not found.");
      } else {
        setMovies(filteredMovies);
      }

      setPage(1);
      setLoading(false);
    }, 500);
  };

  // Pagination
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const startIndex = (page - 1) * moviesPerPage;

  const currentMovies = movies.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  // Next page
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Previous page
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="app">

      {/* Header */}

      <header className="header">

        <h1>🎬 Movie Search App</h1>

        <p>Search your favorite movies</p>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search movie by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchMovies();
              }
            }}
          />

          <button onClick={searchMovies}>
            Search
          </button>

        </div>

      </header>


      {/* Main */}

      <main className="container">

        {/* Loading */}

        {loading && (
          <div className="loader">

            <div className="spinner"></div>

            <p>Searching movies...</p>

          </div>
        )}


        {/* Error */}

        {error && !loading && (
          <div className="error">
            ❌ {error}
          </div>
        )}


        {/* Movie Grid */}

        {!loading && movies.length > 0 && (

          <div className="movie-grid">

            {currentMovies.map((movie) => (

              <div
                className="movie-card"
                key={movie.id}
              >

                {/* Poster */}

                <div className="poster-container">

                  <img
                    src={movie.poster}
                    alt={movie.title}
                  />

                </div>


                {/* Movie Information */}

                <div className="movie-info">

                  <h2>
                    {movie.title}
                  </h2>

                  <p>
                    <strong>Year:</strong>{" "}
                    {movie.year}
                  </p>

                  <p>
                    <strong>Rating:</strong>{" "}
                    ⭐ {movie.rating}
                  </p>

                  <p>
                    <strong>Genre:</strong>{" "}
                    {movie.genre}
                  </p>


                  {/* Details Button */}

                  <button
                    className="details-btn"
                    onClick={() =>
                      setSelectedMovie(movie)
                    }
                  >
                    View Details
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}


        {/* Welcome Message */}

        {!loading &&
          movies.length === 0 &&
          !error && (

            <div className="welcome">

              <h2>
                Find Your Favorite Movies 🍿
              </h2>

              <p>
                Search for a movie to get started.
              </p>

            </div>

          )}


        {/* Pagination */}

        {!loading &&
          movies.length > 0 && (

            <div className="pagination">

              <button
                disabled={page === 1}
                onClick={previousPage}
              >
                ⬅ Previous
              </button>


              <span>
                Page {page} of {totalPages}
              </span>


              <button
                disabled={page === totalPages}
                onClick={nextPage}
              >
                Next ➡
              </button>

            </div>

          )}

      </main>


      {/* Movie Details Modal */}

      {selectedMovie && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedMovie(null)
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Close Button */}

            <button
              className="close-btn"
              onClick={() =>
                setSelectedMovie(null)
              }
            >
              ✕
            </button>


            <div className="modal-content">

              {/* Poster */}

              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
              />


              {/* Details */}

              <div className="details">

                <h2>
                  {selectedMovie.title}
                </h2>

                <p>
                  <strong>Year:</strong>{" "}
                  {selectedMovie.year}
                </p>

                <p>
                  <strong>Rating:</strong>{" "}
                  ⭐ {selectedMovie.rating}
                </p>

                <p>
                  <strong>Genre:</strong>{" "}
                  {selectedMovie.genre}
                </p>

                <p>
                  <strong>Description:</strong>
                </p>

                <p>
                  {selectedMovie.description}
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;