import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class MovieItem extends React.Component {
  render() {
    const { item, toggleIsFavorite, toggleIsWatchList } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>

          <button onClick={toggleIsFavorite} className="btn">
            {item.isFavorite ? (
              <FontAwesomeIcon icon="heart" />
            ) : (
              <FontAwesomeIcon icon={["far", "heart"]} />
            )}
          </button>
          <button onClick={toggleIsWatchList} className="btn">
            {item.isWatchList ? (
              <FontAwesomeIcon icon="bookmark" />
            ) : (
              <FontAwesomeIcon icon={["far", "bookmark"]} />
            )}
          </button>
        </div>
      </div>
    );
  }
}
