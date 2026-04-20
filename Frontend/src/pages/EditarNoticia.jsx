import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import toast from 'react-hot-toast'
import NavbarPanel from "../components/NavbarPanel"
import { newsService } from '../services/newsService'
import { useTranslation } from 'react-i18next'

const EditarNoticia = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [activoTab, setActivoTab] = useState('es')
    const [imagen, setImagen] = useState('')
    const [nuevaImagen, setNuevaImagen] = useState(null)
    const [formData, setFormData] = useState({
        titulo_es: '',
        contenido_es: '',
        titulo_en: '',
        contenido_en: '',
        slug: ''
    });
    // Se invoca el traductor
    const { t } = useTranslation()
    const noticiaEnMemoria = location.state?.noticia

    useEffect(() => {
        const inicializarFormulario = async () => {
            try {
                let noticiaData = noticiaEnMemoria

                // Si no hay datos en memoria se hace la peticion
                if (!noticiaData) {
                    noticiaData = await newsService.getAll().then(
                        res => {
                            const arrayNoticias = Array.isArray(res) ? res : (res.data || res.noticias || [])
                            return arrayNoticias.find(n => n.id.toString() === id)
                        }
                    );
                }

                if (noticiaData) {
                    setFormData({
                        titulo_es: noticiaData.titulo_es || '',
                        contenido_es: noticiaData.contenido_es || '',
                        titulo_en: noticiaData.titulo_en || '',
                        contenido_en: noticiaData.contenido_en || '',
                        slug: noticiaData.slug || ''
                    });
                    setImagen(noticiaData.imagen || noticiaData.imagen_url)
                } else {
                    toast.error("No se encontró la noticia")
                    navigate('/admin')
                }
            } catch (error) {
                console.error(error)
                toast.error("Error al cargar los datos")
            } finally {
                setLoading(false)
            }
        }

        inicializarFormulario()
    }, [id, noticiaEnMemoria, navigate])

    //Funcion para el manejo dinamico de los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    //Función para enviar los datos a actualizar
    const handleSubmit = async (e) => {
        e.preventDefault()

        //Validar que se ingrese la noticia en ingles
        if (formData.titulo_en.trim() === '' || formData.contenido_en.trim() === '') {
            // Le avisamos al usuario
            toast.error(t('valid_language_in'))
            //Movemos automáticamente a la pestaña de inglés
            setActivoTab('en')
            return
        }
        //Validar que se ingrese la noticia en español
        if (formData.titulo_es.trim() === '' || formData.contenido_es.trim() === '') {
            // Le avisamos al usuario
            toast.error(t('valid_language_is'))
            //Movemos automáticamente a la pestaña de inglés
            setActivoTab('en')
            return
        }
        setLoading(true)

        try {
            const data = new FormData()
            data.append('slug', formData.slug)
            data.append('titulo_es', formData.titulo_es)
            data.append('titulo_en', formData.titulo_en)
            data.append('contenido_es', formData.contenido_es)
            data.append('contenido_en', formData.contenido_en)

            // SOLO enviamos la imagen si el usuario seleccionó una nueva
            if (nuevaImagen) {
                data.append('imagen', nuevaImagen)
            }

            await newsService.update(id, data)

            toast.success("¡Noticia actualizada!", { id: toast })
            navigate('/admin')
        } catch (error) {
            console.error(error)
            toast.error("Error al actualizar", { id: toast })
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Overlay de carga noticias */}
            {loading && (
                <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-opacity">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 font-medium text-gray-700 tracking-wide">{t('loading')}</p>
                    </div>
                </div>
            )}
            <NavbarPanel />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{t('edit_news')}</h1>
                        <p className="mt-2 text-sm text-gray-600">{t('edit_info')}</p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {t('num_new')} {id}
                    </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('general_info')}</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Formulario enfocado en los dos idiomas con dos pestañas */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Encabezado de las Pestañas */}
                        <div className="flex border-b border-gray-200 bg-gray-50">
                            <button
                                type="button" onClick={() => setActivoTab('es')}
                                className={`flex-1 py-4 text-sm font-medium transition-colors ${activoTab === 'es' ? 'bg-white border-t-2 border-t-indigo-500 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                🇪🇸 {t('new_is')}
                            </button>
                            <button
                                type="button" onClick={() => setActivoTab('en')}
                                className={`flex-1 py-4 text-sm font-medium transition-colors ${activoTab === 'en' ? 'bg-white border-t-2 border-t-indigo-500 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                🇺🇸 {t('new_in')}
                            </button>
                        </div>

                        {/* Contenido de la Pestaña */}
                        <div className="p-6 space-y-6">

                            {/* Bloque para Español */}
                            <div className={activoTab === 'es' ? 'block' : 'hidden'}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('title')} <span className="text-red-700">*</span></label>
                                    <input
                                        type="text"
                                        name="titulo_es"
                                        value={formData.titulo_es}
                                        onChange={handleInputChange}
                                        required={activoTab == 'es'}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                                     focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('content')} <span className="text-red-700">*</span></label>
                                    <textarea
                                        name="contenido_es"
                                        value={formData.contenido_es}
                                        onChange={handleInputChange}
                                        required={activoTab == 'es'}
                                        rows="8"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                                     focus:ring-indigo-500 outline-none"></textarea>
                                </div>
                            </div>

                            <div className={activoTab === 'en' ? 'block' : 'hidden'}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('title')} <span className="text-red-700">*</span></label>
                                    <input
                                        type="text"
                                        name="titulo_en"
                                        value={formData.titulo_en}
                                        onChange={handleInputChange}
                                        required={activoTab == 'en'}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                                     focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('content')} <span className="text-red-700">*</span></label>
                                    <textarea
                                        name="contenido_en"
                                        value={formData.contenido_en}
                                        onChange={handleInputChange}
                                        required={activoTab == 'en'}
                                        rows="8"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                                     focus:ring-indigo-500 outline-none"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Controles Globales para Imagen y Slug) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('cover_image')}</label>
                                {/* Mostramos la imagen actual */}
                                {imagen && !nuevaImagen && (
                                    <div className="mb-3 relative rounded-lg overflow-hidden border border-gray-200 aspect-video">
                                        <img
                                            src={imagen.startsWith('http') ? imagen : `${import.meta.env.VITE_API_URL}/uploads/${imagen}`}
                                            alt="Actual"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <span className="text-white text-sm font-medium">{t('cu_image')}</span>
                                        </div>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNuevaImagen(e.target.files[0])}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
                                />
                                <p className="mt-1 text-xs text-orange-500">{t('optional_change')}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug <span className="text-red-700">*</span></label>
                                <input
                                    type="text" name="slug" value={formData.slug} onChange={handleInputChange} required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500
                                     bg-gray-50 outline-none transition"
                                />
                                <p className="mt-1 text-xs text-orange-500">{t('alert_slug')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all">
                            {t('update_new_button')}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default EditarNoticia