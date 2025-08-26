const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { log } = require('console');
const logementPath = path.join(__dirname, 'uploads/logements')

if(!fs.existsSync(logementPath)) fs.mkdirSync(logementPath, {recursive: true});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/photosProfiles');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const storageTwo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/logements');
    },
    filename: (req, file, cb) => {
        cb(null,  req.body.proprietaire + '_' + Date.now() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('uploads/logements')) {
        cb(null, true)
    } else {
        cb(new Error('Seules les images sont autorisés'), false);
    }
};

const upload = multer({storage}); 
const uploadMany = multer({storage: storageTwo})

module.exports = {upload, uploadMany};