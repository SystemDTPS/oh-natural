const express = require('express');
const { body } = require('express-validator');
const { getSettings, upsertSettings } = require('../controllers/Settings');
const { upload } = require('../services/cloudinary.service');
const { isSignedIn, isAdmin } = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Get current settings
router.get('/', getSettings);

// Create or update settings (admin)
router.put(
  '/',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banners', maxCount: 10 },
  ]),
  upsertSettings
);

module.exports = router;