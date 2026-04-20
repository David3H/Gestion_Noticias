const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(process.cwd(), 'uploads');
//Si no existe la carpeta contenedora de la imagenes se crea
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
//Se almacena las imagenes en el servidor usando multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Se elimina cualquier intento de "../" en el nombre original y se borran caracteres raros, solo letras y números.
    const safeName = path.basename(file.originalname).replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    
    cb(null, Date.now() + '-' + safeName);
  }
});
//Se limita el peso de las imagenes a 5mb
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

module.exports = upload;