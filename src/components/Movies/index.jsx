import React, { Component } from "react";
import Movies from "./Movies";
import { API_URL, API_KEY_3 } from "../../api/api";
import isEqual from "lodash/isEqual";
import queryString from "query-string";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page, selectedGenres) => {
    const { sort_by, primary_release_year } = filters;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by,
      page,
      primary_release_year
    };
    const genres = selectedGenres
      .map(selectedGenre => `&with_genres=${selectedGenre}`)
      .join("");
    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}${genres}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.onChangePage(data.page);
        this.props.onChangeTotalPage(data.total_pages);
        this.setState({
          movies: data.results
        });
      });
  };

  componentDidMount() {
    this.getMovies(
      this.props.filters,
      this.props.page,
      this.props.selectedGenres
    );
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps.filters, this.props.filters) ||
      !isEqual(prevProps.selectedGenres, this.props.selectedGenres)
    ) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1, this.props.selectedGenres);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(
        this.props.filters,
        this.props.page,
        this.props.selectedGenres
      );
    }
  }

  render() {
    const { movies } = this.state;
    return <Movies movies={movies} />;
  }
}
