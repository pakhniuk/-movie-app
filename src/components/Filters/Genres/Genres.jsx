import React from "react";
import PropTypes from "prop-types";

import GenresHOC from "./GenresHOC";

const Genres = ({ genres, selectedGenres, onChangeSelectedGenres }) => (
  <div>
    <div>Жанры:</div>
    {genres.map(genre => {
      const checked = selectedGenres.some(
        selectedGenre => selectedGenre === String(genre.id)
      );
      // includes
      return (
        <div className="form-check" key={genre.id}>
          <input
            type="checkbox"
            checked={checked}
            id={genre.id}
            className="form-check-input"
            name={genre.id}
            value={genre.id}
            onChange={onChangeSelectedGenres}
          />
          <label htmlFor={genre.id} className="form-check-label">
            {genre.name}
          </label>
        </div>
      );
    })}
  </div>
);

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  selectedGenres: PropTypes.array.isRequired,
  onChangeSelectedGenres: PropTypes.func.isRequired
};

Genres.defaultProps = {
  genres: [],
  selectedGenres: [],
  onChangeSelectedGenres: () => {}
};
export default GenresHOC(Genres);
