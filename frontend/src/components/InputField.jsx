// InputField.jsx
import React from 'react';

const InputField = ({ handleSearchChange, value, title, name }) => {
  const handleChange = (e) => {
    handleSearchChange(e); // Invoke handleSearchChange with the event object
  };

  return (
    <label className='sidebar-label-container'>
      <input type="radio" name={name} value={value} onChange={handleChange} />
      <span className='checkmark'></span>{title}
    </label>
  );
};

export default InputField;
