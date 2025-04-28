import React, { useState, useEffect } from 'react';
import ContentCard from './components/ContentCard';
import ContentModal from './components/ContentModel';
import VideoPlayer from './components/VideoPlayer';

const ContentPage = () => {
  const [contents, setContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [videoPlayer, setVideoPlayer] = useState({ isOpen: false, url: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000';

  // Fetch data from database
  const fetchContents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/contents`,{
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      
      const data = await response.json();
      setContents(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch content:", err);
      setError(err.message);
      // No static fallback data
      setContents([]);
    } finally {
      setLoading(false);
    }
  };

  // Load content on initial render
  useEffect(() => {
    fetchContents();
  }, []);

  // Filter contents based on search term and active filter
  const filteredContents = contents.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || content.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Add new content to database
  const handleAddContent = async (contentData) => {
    try {
      const now = new Date();
      const newContent = {
        ...contentData,
        date: now.toISOString().split('T')[0],
      };
      console.log("Adding content:", newContent);
      const response = await fetch(`${API_URL}/admin/contents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContent),
      }); 

      if (!response.ok) {
        throw new Error(`Error adding content: ${response.status}`);
      }

      const createdContent = await response.json();
      
      // Update state with new content
      setContents((prevContents) => [...prevContents, createdContent]);
      setIsModalOpen(false);
      
      return createdContent;
    } catch (err) {
      console.error("Failed to add content:", err);
      alert(`Failed to add content: ${err.message}`);
      return null;
    }
  };

  // Update existing content in database
  const handleUpdateContent = async (id, contentData) => {
    try {
      const response = await fetch(`${API_URL}/admin/contents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentData),
      });

      if (!response.ok) {
        throw new Error(`Error updating content: ${response.status}`);
      }

      const updatedContent = await response.json();
      
      // Update state with modified content
      setContents((prevContents) =>
        prevContents.map((item) => (item.id === id ? updatedContent : item))
      );
      
      setIsModalOpen(false);
      setEditingContent(null);
      
      return updatedContent;
    } catch (err) {
      console.error("Failed to update content:", err);
      alert(`Failed to update content: ${err.message}`);
      return null;
    }
  };

  // Delete content from database
  const handleDeleteContent = async (id) => {
    try {
      const response = await fetch(`${API_URL}/admin/contents/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error deleting content: ${response.status}`);
      }

      // Remove deleted content from state
      setContents((prevContents) => prevContents.filter((item) => item.id !== id));
      
      return true;
    } catch (err) {
      console.error("Failed to delete content:", err);
      alert(`Failed to delete content: ${err.message}`);
      return false;
    }
  };

  // Handle save content (decides between adding and updating)
  const handleSaveContent = (contentData) => {
    if (editingContent) {
      return handleUpdateContent(editingContent.id, contentData);
    } else {
      return handleAddContent(contentData);
    }
  };

  const handleOpenAddModal = () => {
    setEditingContent(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (content) => {
    setEditingContent(content);
    setIsModalOpen(true);
  };

  const handleVideoPlay = (url) => {
    setVideoPlayer({ isOpen: true, url });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContent(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
        
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
            />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
            </select>
          </div>
          
          <button
            onClick={handleOpenAddModal}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full sm:w-auto justify-center"
          >
            Add Content
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={fetchContents} 
            className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) : filteredContents.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">No content found</div>
          <button
            onClick={handleOpenAddModal}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Your First Content
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteContent}
              onVideoPlay={handleVideoPlay}
            />
          ))}
        </div>
      )}

      <ContentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={editingContent}
        onSave={handleSaveContent}
      />

      <VideoPlayer
        isOpen={videoPlayer.isOpen}
        url={videoPlayer.url}
        onClose={() => setVideoPlayer({ isOpen: false, url: '' })}
      />
    </div>
  );
};

export default ContentPage;