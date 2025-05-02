import React from 'react';
import { SchemeCard } from './SchemeCard';
import { CalendarIcon, PlusIcon } from '../../../constants/icons';

export const SchemesList = ({ 
  schemes, 
  isLoading, 
  error, 
  onRetry, 
  onEdit, 
  onDelete, 
  onAdd 
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
            <div className="mt-2">
              <button 
                onClick={onRetry}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (schemes.length === 0) {
    return (
      <div className="bg-white py-12 px-4 rounded-lg shadow text-center">
        <div className="flex justify-center mb-3">
          <CalendarIcon size={48} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">No schemes found</h3>
        <p className="text-gray-500 mb-4">
          Start by adding government schemes for farmers.
        </p>
        <button
          onClick={onAdd}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <PlusIcon size={16} className="mr-2" />
          Add New Scheme
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {schemes.map((scheme) => (
        <SchemeCard 
          key={scheme._id} 
          scheme={scheme} 
          onEdit={() => onEdit(scheme)}
          onDelete={() => onDelete(scheme._id)}
        />
      ))}
    </div>
  );
};