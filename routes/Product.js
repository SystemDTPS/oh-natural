const express = require('express');
const { body } = require('express-validator');
const { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct ,
    getProductUsingId,
    getTopBestsellingProducts
} = require('../controllers/Product');
const { isSignedIn, isAdmin } = require('../middlewares/AuthMiddleware');
const { upload } = require('../services/cloudinary.service');

const router = express.Router();

router.param('id', getProductUsingId);

// Create Product - Admin Only
// router.post(
//     '/',
//     isSignedIn,
//     isAdmin,
//     [
//         body('name').notEmpty().withMessage('Name is required'),
//         body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
//         body('stock').isInt({ min: 1 }).withMessage('Stock must be at least 1'),
//         body('category').notEmpty().withMessage('Category is required')
//     ],
//     createProduct
// );

router.post('/',     
    upload.array('images', 10), 
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
        body('stock').isInt({ min: 1 }).withMessage('Stock must be at least 1'),
        body('category').notEmpty().withMessage('Category is required')
    ], 
    createProduct
); 

// Get All Products - Public
router.get('/', getAllProducts);
router.get('/best', getTopBestsellingProducts);

// Get Product By ID - Public
router.get('/:id', getProductById);

// Update Product - Admin Only
router.put(
    '/:id',
    isSignedIn,
    isAdmin,
    [
        body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
        body('stock').optional().isInt({ min: 0 }).withMessage('Stock cannot be negative')
    ],
    updateProduct
);

// Delete Product - Admin Only
router.delete('/:id', isSignedIn, isAdmin, deleteProduct);

module.exports = router;
