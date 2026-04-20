import { useState } from "react"
import toast from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom"
import NavbarPanel from "../components/NavbarPanel"
import { newsService } from '../services/newsService'
import { useTranslation } from 'react-i18next'

const CrearNoticia = () => {
    const navigate = useNavigate()
    const [activoTab, setActivoTab] = useState('es')
    const [imagen, setImagen] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        titulo_es: '',
        contenido_es: '',
        titulo_en: '',
        contenido_en: '',
        slug: ''
    })
    // Se invoca el traductor
    const { t } = useTranslation()

    //Funcion para el manejo dinamico de los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target

        // Actualizamos el estado general
        setFormData({ ...formData, [name]: value })

        // Se auto-generar el slug basado en el título
        if (name === 'titulo_es') {
            const generatedSlug = value
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // eliminar tildes
                .replace(/[^a-z0-9]+/g, '-') // Cambia espacios y guiones
                .replace(/(^-|-$)+/g, ''); // Quita guiones a los extremos

            setFormData(prev => ({ ...prev, slug: generatedSlug }))
        }
    };

    //Función para enviar datos del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validamos que se suba una imagen
        if (!imagen) {
            toast.error(t('valid_image'))
            return
        }
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
            setActivoTab('es')
            return
        }
        setIsSubmitting(true)

        try {
            //Construcción del FormData (Empaquetado para el Backend)
            const data = new FormData()
            data.append('slug', formData.slug)
            data.append('titulo_es', formData.titulo_es)
            data.append('titulo_en', formData.titulo_en)
            data.append('contenido_es', formData.contenido_es)
            data.append('contenido_en', formData.contenido_en)
            data.append('imagen', imagen)
            console.log(data)
            //Petición POST al servicio
            await newsService.create(data);

            toast.success("¡Noticia publicada con éxito!", { id: toast })
            navigate('/admin')
        } catch (error) {
            console.error(error);
            toast.error("Hubo un fallo al guardar", { id: toast })
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Overlay de carga noticias */}
            {isSubmitting && (
                <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-opacity">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 font-medium text-gray-700 tracking-wide">{t('loading')}</p>
                    </div>
                </div>
            )}
            <NavbarPanel />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{t('create_new_news')}</h1>
                    <p className="mt-2 text-sm text-gray-600">{t('requerid_info')}</p>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('general_info')}</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Formulario enfocado en los dos idiomas con dos pestañas */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Encabezado de las Pestañas */}
                        <div className="flex border-b border-gray-200 bg-gray-50">
                            <button
                                type="button"
                                onClick={() => setActivoTab('es')}
                                className={`flex-1 py-4 text-sm font-medium text-center transition-colors
                                     ${activoTab === 'es' ? 'bg-white border-t-2 border-t-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                🇪🇸 {t('new_is')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setActivoTab('en')}
                                className={`flex-1 py-4 text-sm font-medium text-center transition-colors 
                                    ${activoTab === 'en' ? 'bg-white border-t-2 border-t-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                🇺🇸 {t('new_in')}
                            </button>
                        </div>

                        {/* Contenido de la Pestaña */}
                        <div className="p-6 space-y-6">

                            {/* Bloque para Español */}
                            <div className={activoTab == 'es' ? 'block' : 'hidden'}>
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
                                         focus:ring-indigo-500 outline-none transition"
                                        placeholder="Escriba el título de la noticia..."
                                    />
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
                                         focus:ring-indigo-500 outline-none transition"
                                        placeholder="Escriba el cuerpo de la noticia aquí..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Bloque para Inglés*/}
                            <div className={activoTab == 'en' ? 'block' : 'hidden'}>
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
                                         focus:ring-indigo-500 outline-none transition"
                                        placeholder="Write the news title..."
                                    />
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                        focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                        placeholder="Write the news body here..."
                                    ></textarea>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/*Controles Globales para Imagen y Slug) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('principal_img')} <span className="text-red-700">*</span></label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImagen(e.target.files[0])}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                                    file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50
                                     file:text-indigo-700 hover:file:bg-indigo-100 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('slug_generated')} <span className="text-red-700">*</span></label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 
                                    focus:border-indigo-500 bg-gray-50 outline-none transition"
                                />
                                <p className="mt-1 text-xs text-gray-400">*{t('self_generating')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Botón de Enviar */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg 
                            shadow-sm hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50 transition-all"
                        >
                            {t('save_new')}
                        </button>
                    </div>

                </form>
            </main>
        </div>
    )
}

export default CrearNoticia