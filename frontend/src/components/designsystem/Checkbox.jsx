import React from "react";
import PropTypes from "prop-types";

const Checkbox = props => {
  const { value, id } = props;

  return (
    <div className="uk-margin">
      <label htmlFor={id}>
        <input id={id} className="uk-checkbox" type="checkbox" /> {value}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string
};

Checkbox.defaultProps = {
  value: "",
  id: ""
};

export default Checkbox;
