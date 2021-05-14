import * as React from "react";
import PropTypes from "prop-types";

import "./styles.css";

export default class Paginations extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
  };

  render() {
    const { page, total_pages, onChangePage } = this.props;
    return (
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-light"
          disabled={page === 1}
          onClick={onChangePage.bind(null, page - 1)}
        >
          Назад
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={onChangePage.bind(null, page + 1)}
        >
          Вперед
        </button>
        <span className="currentPages">
          {page} from {total_pages}
        </span>
      </div>
    );
  }
}
