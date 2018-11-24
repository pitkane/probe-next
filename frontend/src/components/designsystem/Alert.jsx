import React from "react";
import PropTypes from "prop-types";

const Checkbox = props => {
  const { text } = props;

  if (!text) return null;

  return <div className="uk-alert uk-alert-danger">{text}</div>;
};

Checkbox.propTypes = {
  text: PropTypes.string
};

Checkbox.defaultProps = {
  text: null
};

export default Checkbox;
