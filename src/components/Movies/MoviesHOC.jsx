import React from "react";
import isEqual from "lodash/isEqual";

import { fetchApi } from "../../api/api";

export default Component =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        movies: []
      };
    }

    getMovies = (filters, page, selectedGenres) => {
      const { sort_by, primary_release_year } = filters;
      const genres = selectedGenres
        .map(selectedGenre => `&with_genres=${selectedGenre}`)
        .join("");
      console.log(genres);

      fetchApi("GET", "discover/movie", {
        params: {
          language: "ru-RU",
          sort_by,
          page,
          primary_release_year
        }
      }).then(data => {
        const movies = {};
        data.results.forEach(movie => {
          movie.isFavorite = false;
          movie.isWatchList = false;
          movies[movie.id] = movie;
        });
        this.props.onChangePage(data.page);
        this.props.onChangeTotalPage(data.total_pages);
        this.setState({
          movies
        });
      });
    };

    getFavoriteMovies = (account_id, session_id, filters, page) => {
      const { sort_by, primary_release_year } = filters;
      fetchApi("GET", `account/${account_id}/favorite/movies`, {
        params: {
          session_id,
          language: "ru-RU",
          sort_by,
          page,
          primary_release_year
        }
      }).then(data => {
        const { movies } = this.state;
        data.results.forEach(({ id }) => {
          if (movies[id]) movies[id].isFavorite = true;
        });
        this.setState({ movies });
      });
    };

    getWatchListMovies = (account_id, session_id, filters, page) => {
      const { sort_by, primary_release_year } = filters;
      fetchApi("GET", `account/${account_id}/watchlist/movies`, {
        params: {
          session_id,
          language: "ru-RU",
          sort_by,
          page,
          primary_release_year
        }
      }).then(data => {
        const { movies } = this.state;
        data.results.forEach(({ id }) => {
          if (movies[id]) movies[id].isWatchList = true;
        });
        this.setState({ movies });
      });
    };

    toggleIsFavorite = (account_id, session_id, media_id, favorite) => {
      fetchApi("POST", `account/${account_id}/favorite`, {
        params: {
          session_id
        },
        body: {
          media_type: "movie",
          media_id,
          favorite
        }
      }).then(() => {
        const { movies } = this.state;
        movies[media_id].isFavorite = favorite;
        this.setState({ movies });
      });
    };

    toggleIsWatchList = (account_id, session_id, media_id, watchlist) => {
      fetchApi("POST", `account/${account_id}/watchlist`, {
        params: {
          session_id
        },
        body: {
          media_type: "movie",
          media_id,
          watchlist
        }
      }).then(() => {
        const { movies } = this.state;
        movies[media_id].isWatchList = watchlist;
        this.setState({ movies });
      });
    };

    async componentDidMount() {
      this.getMovies(
        this.props.filters,
        this.props.page,
        this.props.selectedGenres
      );
    }

    componentDidUpdate(prevProps) {
      const { filters, selectedGenres, page, user, session_id } = this.props;
      if (
        !isEqual(prevProps.filters, filters) ||
        !isEqual(prevProps.selectedGenres, selectedGenres)
      ) {
        this.props.onChangePage(1);
        this.getMovies(filters, 1, selectedGenres);
      }

      if (page !== prevProps.page) {
        this.getMovies(filters, page, selectedGenres);
      }

      if (!isEqual(prevProps.user, user)) {
        this.getFavoriteMovies(
          user.id,
          session_id,
          filters,
          page,
          selectedGenres
        );

        this.getWatchListMovies(
          user.id,
          session_id,
          filters,
          page,
          selectedGenres
        );
      }
    }

    render() {
      const { movies } = this.state;
      return (
        <Component
          {...this.props}
          movies={Object.values(movies)}
          toggleIsFavorite={this.toggleIsFavorite}
          toggleIsWatchList={this.toggleIsWatchList}
        />
      );
    }
  };
