import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const adminPassword = 'admin123' //clave de acceso predefinida
  // Se invoca el traductor
  const { t } = useTranslation()
  //función para validar el inicio de sesión

  const handleLogin = (e) => {
    e.preventDefault()

    if (password === adminPassword) {
        localStorage.setItem('isAuth', 'true') //se almacena el nuevo estado en el localstorage
        setError(false)
        navigate('/admin')
    }else{
        setError(true)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/*Presentación */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                {t('login_title')} <span className="text-indigo-600">{t('administration')}</span>
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                {t('login_subtitle')}
            </p>
        </div>
        {/*Formulario de validacion contraseña */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            {t('password_label')}
                        </label>
                        <div className="mt-1">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`appearance-none block w-full px-3 py-2 border ${
                                error ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="••••••••"
                            />
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-600">
                            {t('incorrect_password')}
                            </p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white
                             bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            {t('login_button')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div className="mt-6">
            <div className="relative flex justify-center text-sm">
                <Link to="/" className="text-indigo-600 hover:underline font-medium">
                &larr; {t('return_home')}
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login