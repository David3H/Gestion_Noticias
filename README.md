# Gestion_Noticias
Sistema básico de gestión de noticias
##Gestor de Noticias 

##API (Backend)

API RESTful construida con Node.js y Express para la gestión de noticias multilenguaje (Español / Inglés).

##Tecnologías Utilizadas

* Runtime: Node.js
* Framework: Express.js
* Base de Datos: PostgreSQL (alojada en Supabase)
* Manejo de Imágenes: Multer (almacenamiento local efímero)
* Otras Librerías: `pg` (Pool de conexiones), `cors`, `dotenv`

##Prerrequisitos para ejecutar el backend

Es necesario:
* Node.js (v16 o superior)
* Una cuenta en (Supabase) para la base de datos PostgreSQL

##Configuración del Entorno

1. Clonar backend de este repositorio
2. Abrir en el editor de código preferido
3. En una terminal en la raíz del proyecto, 
   instalar las dependencias necesarias: npm install
4. Ejecutar el proyecto: node src/server.js

##Rutas de la API (Endpoints)
Método	Ruta	Descripción
GET	/	Obtiene todas las noticias.
GET	/:slug	Obtiene una noticia específica por su slug.
POST	/	Crea una nueva noticia (Requiere multipart/form-data).
PUT	/:id	Actualiza parcialmente una noticia.
DELETE	/:id	Elimina una noticia por su ID.
#Notas de mejoras
* Implementar un endpoint que consuma la API de DeepL o Google Cloud Translation para traducir automáticamente el contenido 
del español al inglés antes de la inserción, mejorando la UX del administrador al no tener que llenar ambos idiomas manualmente.

##Frontend

Construido con una arquitectura moderna orientada a la experiencia de usuario (UX), persistencia de estado y optimización de peticiones HTTP.

## Características Principales

### Interfaz Pública
* **Soporte Bilingüe Real (i18n):** Traducción dinámica de todo el sistema (Español/Inglés) con persistencia en `LocalStorage`.
* **Navegación Optimizada:** Uso de `state` en React Router para transiciones instantáneas entre rutas sin re-peticiones al servidor.
* **Skeleton UI:** Pantallas de carga con efectos de pulso para evitar cambios bruscos de diseño (Layout Shift).

### Panel de Administración
* **CRUD Completo:** Creación, lectura, actualización y eliminación de noticias.
* **Manejo de Archivos (Imágenes):** Integración con `FormData` para la subida y previsualización de imágenes.
* **Paginación Frontend:** Sistema de paginación limpio y matemático para listas extensas de registros.
* **Protección contra Errores:** Interceptores globales de Axios para captura de códigos HTTP (401, 500) y protección contra bucles infinitos.
* **Notificaciones y Modales:** Toasts asíncronos y modales de confirmación personalizados.

## Tecnologías Utilizadas

* **Core:** React, Vite
* **Enrutamiento:** React Router DOM
* **Estilos:** Tailwind CSS
* **Peticiones HTTP:** Axios
* **Internacionalización:** i18next, react-i18next
* **Alertas:** React Hot Toast

## Requisitos previos instalados en el sistema:

* Node.js (v18 o superior)
* npm o yarn

## Instalación y Ejecución

1. Clonar frontend de este repositorio
2. Abrir en el editor de código preferido
3. En una terminal en la raíz del proyecto, 
   instalar las dependencias necesarias: npm install
5. Configurar las variables de entorno .env
4. Ejecutar el proyecto: npm run dev
