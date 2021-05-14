import React from "react";
import PropTypes from "prop-types";

export default class PrimaryReleaseYear extends React.PureComponent {
  static propTypes = {
    primary_release_year: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  static defaultProps = {
    options: [
      {
        label: "2010",
        value: "2010"
      },
      {
        label: "2011",
        value: "2011"
      },
      {
        label: "2012",
        value: "2012"
      },
      {
        label: "2013",
        value: "2013"
      }
    ]
  };

  render() {
    const { primary_release_year, onChangeFilters, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="primary_release_year">Год:</label>
        <select
          id="primary_release_year"
          className="form-control"
          name="primary_release_year"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
