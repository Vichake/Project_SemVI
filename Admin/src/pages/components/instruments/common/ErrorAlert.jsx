import React from 'react';

const ErrorAlert = ({ error, retryAction }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {error}</span>
      <button 
        onClick={retryAction}
        className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorAlert;