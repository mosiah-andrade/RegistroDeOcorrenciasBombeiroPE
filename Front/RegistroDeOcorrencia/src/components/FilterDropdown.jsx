import React from 'react';
import Styles from './FilterDropdown.module.css';


const FilterDropdown = ({ label, options, value, onChange, classe }) => {
  return (
    <div>
      <label htmlFor={label} className={`block text-sm font-medium text-gray-700 mb-1 `}>
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500$ ${Styles.FilterDropdown}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;