const mongoose = require('mongoose');

const jobSeekerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  education: {
    type: String
  },
  experience: {
    type: String
  },
  skills: [{
    type: String
  }],
  about: {
    type: String
  },
  profileImage: {
    type: String // URL to the stored image
  },
  resume: {
    type: String // URL to the stored resume
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
jobSeekerProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('JobSeekerProfile', jobSeekerProfileSchema);
