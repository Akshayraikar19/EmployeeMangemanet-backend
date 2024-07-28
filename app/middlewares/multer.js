const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type'), false); // Reject the file
    }
};


const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
