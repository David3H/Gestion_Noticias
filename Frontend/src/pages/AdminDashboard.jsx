import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { newsService } from '../services/newsService'
import toast from 'react-hot-toast'
import ModalConfirmacion from '../components/ModalConfirmacion'

const AdminDashboard = () => {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  // Se invoca el traductor
  const { t, i18n } = useTranslation()
  // Se Guarda el idioma actual ('es' o 'en') para leer las propiedades de la base de datos
  const idiomaActual = i18n.language;
  const [paginaActual, setPaginaActual] = useState(1)
  const elementosPorPagina = 5
  //Para la paginación
  const indiceUltimoElemento = paginaActual * elementosPorPagina
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina
  const noticiasPaginadas = noticias.slice(indicePrimerElemento, indiceUltimoElemento)
  const totalPaginas = Math.ceil(noticias.length / elementosPorPagina)
  //Para el modal
  const [modalAbierto, setModalAbierto] = useState(false)
  const [idAEliminar, setIdAEliminar] = useState(null)

  useEffect(() => {
    //Funcion para cargar el listado de noticias
    const cargarNoticias = async () => {
      try {
        const data = await newsService.getAll()

        if (Array.isArray(data)) {
          setNoticias(data)
        } else if (data && data.noticias) {
          setNoticias(data.noticias)
        } else if (data && data.data) {
          setNoticias(data.data)
        } else {
          setNoticias([]);
        }
      } catch (error) {
        console.error("Error al cargar noticias:", error)
      } finally {
        setLoading(false)
      }
    }
    cargarNoticias()
  }, [])

  //Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('isAuth')
    navigate('/')
  }

  //Funcion para eliminar una noticia
  const ejecutarEliminacion = async () => {
    setModalAbierto(false) // Cerramos el modal inmediatamente

    if (!idAEliminar) return;

    setLoading(true)

    try {
      await newsService.delete(idAEliminar)
      toast.success("Noticia eliminada correctamente", { id: toast })
      setNoticias(noticias.filter(noticia => noticia.id !== idAEliminar))
    } catch (error) {
      console.error("Error al eliminar:", error)
      toast.error("No se pudo eliminar la noticia", { id: toast })
    } finally {
      setIdAEliminar(null) // Limpiar el ID
      setLoading(false)
    }
  }

  // Formateador de fecha compacto para la tabla
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '-'
    const fecha = new Date(fechaStr);
    return new Intl.DateTimeFormat(idiomaActual === 'es' ? 'es-ES' : 'en-US', {
      day: '2-digit', month: 'short', year: 'numeric'
    }).format(fecha)
  }

  // Funciones de navegación
  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1)
  }

  const irPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1)
  }

  // Función para abrir el modal y guarda qué ID se elimina
  const prepararEliminacion = (id) => {
    setIdAEliminar(id)
    setModalAbierto(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay de carga noticias */}
      {loading && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-medium text-gray-700 tracking-wide">{t('loading')}</p>
          </div>
        </div>
      )}
      {/* Barra superior del Admin */}
      <nav className="bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-white font-bold text-xl tracking-wider">
              Panel<span className="text-indigo-400">Admin</span>
            </div>
            <div className="flex space-x-4 items-center">
              <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium transition">
                {t('view_site')}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
              >
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Cabecera de la sección */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('dashboard_title')}</h1>
            <p className="mt-2 text-sm text-gray-700">
              {t('dashboard_subtitle')}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/admin/crear"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              {t('new_news_button')}
            </Link>
          </div>
        </div>

        {/* Tabla de noticias */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">{t('table_title')}</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{t('table_date')}</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{t('table_status')}</th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-semibold text-gray-900">
                    {t('table_actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {noticias.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-sm text-gray-500">
                      {t('news_available')}
                    </td>
                  </tr>
                ) : (
                  noticiasPaginadas.map((noticia) => (
                    <tr key={noticia.id} className="hover:bg-gray-50 transition">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {noticia[`titulo_${idiomaActual}`]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatearFecha(noticia.fecha_creacion)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset 
                        ${noticia.estado === true
                            ? 'bg-green-50 text-green-700 ring-green-600/20'
                            : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                          }`}>
                          {noticia.estado === true ? `${t('published')}` : `${t('removed')}`}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={`/admin/editar/${noticia.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                          {t('edit')}
                        </Link>
                        <button onClick={() => prepararEliminacion(noticia.id)} className="text-red-600 hover:text-red-900">
                          {t('delete')}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {noticias.length > 0 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">

                {/* Botones */}
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={irPaginaAnterior}
                      disabled={paginaActual === 1}
                      className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${paginaActual === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {t('before')}
                    </button>

                    {/* Indicador de página actual (Geométrico y limpio) */}
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-700">
                      {t('page')} {paginaActual} {t('to')} {totalPaginas}
                    </span>

                    <button
                      onClick={irPaginaSiguiente}
                      disabled={paginaActual === totalPaginas}
                      className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${paginaActual === totalPaginas
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {t('after')}
                    </button>
                  </nav>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
      {/* Se renderiza el Modal fuera de la tabla, al principio o final del componente */}
      <ModalConfirmacion
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onConfirm={ejecutarEliminacion}
        titulo={t('modal_delete_title')}
        mensaje={t('modal_delete_msg')}
        textoCancelar={t('cancel')}
        textoConfirmar={t('confirm_delete')}
      />
    </div>
  )
}

export default AdminDashboard