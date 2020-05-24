const Multer = require('multer');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const config = require('../config');

const storage = new Storage({
  projectId: config.firebaseProjectId,
  keyFilename: config.firebaseKey,
});

const bucket = storage.bucket(config.firebaseBucket);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Max 5MB
  },
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => new Promise((resolve, reject) => {
  if (!file) {
    reject(new Error('No image file'));
  }

  const ext = path.extname(file.originalname).toLowerCase();
  const { mimetype } = file;

  const allowedExt = [
    '.jpg',
    '.jpeg',
    '.png',
  ];

  const allowedMimeType = [
    'image/png',
    'image/jpg',
    'image/jpeg',
  ];

  if (!allowedExt.includes(ext) || !allowedMimeType.includes(mimetype)) {
    reject(new Error('Please upload an image file'));
  }

  const baseName = path.parse(file.originalname).name.replace(/ /g, '_');
  const unixTime = Date.now();

  const newFileName = `images/${baseName}_${unixTime}${ext}`;

  const fileUpload = bucket.file(newFileName);

  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  blobStream.on('error', (error) => {
    reject(new Error(error.message));
  });

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
    resolve({
      publicUrl,
      fileName: fileUpload.name,
    });
  });

  blobStream.end(file.buffer);
});

/**
 * Delete image file from Google Storage
 * @param {String} fileName of the image that is deleted
 */
const deleteImageFromStorage = async (fileName) => {
  await bucket.file(fileName).delete();
};

module.exports = {
  multer,
  uploadImageToStorage,
  deleteImageFromStorage,
};
