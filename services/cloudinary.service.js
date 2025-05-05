const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce', // Folder name in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif','webp','avif'],
    use_filename: true,
    unique_filename: true,
  },
});

// Middleware for handling file uploads
const upload = multer({ storage });

module.exports = { cloudinary, upload };