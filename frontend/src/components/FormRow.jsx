import React from 'react'

const FormRow = ({ type, name, labelTxt, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelTxt || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        placeholder={defaultValue || ''}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormRow
