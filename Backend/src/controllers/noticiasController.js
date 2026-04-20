const pool = require('../config/db');

//Controlador para obtener las noticias
const getNoticias = async (req, res) => {
  try {
    const result = await pool.query(`select id, slug, titulo_es, titulo_en, contenido_es, contenido_en, imagen_url, 
                                   fecha_creacion, estado from posts where estado=true order by fecha_creacion desc`);
    res.status(200).json({success: true, data: result.rows});
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las noticias: '+error.message });
  }
};
//Controlador para obtener una noticia por slug
const getNoticiaSlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const query = `select id, slug, titulo_es, titulo_en, contenido_es, contenido_en, imagen_url, 
                   fecha_creacion from posts where slug = $1 and estado=true`;
    const result = await pool.query(query, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, data: 'Noticia no encontrada' });
    }
    res.status(200).json({success: true, data: result.rows[0]});
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la noticia por slug: '+error.message });
  }
};
//Controlador para crear una nueva noticia
const createNoticia = async (req, res) => {
  try {
    const { slug, titulo_es, titulo_en, contenido_es, contenido_en } = req.body;
    const imagen_url = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;
    const estado = true;
    
    //Consulta parametrizada
    const query = `
      insert into posts (slug, titulo_es, titulo_en, contenido_es, contenido_en, imagen_url,estado) 
      values ($1, $2, $3, $4, $5, $6, $7) 
      returning *;
    `;
    const values = [slug, titulo_es, titulo_en, contenido_es, contenido_en, imagen_url, estado];

    const result = await pool.query(query, values);
    res.status(200).json({success: true, data: result.rows[0]});

  } catch (error) {
    res.status(500).json({ error: 'Error al crear la nueva noticia: '+error.message });
  }
};
//Controlador para actualizar una noticia
const updateNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, titulo_es, titulo_en, contenido_es, contenido_en } = req.body;

    //Consulta parametrizada
    let query = `
      update posts set slug=$1, titulo_es=$2, titulo_en=$3, contenido_es=$4, contenido_en=$5`;
    let values = [slug, titulo_es, titulo_en, contenido_es, contenido_en];

    if (req.file) {
      const imagen_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      query += `, imagen_url = $6 where id = $7 returning *;`;
      values.push(imagen_url, id);
    } else {
      query += ` where id = $6 returning *;`;
      values.push(id);
    }
    const result = await pool.query(query, values);
    res.status(200).json({success: true, data: result.rows[0]});

  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la noticia: '+error.message });
  }
};
//Controlador para eliminar una noticia
const deleteNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const estado=false;

    const query = 'update posts set estado=$1 WHERE id = $2';
    const values = [estado, id];
    await pool.query(query, values);

    res.status(200).json({ success: true, data: 'Noticia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la noticia: '+error.message });
  }
};

module.exports = {getNoticias, getNoticiaSlug, createNoticia, 
                 updateNoticia, deleteNoticia}