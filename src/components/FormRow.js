import React, { useState } from "react";
const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  refCont,
  formErrors,
  state,
  setState,
}) => {
  const [focused, setFocused] = useState(false);
  // const [isEditorFocused, setIsEditorFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
    setState({ ...state, key: true });
  };

  // const handleBlur = (e) => {
  //   setIsEditorFocused(false);
  // };

  // const handleFocus = (e) => {
  //   const currentTarget = e.currentTarget;
  //   if (!currentTarget.contains(document.activeElement)) {
  //     setIsEditorFocused(true);
  //   }
  // };

  // console.log("NAMe", name);
  // console.log("formErrors input", formErrors);
  // console.log("Sttattttattata", state);
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        ref={refCont}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleFocus}
        // onBlur={handleBlur}
        // onFocus={handleFocus}
        focused={focused.toString()}
        className="form-input"
      />

      {name === "name" && (
        <span style={{ color: "red" }}>{state.key ? formErrors.name : ""}</span>
      )}
      {name === "email" && (
        <span style={{ color: "red" }}>
          {state.key ? formErrors.email : ""}
        </span>
      )}
      {name === "password" && (
        <span style={{ color: "red" }}>
          {state.key ? formErrors.password : ""}
        </span>
      )}
    </div>
  );
};

export default FormRow;
