import React from 'react';
import { Icons } from '../../../constants/icons.jsx';

const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
    >
      <div className="mr-2">
        <Icons.Plus />
      </div>
      Add Instrument
    </button>
  );
};

export default AddButton;