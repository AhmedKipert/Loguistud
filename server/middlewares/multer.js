const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Créer le dossier s'il n'existe pas
const photosProfilePath = path.join(__dirname, '../uploads/photosProfiles');
if (!fs.existsSync(photosProfilePath)) {
    fs.mkdirSync(photosProfilePath, { recursive: true });
}

const logementPath = path.join(__dirname, '../uploads/logements');
if (!fs.existsSync(logementPath)) {
    fs.mkdirSync(logementPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, photosProfilePath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const storageTwo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, logementPath);
    },
    filename: (req, file, cb) => {
        cb(null, (req.body.proprietaire || 'unknown') + '_' + Date.now() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Seules les images sont autorisées'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB max
    }
});

const uploadMany = multer({
    storage: storageTwo,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max par image
    }
});

module.exports = { upload, uploadMany };