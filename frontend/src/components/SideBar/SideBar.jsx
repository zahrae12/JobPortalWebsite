import React from 'react';
import Location from './Location';
import Salary from './Salary';
import Category from './Category';

const SideBar = ({ handleLocationChange ,handleSalaryChange, handleCategoryChange}) => {
  return (
    <div className='space-y-5 '>
      <h3 className='text-lg font-bold mb-2'>Filters</h3>
      <Location handleSearchChange={handleLocationChange} />
     <Salary handleSearchChange={handleSalaryChange}/>
     <Category handleSearchChange={handleCategoryChange} />
    </div>
  );
};

export default SideBar;
