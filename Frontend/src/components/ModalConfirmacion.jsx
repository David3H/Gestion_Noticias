const ModalConfirmacion = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  titulo, 
  mensaje, 
  textoCancelar = "Cancelar", 
  textoConfirmar = "Eliminar" 
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-opacity px-4">
      
      {/* Caja del Modal */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all border border-gray-100">
        
        {/* Cabecera visual */}
        <div className="bg-red-50 p-6 flex flex-col items-center text-center border-b border-red-100">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{titulo}</h3>
        </div>

        {/* Cuerpo del mensaje */}
        <div className="p-6 text-center">
          <p className="text-sm text-gray-600">{mensaje}</p>
        </div>

        {/* Botones de acción */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition"
          >
            {textoCancelar}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 shadow-sm transition"
          >
            {textoConfirmar}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalConfirmacion;