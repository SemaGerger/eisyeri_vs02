import React from "react";

const CheckboxInput = ({ label, name, checked, onChange, required }) => (
  <div className="flex items-center mb-4">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      required={required}
      className="mr-2"
    />
    <label>{label}</label>
  </div>
);

export default CheckboxInput;
