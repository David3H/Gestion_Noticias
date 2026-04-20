import { useState, useEffect } from 'react'
import { newsService } from '../services/newsService'
import toast from 'react-hot-toast'
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useTranslation } from 'react-i18next'

const Home = () => {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  // Se invoca el traductor
  const { t, i18n } = useTranslation()
  // Se Guarda el idioma actual ('es' o 'en') para leer las propiedades de la base de datos
  const idiomaActual = i18n.language
  const [paginaActual, setPaginaActual] = useState(1)
  const elementosPorPagina = 6
  // Cálculos para recortar el arreglo
  const indiceUltimoElemento = paginaActual * elementosPorPagina
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina
  const noticiasPaginadas = noticias.slice(indicePrimerElemento, indiceUltimoElemento)

  const totalPaginas = Math.ceil(noticias.length / elementosPorPagina)

  // Funcion para formatear fecha por defecto de la base de datos
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return new Intl.DateTimeFormat(idiomaActual === 'es' ? 'es-ES' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(fecha)
  };

  // Función para crear un resumen del contenido global de la noticia
  const obtenerResumen = (texto, limite = 120) => {
    if (!texto) return ""
    return texto.length > limite ? texto.substring(0, limite) + "..." : texto
  };

  useEffect(() => {
    const cargarNoticias = async () => {
      try {

        const data = await newsService.getAll()
        setNoticias(data.data)

      } catch (error) {
        toast.error("Se produjo un error al obtener datos del servidor")
        console.error(error)
      } finally {
        setLoading(false)
      }
    };
    cargarNoticias()
  }, []);

  const irPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1)
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1)
  };
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
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
      {/* Contenedor Principal Unificado */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Cabecera */}
        <header className="text-center md:text-left mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {t('hero_title')} <span className="text-indigo-600">{t('hero_title_highlight')}</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            {t('hero_subtitle')}
          </p>
        </header>

        {/* Tarjetas de noticias (Usando noticiasPaginadas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticiasPaginadas.map((noticia) => (
            <article key={noticia.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">

              <div className="aspect-video w-full overflow-hidden bg-gray-200">
                <img
                  src={noticia.imagen_url}
                  alt={noticia[`titulo_${idiomaActual}`]}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col grow">
                <span className="text-xs font-semibold text-indigo-600 mb-2 uppercase tracking-wider">
                  {formatearFecha(noticia.fecha_creacion)}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {noticia[`titulo_${idiomaActual}`]}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3 grow">
                  {obtenerResumen(noticia[`contenido_${idiomaActual}`])}
                </p>

                <Link
                  to={`/noticia/${noticia.slug}`}
                  state={{ noticia }} // Corregido a singular
                  className="inline-flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors w-full sm:w-auto mt-auto"
                >
                  {t('read_more')}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Paginador */}
        {totalPaginas > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-16">
            <button
              onClick={irPaginaAnterior}
              disabled={paginaActual === 1}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {t('before')}
            </button>

            <span className="text-sm font-medium text-gray-500">
              {t('page')} {paginaActual} {t('to')} {totalPaginas}
            </span>

            <button
              onClick={irPaginaSiguiente}
              disabled={paginaActual === totalPaginas}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {t('after')}
            </button>
          </div>
        )}

      </main>
    </div>
  )
}

export default Home