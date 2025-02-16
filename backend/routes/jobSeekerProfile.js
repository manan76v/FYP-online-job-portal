const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  deleteProfile,
  uploadFiles
} = require('../controllers/jobSeekerProfileController');

// @route   GET /api/jobseeker/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', auth, getProfile);

// @route   POST /api/jobseeker/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, uploadFiles, updateProfile);

// @route   DELETE /api/jobseeker/profile
// @desc    Delete user profile
// @access  Private
router.delete('/', auth, deleteProfile);

module.exports = router;
