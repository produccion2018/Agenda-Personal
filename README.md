# NovaFlow Hub

Actúa como un Diseñador UI/UX Senior y Arquitecto Frontend experto. Necesito que diseñes y desarrolles una aplicación web frontend completa llamada "LifeSync Pro" utilizando React + Vite, con una estética visual extraordinaria, moderna, futurista y pulida, utilizando una paleta de colores basada en tonos violeta profundos, púrpuras, acentos de neón lavanda y modo oscuro elegante. No utilices textos genéricos (como "Lorem Ipsum") ni datos de relleno aburridos; todo debe tener nombres, tareas y ejemplos reales y cotidianos.

La aplicación debe ser puramente frontend y NO debe incluir conexiones reales a bases de datos, servidores de autenticación ni servicios externos de correo o notificaciones, ya que el backend, la autenticación con tokens y las APIs de recordatorios los desarrollaré y conectaré yo por mi cuenta. 

Lo que sí necesito que programes completamente funcional a nivel visual, de componentes y de interactividad en el cliente es lo siguiente:

1. Pantalla de Login y Registro Extraordinaria:

- Un formulario de inicio de sesión y registro con validaciones visuales, diseño glassmorphism y tonos violeta.

- Debe simular el almacenamiento de un token de acceso (ej. guardándolo en localStorage a nivel visual) para dar paso a la aplicación principal.

2. Dashboard Principal de Vida y Tareas ("LifeSync"):

- Un panel central sumamente organizado que actúe como un centro de control personal para trabajo, vida cotidiana, salud y compromisos.

- Secciones visuales claras para:

  * Tareas de proyectos y entregas con fechas límite (ej. "Entrega de proyecto el 28 de Noviembre").

  * Hábitos y salud diaria (ej. "Tomar agua", "Tomar pastilla diaria", "Ir al gimnasio").

  * Recordatorios de estilo de vida y sociales (ej. "Ir al cine el sábado", "Ir a la iglesia el domingo", pagos pendientes).

  * Simulación de bandeja de entrada de correos o notificaciones importantes que acaban de llegar ("¡Tienes un nuevo mail!").

3. Sistema de Alertas y Despertador Visual:

- Un componente flotante o modal de "Despertador / Alerta Activa" con diseño de pantalla completa o notificación inmersiva en tonos violeta que simule una alarma sonando o un recordatorio urgente de la hora ("Mauro, tienes que ir a tal lugar a tal hora"). Debe incluir un botón visual para posponer o descartar (dejando la estructura lista para que después yo conecte sonidos o alarmas reales).

4. Añadidos profesionales de valor (que se me podrían pasar):

- Un módulo de "Notas rápidas de voz o texto" para apuntar ideas al vuelo.

- Un indicador de nivel de energía o enfoque del día basado en cumplimiento de hábitos.

- Una barra lateral (Sidebar) retráctil y moderna con accesos directos al calendario, tareas, hábitos, configuración y perfil.

5. Estructura y Comentarios:

- Organiza el código en una estructura de carpetas limpia y modular (components, views, context, assets).

- Deja comentarios extremadamente claros en el código (por ejemplo: `// TODO: Conectar aquí la API de autenticación con Token`, `// TODO: Sincronizar recordatorios con el Backend`) para que después yo pueda integrar mi propio backend sin problemas.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fa421b32-2cfb-4e55-9857-81803dc05da7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
