import React from "react";
import PropTypes from "prop-types";

import { fetchApi } from "../../../api/api";

export default Component =>
  class GenresHOC extends React.PureComponent {
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
      fetchApi("GET", "genre/movie/list", {
        params: {
          language: "ru-RU"
        }
      }).then(data => {
        this.setState({
          genres: data.genres
        });
      });
    }

    render() {
      return <Component {...this.props} genres={this.state.genres} />;
    }
  };
