import React from "react";
import PropTypes from "prop-types";

import MoviesHOC from "./MoviesHOC";
import MovieItem from "./MovieItem";

const Movies = ({
  movies,
  toggleIsFavorite,
  toggleIsWatchList,
  account_id,
  session_id
}) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem
            item={movie}
            toggleIsFavorite={() =>
              toggleIsFavorite(
                account_id,
                session_id,
                movie.id,
                !movie.isFavorite
              )
            }
            toggleIsWatchList={() =>
              toggleIsWatchList(
                account_id,
                session_id,
                movie.id,
                !movie.isWatchList
              )
            }
          />
        </div>
      );
    })}
  </div>
);

Movies.propTypes = {
  movies: PropTypes.array.isRequired
};

Movies.defaultProps = {
  movies: []
};

export default MoviesHOC(Movies);
