import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'

const NavbarPanel = () => {
    // Se invoca el traductor
    const { t } = useTranslation()

    return (
        <nav className="bg-gray-900 shadow-sm py-4 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/admin" className="text-gray-300 hover:text-white text-sm font-medium transition flex items-center">
                    &larr; {t('return_admin')}
                </Link>
            </div>
        </nav>
    )
}

export default NavbarPanel