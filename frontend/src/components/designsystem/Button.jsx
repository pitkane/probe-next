/* eslint-disable react/button-has-type */

import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const { type, value, primary, secondary, danger, onClick } = props;

  const className = ["uk-button", "uk-button-large", "uk-width-1-1"];

  if (primary) {
    className.push("uk-button-primary");
  }
  if (secondary) {
    className.push("uk-button-secondary");
  }
  if (danger) {
    className.push("uk-button-danger");
  }

  return (
    <div className="uk-margin">
      <button type={type} className={className.join(" ")} onClick={onClick}>
        {value}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  type: "button",
  primary: false,
  secondary: false,
  danger: false
};

export default Button;
