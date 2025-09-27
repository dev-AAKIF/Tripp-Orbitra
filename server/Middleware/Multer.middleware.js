import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve("uploads")); // Use absolute path
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, 'upload-' + uniqueSuffix + fileExtension);
    }
});

// File filter to only allow PDF and JSON files
const fileFilter = (req, file, cb) => {
    console.log('Processing file:', {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype
    });
    
    const allowedMimes = ['application/pdf', 'application/json', 'text/json'];
    const allowedExtensions = ['.pdf', '.json'];
    
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedMimes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
        console.log('File accepted:', file.originalname);
        cb(null, true);
    } else {
        console.log('File rejected:', file.originalname, 'Type:', file.mimetype);
        cb(new Error(`Only PDF and JSON files are allowed! Received: ${file.mimetype}`), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

// Export the upload middleware that accepts any field names
export const uploadAnyField = upload.any();

// Export specific field upload (if you want to enforce field name)
export const uploadFileField = upload.single('file');

// Export fields upload (for multiple specific fields)
export const uploadMultipleFields = upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'document', maxCount: 1 },
    { name: 'itinerary', maxCount: 1 }
]);

// Default export - most flexible option
export default upload;