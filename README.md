# AuthLab - Sistema de Autenticación

Un sistema completo de autenticación desarrollado con React, que incluye registro, inicio de sesión, perfil de usuario y protección de rutas.

## 🚀 Características

- **Registro de usuarios** con validación completa
- **Inicio de sesión** con manejo de tokens
- **Perfil de usuario** con información detallada
- **Protección de rutas** automática
- **Diseño moderno** inspirado en interfaces profesionales
- **Gestión de estado** con Context API
- **Hooks personalizados** para lógica reutilizable
- **Manejo de errores** robusto

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework principal
- **React Router DOM** - Navegación y protección de rutas
- **Tailwind CSS** - Estilos y diseño responsivo
- **Axios** - Cliente HTTP para API
- **js-cookie** - Manejo de cookies para tokens
- **Vite** - Herramienta de desarrollo

## 📁 Estructura del Proyecto

```
src/
├── features/
│   ├── auth/
│   │   ├── hooks/          # Hooks personalizados para autenticación
│   │   ├── services/       # Servicios de API
│   │   ├── pages/          # Páginas de login y registro
│   │   ├── context/        # Contexto de autenticación
│   │   └── components/     # Componentes específicos de auth
│   └── profile/
│       ├── hooks/          # Hooks para perfil
│       ├── services/       # Servicios de perfil
│       ├── pages/          # Página de perfil
│       └── components/     # Componentes de perfil
├── components/             # Componentes reutilizables
├── config/                 # Configuración de API
├── router.jsx             # Configuración de rutas
├── App.jsx                # Componente principal
└── main.jsx               # Punto de entrada
```

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd auth
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🌐 API Endpoints

### Base URL
```
https://reflexoperu-v3.marketingmedico.vip/backend/public/api/
```

### Endpoints Disponibles

#### 1. Registro de Usuario
- **POST** `/register`
- **Body:**
  ```json
  {
    "document_number": "7259991",
    "name": "Ciro",
    "paternal_lastname": "Flores",
    "maternal_lastname": "Torres",
    "email": "torres13@gmail.com",
    "phone": "9933701",
    "user_name": "TCiroF",
    "password": "12345678",
    "last_session": "2025-05-22",
    "account_statement": true,
    "document_type_id": 1,
    "country_id": 179
  }
  ```

#### 2. Inicio de Sesión
- **POST** `/login`
- **Body:**
  ```json
  {
    "email": "torres13@gmail.com",
    "password": "12345678"
  }
  ```
- **Respuesta:**
  ```json
  {
    "first_login": false,
    "message": "Login exitoso",
    "token": "1389|kNrwFaDIejd9R581InCfXc7d0IMtGhZdOvGKh2zIcc13d74a",
    "role": 1
  }
  ```

#### 3. Perfil de Usuario
- **GET** `/profile`
- **Headers:** `Authorization: Bearer <token>`

#### 4. Cerrar Sesión
- **DELETE** `/logout`
- **Headers:** `Authorization: Bearer <token>`

## 🎨 Diseño

El proyecto utiliza un diseño moderno inspirado en interfaces profesionales con:

- **Tipografía:** Poppins para una apariencia limpia y moderna
- **Colores:** Paleta naranja y púrpura para elementos principales
- **Layout:** Diseño dividido con formulario a la izquierda e ilustración a la derecha
- **Responsive:** Adaptable a diferentes tamaños de pantalla
- **Animaciones:** Transiciones suaves y efectos visuales

## 🔐 Seguridad

- **Tokens JWT** almacenados en cookies seguras
- **Interceptores Axios** para manejo automático de tokens
- **Protección de rutas** basada en autenticación
- **Validación de formularios** en cliente y servidor
- **Manejo de errores** centralizado

## 📱 Funcionalidades

### Página de Login
- Formulario de inicio de sesión
- Validación de campos
- Mostrar/ocultar contraseña
- Recordar sesión
- Enlace a registro

### Página de Registro
- Formulario completo de registro
- Validación de contraseñas
- Términos y condiciones
- Enlace a login

### Página de Perfil
- Información completa del usuario
- Datos personales y de contacto
- Información del documento
- Estado de la cuenta
- Botón de cerrar sesión

## 🚀 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run preview` - Vista previa de producción
- `npm run lint` - Verificación de código

## 📝 Notas de Desarrollo

- El proyecto utiliza **feature-based architecture** para mejor organización
- Los **hooks personalizados** encapsulan la lógica de negocio
- El **Context API** maneja el estado global de autenticación
- **Tailwind CSS** proporciona estilos consistentes y responsivos
- **React Router** con protección automática de rutas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ usando React y Tailwind CSS**