const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const path = require('path');
    const ext = path.extname(file.originalname);
    if (
      ext !== '.png' &&
      ext !== '.PNG' &&
      ext !== '.jpg' &&
      ext !== '.JPG' &&
      ext !== '.jpeg' &&
      ext !== '.svg' &&
      ext !== '.SVG'
    ) {
      return cb(new Error('Lỗi định dạng file.'));
    }
    cb(null, true);
  },
});

module.exports = upload.single('img');
