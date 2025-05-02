import React from 'react';

const ContentCard = ({ content, onEdit, onDelete, onVideoPlay }) => {
  const handleCardClick = () => {
    if (content.type === 'video') {
      onVideoPlay(content.url);
    } else {
      window.open(content.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-transform hover:shadow-md hover:-translate-y-1">
      {/* Thumbnail Section */}
      <div 
        className="relative aspect-video bg-gray-100 cursor-pointer" 
        onClick={handleCardClick}
      >
        {content.category && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {content.category}
          </div>
        )}
        {content.thumbnail ? (
          <img 
            src={content.thumbnail} 
            alt={content.title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Thumbnail
          </div>
        )}

        {/* Duration Badge */}
        {content.type === 'video' && content.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {content.duration}
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded px-2 py-1">
          <span className="flex items-center text-xs font-medium">
            <span className="mr-1">
              {content.type === 'article' ? '📄' : '🎥'}
            </span>
            {content.type === 'article' ? 'Article' : 'Video'}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-opacity">
          <span className="text-white text-xl opacity-0 hover:opacity-100">🔗</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 
          className="font-medium text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-green-600" 
          onClick={handleCardClick}
        >
          {content.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {content.description}
        </p>

        {/* Date */}
        <div className="flex items-center text-xs text-gray-500">
          <span className="mr-1">📅</span>
          <span>{content.date ? new Date(content.date).toLocaleDateString() : 'No date'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t px-4 py-2 bg-gray-50 flex justify-end space-x-2">
        <button 
          onClick={() => onEdit(content)} 
          className="p-1 text-green-600 hover:text-green-800" 
          title="Edit"
        >
          ✏️
        </button>
        <button 
          onClick={() => onDelete(content._id)} 
          className="p-1 text-red-600 hover:text-red-800" 
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ContentCard;
