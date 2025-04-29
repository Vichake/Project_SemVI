import express from 'express';
import mongoose from 'mongoose';
const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['article', 'video'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // Only for videos, can be empty for articles
    validate: {
      validator: function(value) {
        if (this.type === 'video') {
          // Validate video duration in HH:mm or mm:ss format
          return /\d{1,2}:\d{2}/.test(value);
        }
        return true; // No validation for non-video content
      },
      message: 'Invalid duration format. Expected HH:mm or mm:ss.',
    },
  },
  date: {
    type: Date,
    default: Date.now, // Date when the content is added
  },
},{
  timestamps:true
});

const Content = mongoose.model('Content', contentSchema);

export { Content };
