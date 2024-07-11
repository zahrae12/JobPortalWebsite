import React, { useState } from 'react';
import InputField from '../InputField';

const Salary = ({ handleSearchChange }) => {
  const [selectedSalary, setSelectedSalary] = useState(""); // State to keep track of selected salary

  const handleChange = (e) => {
    const newSalary = e.target.value; // Get the selected salary value
    setSelectedSalary(newSalary); // Update the selected salary state
    handleSearchChange(newSalary, 'salary'); // Pass the selected salary and field name 'salary' to handleSearchChange
  };

  return (
    <>
      <h4 className='text-lg font-medium mb-2'>Salary</h4>
      <div>
        <label className='sidebar-label-container'>
          <input type="radio" name="salary" value="" checked={selectedSalary === ""} onChange={handleChange} />
          <span className='checkmark'></span>Any
        </label>
        <InputField handleSearchChange={handleChange} value={30} title="<5000 dhs" name="salary" />
        <InputField handleSearchChange={handleChange} value={40} title="<7000 dhs" name="salary" />
        <InputField handleSearchChange={handleChange} value={50} title=">9000 dhs" name="salary" />
        {/* Add more radio buttons as needed */}
      </div>
    </>
  );
}

export default Salary;
