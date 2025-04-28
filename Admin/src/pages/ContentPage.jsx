import React, { useState } from 'react';
import { Search, Upload, FileText, Video, Calendar, ThumbsUp, MessageSquare, Edit, Trash2, Plus } from 'lucide-react';

// Mock content data
const MOCK_CONTENT = [
  {
    id: 1,
    title: 'Modern Irrigation Techniques for Water Conservation',
    type: 'article',
    description: 'Learn about the latest irrigation methods that can help farmers save water while improving crop yields.',
    thumbnail: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-05-10',
    likes: 128,
    comments: 24,
  },
  {
    id: 2,
    title: 'Organic Pest Control for Sustainable Farming',
    type: 'video',
    description: 'This comprehensive guide shows how to manage pests using natural methods without harmful chemicals.',
    thumbnail: 'https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '18:42',
    date: '2025-05-05',
    likes: 96,
    comments: 16,
  },
  {
    id: 3,
    title: 'Government Subsidy Programs for Small-Scale Farmers',
    type: 'article',
    description: 'A detailed overview of all available government schemes and subsidies for small and marginal farmers.',
    thumbnail: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-04-28',
    likes: 215,
    comments: 42,
  },
  {
    id: 4,
    title: 'Soil Health Management Practices',
    type: 'video',
    description: 'Essential techniques for testing and improving soil quality to maximize fertility and crop production.',
    thumbnail: 'https://images.pexels.com/photos/5049398/pexels-photo-5049398.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '24:15',
    date: '2025-04-15',
    likes: 154,
    comments: 33,
  },
];

const ContentModal = ({ isOpen, onClose, content = null, onSave }) => {
  const [formData, setFormData] = useState(
    content || {
      title: '',
      type: 'article',
      description: '',
      thumbnail: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const newFormData = {
      ...formData,
      date: now.toISOString().split('T')[0],
      likes: content ? content.likes : 0,
      comments: content ? content.comments : 0,
    };
    
    if (formData.type === 'video' && !formData.duration) {
      newFormData.duration = '00:00';
    }
    
    onSave(newFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg w-full max-w-2xl mx-4 p-6">
        <h2 className="text-xl font-semibold mb-4">
          {content ? 'Edit Content' : 'Add New Content'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="article">Article</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail URL
              </label>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {formData.type === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (MM:SS)
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration || ''}
                  onChange={handleChange}
                  placeholder="10:30"
                  pattern="[0-9]+:[0-5][0-9]"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            )}

            {formData.type === 'article' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Article Content
                </label>
                <textarea
                  name="content"
                  value={formData.content || ''}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  In a real application, this would be a rich text editor.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ContentCard = ({ content, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-transform hover:shadow-md hover:-translate-y-1">
      <div className="relative aspect-video bg-gray-100">
        <img 
          src={content.thumbnail} 
          alt={content.title}
          className="w-full h-full object-cover"
        />
        {content.type === 'video' && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {content.duration}
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded px-2 py-1">
          <span className="flex items-center text-xs font-medium">
            {content.type === 'article' ? (
              <FileText size={12} className="mr-1 text-blue-500" />
            ) : (
              <Video size={12} className="mr-1 text-red-500" />
            )}
            {content.type === 'article' ? 'Article' : 'Video'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{content.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{content.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{new Date(content.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <ThumbsUp size={14} className="mr-1" />
              {content.likes}
            </span>
            <span className="flex items-center">
              <MessageSquare size={14} className="mr-1" />
              {content.comments}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t px-4 py-2 bg-gray-50 flex justify-end space-x-2">
        <button 
          onClick={() => onEdit(content)}
          className="p-1 text-green-600 hover:text-green-800"
          title="Edit"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={() => onDelete(content.id)}
          className="p-1 text-red-600 hover:text-red-800"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const ContentPage = () => {
  const [contents, setContents] = useState(MOCK_CONTENT);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContents = contents.filter(
    (content) => {
      const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeFilter === 'all') return matchesSearch;
      return content.type === activeFilter && matchesSearch;
    }
  );

  const handleAddContent = () => {
    setCurrentContent(null);
    setIsModalOpen(true);
  };

  const handleEditContent = (content) => {
    setCurrentContent(content);
    setIsModalOpen(true);
  };

  const handleSaveContent = (contentData) => {
    if (currentContent) {
      // Edit existing content
      setContents(
        contents.map((c) => (c.id === currentContent.id ? { ...contentData, id: c.id } : c))
      );
    } else {
      // Add new content
      const newContent = {
        ...contentData,
        id: Math.max(0, ...contents.map((c) => c.id)) + 1,
      };
      setContents([...contents, newContent]);
    }
  };

  const handleDeleteContent = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContents(contents.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
          <p className="text-gray-600">Manage educational articles and videos for farmers</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleAddContent}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <Plus size={16} className="mr-2" />
            Add Content
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search content..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center space-x-3">
            <button 
              className={`px-3 py-1.5 text-sm rounded-md border ${
                activeFilter === 'all' 
                  ? 'bg-green-500 text-white border-green-500' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`flex items-center px-3 py-1.5 text-sm rounded-md border ${
                activeFilter === 'article' 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setActiveFilter('article')}
            >
              <FileText size={14} className="mr-1" />
              Articles
            </button>
            <button 
              className={`flex items-center px-3 py-1.5 text-sm rounded-md border ${
                activeFilter === 'video' 
                  ? 'bg-red-500 text-white border-red-500' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setActiveFilter('video')}
            >
              <Video size={14} className="mr-1" />
              Videos
            </button>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContents.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            onEdit={handleEditContent}
            onDelete={handleDeleteContent}
          />
        ))}
      </div>

      {filteredContents.length === 0 && (
        <div className="bg-white py-12 px-4 rounded-lg shadow text-center">
          <div className="flex justify-center mb-3">
            <Upload size={48} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No content found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? "No matches found for your search. Try with different keywords."
              : "Start by adding educational articles or videos for farmers."}
          </p>
          <button
            onClick={handleAddContent}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus size={16} className="mr-2" />
            Add New Content
          </button>
        </div>
      )}

      {/* Content modal */}
      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={currentContent}
        onSave={handleSaveContent}
      />
    </div>
  );
};

export default ContentPage;