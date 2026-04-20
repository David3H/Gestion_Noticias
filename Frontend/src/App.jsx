import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
// Páginas Públicas
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import NoticiaDetalle from './pages/NoticiaDetalle'
// Páginas Privadas
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import CrearNoticia from './pages/CrearNoticia'
import EditarNoticia from './pages/EditarNoticia'

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-right"
        toastOptions={{
          // Duración general para todos los toasts
          duration: 4000,
          // Configuración específica success
          success: {
            style: {
              background: '#10B981',
              color: 'white',
              fontWeight: '500',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#10B981',
            },
          },
          // Configuración específica para error
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
              fontWeight: '500',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#EF4444',
            },
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/noticia/:slug' element={<NoticiaDetalle />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={
          <ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
        <Route path='/admin/crear' element={
          <ProtectedRoute> <CrearNoticia /> </ProtectedRoute>} />
        <Route path='/admin/editar/:id' element={
          <ProtectedRoute> <EditarNoticia /> </ProtectedRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
