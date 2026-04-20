import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Se recupera el idioma guardado, si no existe, se usa por defecto 'es'
const idiomaGuardado = localStorage.getItem('userLang') || 'es';

const resources = {
  es: {
    translation: {
      //Home
      "hero_title": "Últimas",
      "hero_title_highlight": "Noticias",
      "hero_subtitle": "Mantente al día con las noticias más importantes del mundo del desarrollo de software y la tecnología.",
      "read_more": "Leer noticia completo",
      "admin": "Panel de Control",
      //Detalle noticia
      "Back_news": "Volver a noticias",
      //Admin
      "login_title": "Acceso al Panel de",
      "administration": "Administración",
      "login_subtitle": "Ingresa la contraseña",
      "password_label": "Contraseña",
      "incorrect_password": "Contraseña incorrecta. Inténtalo de nuevo",
      "login_button": "Acceder",
      "return_home": "Volver a inicio",
      // Dashboard Admin
      "dashboard_title": "Gestión de Noticias",
      "dashboard_subtitle": "Lista de todas las noticias publicadas en el blog",
      "new_news_button": "Nueva Noticia",
      "table_title": "Título",
      "table_date": "Fecha",
      "table_status": "Estado",
      "table_actions": "Acciones",
      "edit": "Editar",
      "delete": "Eliminar",
      "logout": "Cerrar Sesión",
      "view_site": "Ver sitio",
      "news_available": "No hay noticias disponibles. ¡Crea la primera!",
      "published":"Publicado",
      "removed":"Eliminado",
      "delete_news": "¿Estás seguro de que deseas eliminar esta noticia definitivamente? Esta acción no se puede deshacer",
      //Crear noticia
      "valid_image": "Por favor, selecciona una imagen para la noticia",
      "valid_language_in": "Falta información: Se debes completar la noticia en el idioma Inglés antes de ser publicada",
      "valid_language_is": "",
      "create_new_news": "Crear Nueva Noticia",
      "requerid_info": "Completa la información requeridad",
      "general_info": "Datos Generales",
      "new_is": "Noticia en Español",
      "new_in": "Noticia en Inglés",
      "content":"Contenido",
      "principal_img": "Imagen Principal",
      "slug_generated": "Slug Generado",
      "self_generating":"Se auto-genera basado en el título de la noticia (es)",
      "save_new":"Guardar Noticia",
      "return_admin": "Volver al Administrador",
      //Editar noticia
      "edit_news": "Editar Noticia",
      "edit_info": "Modifique la información y guarda los cambios",
      "num_new":"Número de noticia:",
      "update_img": "Actualizar Imagen (Opcional)",
      "img_info": "Si no seleccionas nada, se mantendrá la imagen actual",
      "update_new_button":"Actualizar Noticia",
      //NotFound
      "title_not_found":"404 - Elemento no encontrada",
      "text_not_found": "El artículo que buscas no existe o ha sido eliminado",
      "before": "Anterior",
      "after": "Siguiente",
      "loading":"Cargando...",
      "page": "Página",
      "to": "de",
      "alert_slug": "Modificar esto podría romper los enlaces compartidos previamente",
      "cu_image": "Imagen Actual",
      "title": "Titulo",
      "cover_image":"Imagen de portada",
      "optional_change":"El cambio de imagen es opcional",
      //Modal
      "modal_delete_title": "Eliminar Noticia",
      "modal_delete_msg": "¿Estás seguro de que deseas eliminar esta noticia definitivamente? Esta acción no se puede deshacer",
      "cancel": "Cancelar",
      "confirm_delete": "Eliminar"
    }
  },
  en: {
    translation: {
      //Home
      "hero_title": "Latest",
      "hero_title_highlight": "News",
      "hero_subtitle": "Stay up to date with the latest news in software development and technology.",
      "read_more": "Read full story",
      "admin": "Dashboard",
      //Detalle noticia
      "Back_news": "Back to news",
      //Admin
      "login_title": "Admin Dashboard",
      "administration": "Access",
      "login_subtitle": "Enter the password",
      "password_label": "Password",
      "incorrect_password": "Incorrect password. Please try again",
      "login_button": "Access",
      "return_home": "Back to Home",
      // Admin Dashboard
      "dashboard_title": "News Management",
      "dashboard_subtitle": "List of all published blog posts",
      "new_news_button": "New Article",
      "table_title": "Title",
      "table_date": "Date",
      "table_status": "Status",
      "table_actions": "Actions",
      "edit": "Edit",
      "delete": "Delete",
      "logout": "Log Out",
      "view_site": "View site",
      "news_available": "No news available. Create the first one!",
      "published":"Published",
      "removed":"Removed",
      "delete_news": "Are you sure you want to delete this news post?",
      //Create news
      "valid_image": "Please select an image for this post",
      "valid_language_in": "Incomplete info: Please complete the English version before publishing",
      "valid_language_is": "Incomplete info: Please complete the Spanish version before publishing",
      "create_new_news": "Create New Post",
      "requerid_info": "Complete the required information",
      "general_info": "General Information",
      "new_is": "Spanish News Entry",
      "new_in": "English News Entry",
      "content":"Content",
      "principal_img": "Main Image",
      "slug_generated": "Slug Generated",
      "self_generating":"Auto-generates from the news title (ES)",
      "save_new":"Save News",
      "return_admin": "Back to Administrator",
      //Edit New
      "edit_news": "Edit News",
      "edit_info": "Edit info and save changes",
      "num_new":"News item number:",
      "update_img": "Update Image (Optional)",
      "img_info": "Leave blank to keep the current image",
      "update_new_button":"Update News",
      //NotFound
      "title_not_found":"404 - Item not found",
      "text_not_found": "This article is unavailable or has been removed",
      "before": "Before",
      "after": "After",
      "loading":"Loading...",
      "page": "Page",
      "to":"to",
      "alert_slug": "Modifying this could break previously shared links",
      "cu_image": "Current Image",
      "title": "Title",
      "cover_image":"Cover image",
      "optional_change":"The makeover is optional",
      //Modal
      "modal_delete_title": "Delete News",
      "modal_delete_msg": "Are you sure you want to permanently delete this article? This action cannot be undone",
      "cancel": "Cancel",
      "confirm_delete": "Delete"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: idiomaGuardado, // Idioma actual
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;