const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const _ = require('lodash');
const Category = require('../models/Category');
// Get Product Using ID router.param code
exports.getProductUsingId = (req,res,next,id) => {
    Product.findById(id).populate('category', 'name description').exec((err,product) => {
        if(err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
}

// Create Product
exports.createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, description, price, stock, category, bestselling, newlyLaunched } = req.body;

        // Check if images are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded!' });
        }

        // Extract image URLs from uploaded files
        const images = req.files.map(file => file.path);

        const product = new Product({
            name,
            description,
            price,
            stock,
            category,
            images,
            bestselling,  // Make sure this field is included
            newlyLaunched
        });

        const savedProduct = await product.save();

        const categoryDoc = await Category.findById(category);
        categoryDoc.products.push(savedProduct._id);
        await categoryDoc.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name description');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Top 4 Bestselling Products
exports.getTopBestsellingProducts = async (req, res) => {
    try {
      const products = await Product.find({ bestselling: true }) // Filter by bestselling flag
        .sort({ sells: -1 })  // Sort by sells in descending order
        .limit(4);  // Limit the results to 4
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get Product By ID
exports.getProductById = async (req, res) => {
    try {
        const product = req.product

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let updatedProduct = req.product;

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { category } = req.body;

        // If category is being changed, update the category references
        if (category && category !== String(updatedProduct.category)) {
            // Remove the product from the old category's products array
            await Category.findByIdAndUpdate(updatedProduct.category, { 
                $pull: { products: updatedProduct._id } 
            });

            // Add the product to the new category's products array
            await Category.findByIdAndUpdate(category, { 
                $push: { products: updatedProduct._id } 
            });

            updatedProduct.category = category;
        }

        updatedProduct = _.extend(updatedProduct, req.body);
        updatedProduct.updatedAt = Date.now();

        await updatedProduct.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.product._id;

        // Find the product
        const product = req.product;
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Remove the product from the related category's products array
        await Category.findByIdAndUpdate(product.category, { 
            $pull: { products: productId } 
        });

        // Delete the product
        await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};