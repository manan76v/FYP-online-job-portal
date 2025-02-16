const JobSeekerProfile = require('../models/JobSeekerProfile');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = file.fieldname === 'profileImage' 
      ? 'uploads/profiles'
      : 'uploads/resumes';
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'profileImage') {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload an image file (jpg, jpeg, png)'));
      }
    } else if (file.fieldname === 'resume') {
      if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
        return cb(new Error('Please upload a valid document (pdf, doc, docx)'));
      }
    }
    cb(null, true);
  }
});

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await JobSeekerProfile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create or update profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      education,
      experience,
      skills,
      about
    } = req.body;

    const profileFields = {
      user: req.user.id,
      fullName,
      email,
      phone,
      education,
      experience,
      skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
      about
    };

    // Add file paths if files were uploaded
    if (req.files) {
      if (req.files.profileImage) {
        profileFields.profileImage = req.files.profileImage[0].path;
      }
      if (req.files.resume) {
        profileFields.resume = req.files.resume[0].path;
      }
    }

    let profile = await JobSeekerProfile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await JobSeekerProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
    } else {
      // Create
      profile = new JobSeekerProfile(profileFields);
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
  try {
    await JobSeekerProfile.findOneAndRemove({ user: req.user.id });
    res.json({ message: 'Profile deleted' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export multer middleware
exports.uploadFiles = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]);
