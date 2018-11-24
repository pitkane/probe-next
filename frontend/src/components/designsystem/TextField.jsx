import React from "react";
import PropTypes from "prop-types";

const TextField = props => {
  const { required, name, placeholder, type, icon, onChange } = props;

  return (
    <div className="uk-margin">
      <div className="uk-inline uk-width-1-1">
        <span
          className="uk-form-icon uk-form-icon-flip"
          data-uk-icon={icon ? `icon: ${icon}` : ""}
        />
        <input
          onChange={onChange}
          name={name}
          className="uk-input uk-form-large"
          required={required}
          placeholder={placeholder}
          type={type}
        />
      </div>
    </div>
  );
};

TextField.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextField.defaultProps = {
  required: false,
  name: "",
  placeholder: "",
  type: "",
  icon: ""
};

export default TextField;
