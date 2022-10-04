import React, { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);

  const {
    type,
    name,
    placeholder,
    errorMessage,
    label,
    required,
    onChange,
    pattern,
  } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="form-row">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        pattern={pattern}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        className="form-input"
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
