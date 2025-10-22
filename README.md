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
