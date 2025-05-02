import React from 'react';
import { Icons } from '../../../constants/icons.jsx';
import { STATUS_COLORS } from '../../../constants/styles';

// Memoized table row component to prevent unnecessary re-renders
const InstrumentRow = React.memo(({ instrument, onEdit, onDelete }) => {
  // Format the date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{instrument.instrumentName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{instrument.instrumentCategory}</td>
      <td className='px-6 py-4 whitespace-nowrap'>₹{instrument.rentPerHour}</td>
      {/* <td className='px-6 py-4 whitespace-nowrap'>{instrument.quantity}</td> */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs rounded-full ${STATUS_COLORS[instrument.instrumentStatus]}`}>
          {instrument.instrumentStatus}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Icons.MapPin />
          <span className="ml-1">{instrument.location}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div>{instrument.farmer}</div>
          <div className="text-xs text-gray-500">{instrument.contactNumber}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{formatDate(instrument.lastServiceDate)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => onEdit(instrument)}
          className="text-blue-600 hover:text-blue-900"
        >
          <Icons.Edit />
        </button>
        <button
          onClick={() => onDelete(instrument._id)}
          className="text-red-600 hover:text-red-900 ml-4"
        >
          <Icons.Trash2 />
        </button>
      </td>
    </tr>
  );
});

export default InstrumentRow;