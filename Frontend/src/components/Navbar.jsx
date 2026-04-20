import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'

const Navbar = () => {
    //Se extrae el objeto i18n y la función traducir
    const { t, i18n } = useTranslation()

    // Función para cambiar de idioma
    const cambiarIdioma = (idioma) => {
        i18n.changeLanguage(idioma)
        // Se guarda la elección de idioma
        localStorage.setItem('userLang', idioma)
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/*Para el logotipo*/}
                    <div className="shrink-0 flex items-center">
                        <Link to='/' className="text-2xl font-bold text-indigo-600 tracking-tight">
                            Dev<span className="text-gray-800">News</span>
                        </Link>
                    </div>
                    {/*Para el cambio de idioma*/}
                    <div className="flex items-center space-x-4">
                        {/*Cambio a la libreria i18next */}
                        <div className="bg-gray-100 p-1 rounded-lg flex space-x-1 border border-gray-200">
                            <button onClick={() => cambiarIdioma('es')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition ${i18n.language === 'es' ? 'bg-white shadow-sm text-gray-700' : 'text-gray-500 hover:text-gray-700'
                                    }`}>
                                ES
                            </button>
                            <button onClick={() => cambiarIdioma('en')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition ${i18n.language === 'en' ? 'bg-white shadow-sm text-gray-700' : 'text-gray-500 hover:text-gray-700'
                                    }`}>
                                EN
                            </button>
                        </div>
                        {/*Para el acceso al panel de control*/}
                        <Link to='/login' className="text-sm font-medium text-gray-400 hover:text-indigo-600 transition">
                            {t('admin')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar