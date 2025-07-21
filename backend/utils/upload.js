const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas (JPEG, JPG, PNG)'));
    }
  }
});

const resizeImage = async (filePath, width, height) => {
  const filename = path.basename(filePath);
  const directory = path.dirname(filePath);
  const resizedPath = path.join(directory, 'resized-' + filename);

  await sharp(filePath)
    .resize(width, height)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(resizedPath);

  // Remover arquivo original
  fs.unlinkSync(filePath);

  return resizedPath;
};

module.exports = { upload, resizeImage };
