# Logical_Reality_OS_v2.6 🖥️

## Interactive Developer Portfolio & Terminal Emulator

Este proyecto no es solo un portfolio; es una demostración de **Arquitectura Limpia** y **Diseño Modular** en React 19. Originalmente concebido como un monolito, fue refactorizado siguiendo principios de ingeniería de software para garantizar mantenibilidad, testabilidad y escalabilidad.

---

## 🏗️ Arquitectura del Sistema

El proyecto sigue una separación estricta de responsabilidades (SoC):

### 1. Capa de Lógica Pura (`/src/utils`)

Contiene funciones determinísticas (pure functions) que no dependen de React ni del navegador.

- **`calculateAge.js`**: Lógica de tiempo con soporte para años bisiestos.
- **`processCommand.js`**: Motor de comandos que utiliza el patrón **Action Descriptor** (retorna la intención de la acción sin ejecutarla).

### 2. Capa de Estado y Efectos (`/src/hooks`)

Encapsula el comportamiento y la sincronización de datos.

- **`useTerminal`**: Gestiona el historial y la entrada de comandos. Utiliza `useCallback` para optimización de renders.
- **`useGitHubRepos`**: Repository Pattern para el fetching de datos, manejando estados de carga y errores de API.
- **`useAge`**: Memoización de cálculos pesados para evitar re-procesamiento innecesario.

### 3. Capa de Presentación (`/src/components`)

Implementación de **Atomic Design** para componentes visuales puros:

- **Atoms**: `ProjectCard`, `Footer`, `Header`.
- **Molecules**: `ProjectList` (compone lógica de colección y carga).
- **Organisms**: `IdentityCard`, `TerminalWindow` (secciones complejas y autocontenidas).
- **Templates**: `App.jsx` actúa únicamente como orquestador (Layout).

---

## 🛡️ Red de Seguridad (Testing)

El proyecto cuenta con una suite de pruebas unitarias utilizando **Vitest** y **JSDom**.

- **Cobertura**: 100% de la lógica de negocio en `/utils`.
- **Enfoque**: Pruebas de comportamiento sobre implementaciones. Utilizamos `vi.useFakeTimers()` para garantizar que la lógica de tiempo sea determinística independientemente de cuándo se ejecuten los tests.

Para correr las pruebas:

```bash
npm test
```

---

## 🎨 Estética CRT (Cathode Ray Tube)

La interfaz utiliza una estética retro-futurista basada en terminales de los 80s y la estética de Fallout.

- **CSS puro**: Animaciones de scanlines y efectos de "flicker" movidos de la lógica de JS a `index.css` para optimización de performance y caché del navegador.
- **Glassmorphism**: Efectos de transparencia y bordes neón (`#00FF41`).

---

## 🚀 Tecnologías

- **React 19**: Aprovechando el nuevo JSX Transform.
- **Vite 8**: Bundler ultra-rápido.
- **TailwindCSS 4**: Sistema de diseño basado en utilidades.
- **Lucide React & React Icons**: Iconografía semántica.
- **Vitest**: Framework de testing de última generación.

---

## 🛠️ Instalación y Desarrollo

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Iniciar entorno de desarrollo: `npm run dev`
4. Ejecutar linter: `npm run lint`

---

## 📜 Licencia

Desarrollado por [LogicalReality](https://github.com/LogicalReality). 2026.
