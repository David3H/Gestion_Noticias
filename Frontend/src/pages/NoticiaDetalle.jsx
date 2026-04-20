import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { newsService } from '../services/newsService'
import NotFound from "./NotFound"
import { useTranslation } from 'react-i18next'

const NoticiaDetalle = () => {
  const { slug } = useParams()
  const location = useLocation() // Hook para acceder al estado enviado
  const [noticias, setNoticia] = useState(location.state?.noticia || null)
  const [loading, setLoading] = useState(!noticias)
  // Se invoca el traductor
  const { t, i18n } = useTranslation()
  // Se Guarda el idioma actual ('es' o 'en') para leer las propiedades de la base de datos
  const idiomaActual = i18n.language

    // Funcion para formatear fecha por defecto de la base de datos
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr)
    return new Intl.DateTimeFormat(idiomaActual === 'es' ? 'es-ES' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(fecha)
  };

  useEffect(() => {
    // Solo se hace la petición si la noticia NO vino en el state
    if (!noticias) {
      const cargarNoticia = async () => {
        try {
          const data = await newsService.getBySlug(slug)
          setNoticia(data.data)
        } catch (error) {
          console.error("Error al recuperar noticia:", error)
        } finally {
          setLoading(false)
        }
      };
      cargarNoticia()
    }
  }, [slug, noticias])

  if (!noticias) {
    return <NotFound />
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Overlay de carga noticias */}
      {loading && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-medium text-gray-700 tracking-wide">{t('loading')}</p>
          </div>
        </div>
      )}
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Botón para retroceder */}
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('Back_news')}
        </Link>

        {/* Cabecera del Artículo */}
        <header className="mb-10 text-center md:text-left">
          <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
            {formatearFecha(noticias.fecha_creacion)}
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {noticias[`titulo_${idiomaActual}`]}
          </h1>
        </header>

        {/* Imagen Principal */}
        <div className="w-full aspect-video md:aspect-21/9 rounded-2xl overflow-hidden mb-12 shadow-md">
          <img
            src={noticias.imagen_url}
            alt={noticias[`titulo_${idiomaActual}`]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cuerpo del Artículo */}
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {noticias[`contenido_${idiomaActual}`]}
        </article>

      </main>
    </div>
  )
}

export default NoticiaDetalle