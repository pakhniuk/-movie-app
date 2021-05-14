import React from "react";
import { API_URL, API_KEY_3 } from "../../../api/api";

import Genres from "./Genres";
import queryString from "query-string";
import PropTypes from "prop-types";

export default class GenresContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      genres: []
    };
  }

  static propTypes = {
    onChangeSelectedGenres: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU"
    };
    const link = `${API_URL}/genre/movie/list?${queryString.stringify(
      queryStringParams
    )}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  }

  render() {
    const { genres, onChangeSelectedGenres, selectedGenres } = this.props;
    return (
      <Genres
        genres={genres}
        onChangeSelectedGenres={onChangeSelectedGenres}
        selectedGenres={selectedGenres}
      />
    );
  }
}
