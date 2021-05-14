import React from "react";
import Cookies from "universal-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart as faHeartSolid,
  faBookmark as faBookmarkSolid
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faBookmark as faBookmarkRegular
} from "@fortawesome/free-regular-svg-icons";

import Header from "./Header";
import Filters from "./Filters/Filters";
import Paginations from "./Paginations";
import MoviesList from "./Movies/Movies";
import { fetchApi } from "../api/api";

export const AppContext = React.createContext();
library.add(faHeartSolid, faBookmarkSolid, faHeartRegular, faBookmarkRegular);
const cookies = new Cookies();
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2010"
      },
      page: 1,
      total_pages: 1,
      selectedGenres: []
    };
  }

  componentDidMount() {
    const session_id = cookies.get("session_id");

    if (session_id) {
      fetchApi("GET", "account", { params: { session_id } }).then(data =>
        this.updateUser(data)
      );
      this.setState({ session_id });
    }
  }

  updateUser = user => {
    this.setState({ user });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({ session_id });
  };

  deleteUser = () => {
    cookies.remove("session_id");
    this.setState({ user: null });
  };

  render() {
    const { user, filters, page, total_pages, selectedGenres } = this.state;
    return (
      <AppContext.Provider
        value={{
          user,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          deleteUser: this.deleteUser
        }}
      >
        <div className="home-page">
          <Header user={user} />
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h3>Фильтры:</h3>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={this.resetFilter}
                    >
                      Cбросить фильтр
                    </button>
                    <Filters
                      page={page}
                      filters={filters}
                      selectedGenres={selectedGenres}
                      onChangeFilters={this.onChangeFilters}
                      onChangePage={this.onChangePage}
                      onChangeSelectedGenres={this.onChangeSelectedGenres}
                    />
                    <Paginations
                      page={page}
                      total_pages={total_pages}
                      onChangePage={this.onChangePage}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  user={user}
                  session_id={this.state.session_id}
                  filters={filters}
                  page={page}
                  selectedGenres={selectedGenres}
                  onChangePage={this.onChangePage}
                  onChangeTotalPage={this.onChangeTotalPage}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangeSelectedGenres = event => {
    const value = event.target.value;
    const checked = event.target.checked;
    this.setState(prevState => ({
      selectedGenres: checked
        ? [...prevState.selectedGenres, value]
        : prevState.selectedGenres.filter(
            selectedGenre => selectedGenre !== value
          )
    }));
  };

  onChangePage = page => {
    this.setState({
      page
    });
  };

  onChangeTotalPage = total_pages => {
    this.setState({
      total_pages
    });
  };

  resetFilter = () => {
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2010"
      }
    });
  };
}
