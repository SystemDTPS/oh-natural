const express = require('express');
const { body } = require('express-validator');
const { 
    createCategory, 
    getCategory, 
    updateCategory, 
    deleteCategory,
    listCategories
} = require('../controllers/Category');
const { isSignedIn, isAdmin } = require('../middlewares/AuthMiddleware');
const { upload } = require('../services/cloudinary.service');

const router = express.Router();

// Create Category - Admin Only
router.post(
    '/',
    (req, res, next) => {
      upload.single('image')(req, res, function (err) {
        if (err) {
          console.error('Multer error:', err);
          return res.status(400).json({ message: 'Image upload failed', error: err.message });
        }
        next();
      });
    },
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('description').notEmpty().withMessage('Description is required')
    ],
    createCategory
  );
  

// Get Category by ID - Public
router.get('/:id', getCategory);

// Update Category - Admin Only
router.put(
    '/:id',
    isSignedIn,
    isAdmin,
    [
        body('name').optional().notEmpty().withMessage('Name is required if provided'),
        body('description').optional().notEmpty().withMessage('Description is required if provided')
    ],
    updateCategory
);

// Delete Category - Admin Only
router.delete('/:id', isSignedIn, isAdmin, deleteCategory);

// List All Categories - Public
router.get('/', listCategories);

module.exports = router;