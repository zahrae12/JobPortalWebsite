// Location.jsx
import React from 'react';
import InputField from '../InputField';

const Location = ({ handleSearchChange }) => {
  const handleChange = (e) => {
    const selectedLocation = e.target.value; // Get the selected location value
    handleSearchChange(selectedLocation, 'location'); // Pass the selected location and field name 'location' to handleSearchChange
  };

  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Location</h4>
      <div>
        <label className='sidebar-label-container'>
          <input type="radio" name="test" value="" onChange={handleChange} />
          <span className='checkmark'></span>All
        </label>
        <InputField handleSearchChange={handleChange} value="tetouan" title="Tetouan" name="test" />
        <InputField handleSearchChange={handleChange} value="tangier" title="Tangier" name="test" />
        <InputField handleSearchChange={handleChange} value="Rabat" title="Rabat" name="test" />
        <InputField handleSearchChange={handleChange} value="Casa" title="Casablanca" name="test" />
      </div>
    </div>
  );
};

export default Location;
