import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Genres from "./Genres/Genres";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, primary_release_year },
      selectedGenres,
      onChangeFilters,
      onChangeSelectedGenres
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <PrimaryReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <Genres
          onChangeSelectedGenres={onChangeSelectedGenres}
          selectedGenres={selectedGenres}
        />
      </form>
    );
  }
}
