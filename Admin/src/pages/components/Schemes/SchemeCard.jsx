import React, { useState } from 'react';
import { 
  TagIcon, 
  MapPinIcon, 
  CalendarIcon, 
  DownloadIcon, 
  ExternalLinkIcon,
  EditIcon,
  TrashIcon
} from '../../../constants/icons';

export const SchemeCard = ({ scheme, onEdit, onDelete }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullEligibility, setShowFullEligibility] = useState(false);

  // Status colors for badges
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    closing: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-red-100 text-red-800',
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString();
  };

  // Truncates text if it exceeds a certain length
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength || showFullDescription) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 flex flex-col">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{scheme.schemeName}</h3>
          <div className="flex space-x-2">
            <button 
              className="text-green-600 hover:text-green-800"
              onClick={onEdit}
              title="Edit"
            >
              <EditIcon />
            </button>
            <button 
              className="text-red-600 hover:text-red-800"
              onClick={onDelete}
              title="Delete"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
        
        {/* Tags Section */}
        <div className="flex items-center mt-2 flex-wrap gap-2">
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[scheme.status]}`}>
            {scheme.status === 'active' ? 'Active' : 
            scheme.status === 'closing' ? 'Closing Soon' : 'Closed'}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs leading-5 font-semibold rounded-full flex items-center">
            <TagIcon size={12} className="mr-1" />
            {scheme.schemeType.charAt(0).toUpperCase() + scheme.schemeType.slice(1)}
          </span>
          
          {/* Display state name if it's a state-level scheme */}
          {scheme.schemeType === 'state' && scheme.stateName && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs leading-5 font-semibold rounded-full flex items-center">
              <MapPinIcon size={12} className="mr-1" />
              {scheme.stateName}
            </span>
          )}
          
          {/* Duration Tag */}
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs leading-5 font-semibold rounded-full flex items-center">
            <CalendarIcon size={12} className="mr-1" />
            {formatDate(scheme.startDate)}
            {scheme.endDate ? ` - ${formatDate(scheme.endDate)}` : ' (Ongoing)'}
          </span>
        </div>
      </div>
      
      {/* Body Section */}
      <div className="p-4">
        {/* Description Section with expand/collapse functionality */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            {scheme.schemeDescription && scheme.schemeDescription.length > 200 && (
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {showFullDescription ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {showFullDescription 
              ? scheme.schemeDescription 
              : truncateText(scheme.schemeDescription, 200)}
          </p>
        </div>
        
        {/* Eligibility Section with expand/collapse functionality */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-medium text-gray-500">Eligibility</h4>
            {scheme.schemeEligibility && scheme.schemeEligibility.length > 150 && (
              <button 
                onClick={() => setShowFullEligibility(!showFullEligibility)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {showFullEligibility ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {showFullEligibility 
              ? scheme.schemeEligibility 
              : (scheme.schemeEligibility && scheme.schemeEligibility.length > 150 
                  ? scheme.schemeEligibility.slice(0, 150) + '...' 
                  : scheme.schemeEligibility)}
          </p>
        </div>
      </div>
      
      {/* Footer Section with Links */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex flex-wrap gap-3">
          {scheme.guidelinesUrl && (
            <a 
              href={scheme.guidelinesUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <DownloadIcon size={14} className="mr-1" />
              Guidelines
            </a>
          )}
          
          {scheme.officialWebsite && (
            <a 
              href={scheme.officialWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLinkIcon size={14} className="mr-1" />
              Official Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};