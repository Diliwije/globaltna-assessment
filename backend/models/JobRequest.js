const mongoose = require('mongoose');

const JobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  contactName: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true,
    // Email format validation using Regex
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email format'
    ]
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },
  // Reference to link each job request to the authenticated user who created it
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JobRequest', JobRequestSchema);