import React from 'react';
import InputField from '../InputField';

const Category = ({ handleSearchChange }) => {
  const handleChange = (e) => {
    const selectedCategory = e.target.value; // Get the selected category value
    handleSearchChange(selectedCategory, 'category'); // Pass the selected category and field name 'category' to handleSearchChange
  };

  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Category</h4>
      <div>
        <label className='sidebar-label-container'>
          <input type="radio" name="category" value="" onChange={handleChange} />
          <span className='checkmark'></span>All
        </label>
        <InputField handleSearchChange={handleChange} value="Graphics & Design" title="Graphics & Design" name="category" />
        <InputField handleSearchChange={handleChange} value="Mobile App Development" title="Mobile App Development" name="category" />
        <InputField handleSearchChange={handleChange} value="Frontend Web Development" title="Frontend Web Development" name="category" />
        {/* Add more category options as needed */}
      </div>
    </div>
  );
};

export default Category;