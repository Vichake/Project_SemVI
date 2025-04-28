import React from 'react';

const VideoPlayer = ({ url, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Extract video ID from various YouTube URL formats
  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeID(url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl mx-4 aspect-video">
        <iframe 
          src={embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;