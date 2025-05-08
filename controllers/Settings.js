const Settings = require('../models/Settings');
const { validationResult } = require('express-validator');

// Get current settings
exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update settings
exports.upsertSettings = async (req, res) => {

  try {
    const updateData = { ...req.body };
    
    // Handle logo (single image)
    if (req.files['logo'] && req.files['logo'][0]) {
      updateData.logo = req.files['logo'][0].path;
    }

    // Handle banners (multiple images)
    if (req.files['banners']) {
      updateData.banners = req.files['banners'].map(file => file.path);
    }

    const settings = await Settings.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};