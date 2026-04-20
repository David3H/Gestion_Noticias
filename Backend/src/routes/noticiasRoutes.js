const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const controller = require('../controllers/noticiasController');

//Crear las rutas con su respectivo método
router.get('/', controller.getNoticias);
router.get('/:slug',controller.getNoticiaSlug);
router.post('/',upload.single('imagen'), controller.createNoticia);
router.put('/:id', upload.single('imagen'), controller.updateNoticia);
router.delete('/:id', controller.deleteNoticia);

module.exports = router;
