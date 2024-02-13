import multer from 'multer';
import { join } from 'path';
import { __dirname } from '../utils.js';


const uploadDirectories = {
  profile: join(__dirname, '/uploads/profile'),
  documents: join(__dirname, '/uploads/documents'),
  products: join(__dirname, '/uploads/products')
};


const getUploadDir = (req, file, cb) => {
  let uploadDir;

  
  const imageType = req.body.imageType;

  
  switch (imageType) {
    case 'profile':
      uploadDir = uploadDirectories.profile;
      break;
    case 'documents':
      uploadDir = uploadDirectories.documents;
      break;
    case 'products':
      uploadDir = uploadDirectories.products;
      break;
    default:
      uploadDir = uploadDirectories.documents; 
  }

  // Devolver el directorio de carga al callback
  cb(null, uploadDir);
};

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
  destination: getUploadDir,
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Configuración de multer
const upload = multer({ storage: storage });

export default upload;