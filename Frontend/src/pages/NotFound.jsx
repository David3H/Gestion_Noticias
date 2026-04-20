import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  // Se invoca el traductor
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('title_not_found')}</h1>
        <p className="text-gray-500 mb-6">{t('text_not_found')}</p>
        <Link to="/" className="text-indigo-600 hover:underline font-medium">
          &larr; {t('return_home')}
        </Link>
    </div>
  )
}

export default NotFound