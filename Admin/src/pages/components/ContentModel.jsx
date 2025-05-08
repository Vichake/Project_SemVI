import React, { useState, useEffect } from 'react';

const ContentModal = ({ isOpen, onClose, content = null, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'article',
    description: '',
    thumbnail: '',
    url: '',
    duration: '',
    category: '', // new field
  });

  // Update form data when editing content changes
  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || '',
        type: content.type || 'article',
        description: content.description || '',
        thumbnail: content.thumbnail || '',
        url: content.url || '',
        duration: content.duration || '',
        category: content.category || '',
      });
    } else {
      setFormData({
        title: '',
        type: 'article',
        description: '',
        thumbnail: '',
        url: '',
        duration: '',
        category: '',
      });
    }
  }, [content, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      ...(content && { id: content.id }),
    };

    if (submissionData.type === 'video' && !submissionData.duration) {
      submissionData.duration = '00:00';
    }

    onSave(submissionData);
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
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="" disabled>Select category</option>
                <option value="Crop Production">Crop Production</option>
                <option value="Soil and Water Conservation">Soil and Water Conservation</option>
                <option value="Pest Management">Pest Management</option>
                <option value="Livestock Management">Livestock Management</option>
                <option value="Agroforestry">Agroforestry</option>
                <option value="Smart Farming">Smart Farming</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
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

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.type === 'article' ? 'Article URL' : 'Video URL'}
              </label>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder={formData.type === 'article' ? 'https://example.com/article' : 'https://youtube.com/watch?v=...'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Duration (for video only) */}
            {formData.type === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (MM:SS)</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="10:30"
                  pattern="[0-9]+:[0-5][0-9]"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
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
              {content ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentModal;
