# El kit Boost IA, pieza por pieza

> Este archivo se genera con `npm run kit:docs` a partir de `kit/catalogo.json`. No lo edites a mano.

Para la generación que egresa de Campuslands: esta es la forma en que trabajamos con IA, para que la hagas tuya.

## Antes de empezar: ¿qué es cada cosa?

- **IA de programación:** un programa como Claude Code, Codex o Antigravity que lee tu proyecto, escribe código y corre comandos por ti. El kit se instala dentro de ellas.
- **Skill:** un manual. Es una carpeta con un archivo `SKILL.md` que explica *cuándo* usarla y *cómo* hacer algo paso a paso. Tu IA la lee sola cuando tu pedido encaja; tú no tienes que nombrarla.
- **Agente:** un especialista. Es un archivo con su rol, sus reglas, sus herramientas y las skills que usa. Tu IA le delega tareas completas («revisa este código», «audita la seguridad»).
- **Vault de Obsidian:** la carpeta donde guardas tus notas. Los agentes del kit la leen para recordar lo que ya decidiste. El kit nunca crea notas por ti.
- **Kit de la comunidad:** skills abiertas de otras personas o empresas. No se copian a este repositorio: tu computadora las descarga de su repositorio original, con su licencia.

## Cómo trabajo

El orden importa más que la herramienta. Estos son los recorridos que sigo en cada tipo de trabajo:

### Una pantalla nueva (Frontend)

1. `brainstorming`: Aterrizo qué necesita la persona usuaria y cómo se verá.
2. `spec-driven-development`: Escribo la especificación y los criterios de «listo».
3. `fullstack-web-engineer`: Construye la pantalla con componentes tipados y accesibles.
4. `impeccable`: Pulo el diseño: jerarquía, tipografía, color y espaciado.
5. `testing-qa-sentinel`: La reviso en 390, 834 y 1512 px y con teclado.
6. `code-reviewer`: Revisión senior antes de fusionar la rama.

### Una API con datos (Backend)

1. `api-and-interface-design`: Diseño el contrato de la API antes de programarla.
2. `db-performance-engineer`: Modelo los datos, índices y seguridad por filas.
3. `test-driven-development`: Prueba primero, código después.
4. `fullstack-web-engineer`: Implementa los endpoints con validación en la frontera.
5. `security-auditor`: Busca huecos de autenticación, autorización y entradas.
6. `dokploy-cloud-ops`: Publica con Docker, HTTPS y chequeo de salud.

### Antes de publicar (Seguridad)

1. `security-auditor`: Revisión del código con OWASP y STRIDE.
2. `app-security-auditor`: Secretos, CORS, dependencias y configuración del servidor.
3. `deploy-preflight-checker`: Lista de verificación previa al despliegue.
4. `security-audit-expert`: Auditoría completa en seis fases cuando el proyecto lo amerita.

### Un video con IA (Video e imagen)

1. `video-director-cinematographer`: Ordeno la idea, elijo estilo y escribo el guion.
2. `prompt-director-cinematographer`: Prompts precisos para las tomas que hace la IA.
3. `higgsfield-generate`: Genero imágenes y clips (con confirmación, porque gasta créditos).
4. `ai-video-motion-director`: Armo el video con HyperFrames o Remotion, voz y subtítulos.
5. `video-asset-auditor`: Reviso los recursos antes del render final.

## Las áreas

| Área | Lema | Agentes | Skills |
|---|---|---|---|
| [Método](#metodo) | Pensar antes de teclear | 2 | 16 |
| [Frontend](#frontend) | Interfaces que se sienten bien | 2 | 17 |
| [Backend](#backend) | APIs, datos y servicios sólidos | 5 | 23 |
| [Calidad](#calidad) | Si no se probó, no está listo | 5 | 21 |
| [Seguridad](#seguridad) | Piensa como atacante | 5 | 4 |
| [Despliegue](#despliegue) | Publicar sin miedo | 2 | 12 |
| [Video e imagen](#video) | Producción audiovisual con IA | 4 | 18 |
| [Memoria y documentación](#memoria) | Lo que aprendes se queda | 2 | 2 |

<a id="metodo"></a>

## Método

**Pensar antes de teclear.** Cómo convierto una idea en un plan y un plan en código que funciona: preguntas, especificación, tareas pequeñas, pruebas y verificación.

Instalar el área completa: `npm run kit -- --area metodo`

### Agentes

| Agente | Qué hace | Pídelo así |
|---|---|---|
| **Líder del ciclo de ingeniería**<br>`engineering-lifecycle-lead` | Dirige una tarea de software de punta a punta en seis fases: definir, planear, construir, verificar, revisar y publicar. Úsalo cuando vas a construir algo que no es un cambio de una línea. | «Construye el módulo de reservas de principio a fin, con pruebas y revisión.» |
| **Líder de entrega de proyectos**<br>`project-delivery-lead` | Convierte una idea suelta en un plan ejecutable: hace las preguntas correctas, propone el alcance, arma el plan por tareas y da seguimiento hasta entregarlo. | «Tengo una idea para una app de tutorías. Ayúdame a convertirla en un plan.» |

### Skills

| Skill | Qué hace | Viene de |
|---|---|---|
| **Lluvia de ideas guiada**<br>`brainstorming` | Antes de construir, hace preguntas una a una, propone caminos y deja un diseño aprobado. Pídelo así: «Quiero una app para reservar canchas de fútbol en mi colonia. Ayúdame a aterrizarla.» | [Superpowers](https://github.com/obra/superpowers) |
| **Planes por tareas**<br>`writing-plans` | Convierte un diseño en un plan de tareas pequeñas, cada una con su prueba y su verificación. | [Superpowers](https://github.com/obra/superpowers) |
| **Ejecutar un plan**<br>`executing-plans` | Avanza el plan tarea por tarea, con puntos de control para revisar. | [Superpowers](https://github.com/obra/superpowers) |
| **Desarrollo con subagentes**<br>`subagent-driven-development` | Reparte las tareas de un plan entre subagentes y revisa cada entrega antes de seguir. | [Superpowers](https://github.com/obra/superpowers) |
| **Agentes en paralelo**<br>`dispatching-parallel-agents` | Lanza varios agentes a la vez cuando las tareas no dependen entre sí. | [Superpowers](https://github.com/obra/superpowers) |
| **Mapa de Agent Skills**<br>`using-agent-skills` | Índice que le dice a la IA qué skill del ciclo usar en cada momento. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Desarrollo por especificación**<br>`spec-driven-development` | Escribe la especificación (objetivo, alcance, criterios) antes del código. Pídelo así: «Escribe la especificación del módulo de inventario antes de programarlo.» | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Refinar una idea**<br>`idea-refine` | Afila una idea vaga hasta que tenga problema, público y propuesta claros. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Entrevístame**<br>`interview-me` | La IA te entrevista para sacar los requisitos que tienes en la cabeza. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Partir en tareas**<br>`planning-and-task-breakdown` | Divide el trabajo en tareas verificables y en el orden correcto. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Ingeniería de contexto**<br>`context-engineering` | Le da a la IA solo el contexto que necesita para no perderse. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Implementación incremental**<br>`incremental-implementation` | Construye en rebanadas finas que siempre dejan el proyecto funcionando. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Basado en la documentación**<br>`source-driven-development` | Consulta la documentación oficial antes de usar una librería, en vez de adivinar. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Desarrollo con duda**<br>`doubt-driven-development` | Cuestiona las suposiciones antes de darlas por ciertas. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Desarrollo por restricciones**<br>`constraint-driven-development` | Diseña a partir de los límites reales: tiempo, costo, plataforma. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Crear skills**<br>`skill-creator` | Te guía para crear y mejorar tus propias skills. | [Skills de Anthropic](https://github.com/anthropics/skills) |

<a id="frontend"></a>

## Frontend

**Interfaces que se sienten bien.** Diseño e implementación de interfaces con React, Vite, shadcn/ui y Tailwind, cuidando accesibilidad, rendimiento y un diseño con criterio.

Instalar el área completa: `npm run kit -- --area frontend`

### Agentes

| Agente | Qué hace | Pídelo así |
|---|---|---|
| **Ingeniero web fullstack**<br>`fullstack-web-engineer` | Construye aplicaciones web completas con TypeScript: interfaz en React y Vite con shadcn/ui y Tailwind, formularios con React Hook Form y Zod, y backend en Node, Express o Supabase. | «Crea el formulario de registro con validación y su endpoint en Express.» |
| **Ingeniero de apps móviles**<br>`mobile-app-engineer` | Desarrolla y compila apps móviles con React Native y Expo para iOS y Android, cuidando fluidez, almacenamiento seguro y las guías de diseño de cada plataforma. | «Haz la pantalla de perfil de la app en Expo.» |

### Skills

| Skill | Qué hace | Viene de |
|---|---|---|
| **Ingeniería de interfaces**<br>`frontend-ui-engineering` | Componentes, estado, accesibilidad y rendimiento en el frontend. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Diseño frontend con criterio**<br>`frontend-design` | Interfaces con dirección visual propia, lejos del diseño genérico de IA. Pídelo así: «Diseña la página de inicio de una cafetería en Antigua con personalidad.» | [Skills de Anthropic](https://github.com/anthropics/skills) |
| **Impeccable**<br>`impeccable` | Diseño de alto nivel: auditar, criticar, pulir, tipografía, color, espaciado y jerarquía. Pídelo así: «Audita el diseño de este dashboard y púlelo.» | [Impeccable](https://github.com/pbakaus/impeccable) |
| **Buenas prácticas de React**<br>`vercel-react-best-practices` | Rendimiento y patrones de React y Next.js según Vercel. | [Agent Skills de Vercel](https://github.com/vercel-labs/agent-skills) |
| **Composición de componentes**<br>`vercel-composition-patterns` | Componentes flexibles sin montones de props booleanas. | [Agent Skills de Vercel](https://github.com/vercel-labs/agent-skills) |
| **React Native**<br>`vercel-react-native-skills` | Buenas prácticas para apps móviles con React Native y Expo. | [Agent Skills de Vercel](https://github.com/vercel-labs/agent-skills) |
| **Guías de diseño web**<br>`web-design-guidelines` | Revisa una interfaz contra las guías de interfaz web de Vercel. | [Agent Skills de Vercel](https://github.com/vercel-labs/agent-skills) |
| **Vite**<br>`vite` | Configuración y uso de Vite desde su documentación oficial. | [Skills de Anthony Fu](https://github.com/antfu/skills) |
| **Accesibilidad**<br>`accessibility` | WCAG en la práctica: teclado, contraste, lectores de pantalla. | [Web Quality Skills](https://github.com/addyosmani/web-quality-skills) |
| **SEO**<br>`seo` | Metadatos, datos estructurados y buenas prácticas para buscadores. | [Web Quality Skills](https://github.com/addyosmani/web-quality-skills) |
| **shadcn/ui**<br>`shadcn` | Agregar y personalizar componentes de shadcn/ui. Pídelo así: «Agrega una tabla con filtros usando shadcn/ui.» | [shadcn/ui](https://github.com/shadcn-ui/ui) |
| **UI UX Pro Max**<br>`ui-ux-pro-max` | Elige estilo, paleta y tipografía con criterio para tu tipo de producto. | [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| **Patrones de Tailwind**<br>`tailwind-css-patterns` | Clases ordenadas, diseño responsive y componentes consistentes. | [Developer Kit](https://github.com/giuseppe-trisciuoglio/developer-kit) |
| **React Hook Form**<br>`react-hook-form` | Formularios rápidos y accesibles. | [dot-skills](https://github.com/pproenca/dot-skills) |
| **Zod**<br>`zod` | Validación con tipos para formularios, APIs y variables de entorno. | [dot-skills](https://github.com/pproenca/dot-skills) |
| **TypeScript avanzado**<br>`typescript-advanced-types` | Genéricos, tipos condicionales y utilidades para código tipado de verdad. | [Agents de wshobson](https://github.com/wshobson/agents) |
| **Construir un design system**<br>`design-system-builder` | Tokens, componentes, escalas y documentación de un sistema de diseño. | Campuslands |

<a id="backend"></a>

## Backend

**APIs, datos y servicios sólidos.** APIs en Node, bases de datos, Supabase, Firebase, pagos, automatizaciones e integración de modelos de IA.

Instalar el área completa: `npm run kit -- --area backend`

### Agentes

| Agente | Qué hace | Pídelo así |
|---|---|---|
| **Ingeniero de Firebase**<br>`firebase-platform-engineer` | Implementa proyectos sobre Firebase: Authentication, Firestore, Cloud Functions, Hosting, App Hosting, Remote Config y reglas de seguridad con pruebas. | «Configura Firestore con reglas para que cada usuario vea solo sus datos.» |
| **Ingeniero de pagos**<br>`payments-commerce-engineer` | Integra cobros con Stripe: checkout, suscripciones, webhooks y facturación recurrente, con manejo seguro de eventos y sin guardar datos de tarjetas. | «Agrega suscripción mensual con Stripe en modo de prueba.» |
| **Ingeniero de automatizaciones n8n**<br>`automation-n8n-engineer` | Diseña y mantiene flujos de automatización en n8n: nodos, expresiones, código en JavaScript o Python, manejo de errores y extracción de datos web de forma ética. | «Arma un flujo en n8n que guarde los formularios nuevos en una hoja de cálculo.» |
| **Ingeniero de APIs de IA**<br>`genai-api-engineer` | Integra modelos de IA en aplicaciones por API (Gemini, OpenAI, Claude): salidas estructuradas, streaming, imágenes, reintentos y control de costos. | «Agrega a mi app un resumen automático con la API de Gemini.» |
| **Ingeniero de bases de datos**<br>`db-performance-engineer` | Diseña y optimiza bases de datos PostgreSQL, Supabase y Redis: modelo de datos, índices, consultas lentas, seguridad por filas (RLS) y respaldos. | «Esta consulta tarda 4 segundos. Optimízala.» |

### Skills

| Skill | Qué hace | Viene de |
|---|---|---|
| **Diseño de APIs**<br>`api-and-interface-design` | Contratos de API claros, versionables y difíciles de usar mal. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Supabase**<br>`supabase` | Auth, base de datos, almacenamiento y funciones en Supabase. | [Skills de Supabase](https://github.com/supabase/agent-skills) |
| **PostgreSQL con Supabase**<br>`supabase-postgres-best-practices` | Índices, RLS y consultas con las recomendaciones oficiales. | [Skills de Supabase](https://github.com/supabase/agent-skills) |
| **Firebase: lo básico**<br>`firebase-basics` | Arrancar un proyecto Firebase con el CLI. | [Skills de Firebase](https://github.com/firebase/agent-skills) |
| **Firebase Authentication**<br>`firebase-auth-basics` | Inicio de sesión con correo, Google y más. | [Skills de Firebase](https://github.com/firebase/agent-skills) |
| **Cloud Firestore**<br>`firebase-firestore` | Modelo de datos y consultas en Firestore. | [Skills de Firebase](https://github.com/firebase/agent-skills) |
| **Stripe**<br>`stripe-best-practices` | Integraciones de pago con las buenas prácticas de Stripe. | [Skills de Stripe](https://github.com/stripe/ai) |
| **Patrones de flujos n8n**<br>`n8n-workflow-patterns` | Arquitecturas probadas para flujos de n8n. | [n8n Skills](https://github.com/czlonkowski/n8n-skills) |
| **Configurar nodos n8n**<br>`n8n-node-configuration` | Parámetros correctos de cada nodo. | [n8n Skills](https://github.com/czlonkowski/n8n-skills) |
| **Expresiones n8n**<br>`n8n-expression-syntax` | Sintaxis de expresiones sin errores. | [n8n Skills](https://github.com/czlonkowski/n8n-skills) |
| **Código JavaScript en n8n**<br>`n8n-code-javascript` | El nodo Code en JavaScript. | [n8n Skills](https://github.com/czlonkowski/n8n-skills) |
| **Código Python en n8n**<br>`n8n-code-python` | El nodo Code en Python. | [n8n Skills](https://github.com/czlonkowski/n8n-skills) |
| **Validar flujos n8n**<br>`n8n-validation-expert` | Interpreta y corrige errores de validación. | [n8n Skills](https://github.com/czlonkowski/n8n-skills) |
| **Herramientas MCP de n8n**<br>`n8n-mcp-tools-expert` | Usa el servidor MCP de n8n. | [n8n Skills](https://github.com/czlonkowski/n8n-skills) |
| **API de Gemini**<br>`gemini-api-dev` | Desarrollo con la API de Gemini: texto, imágenes y salidas estructuradas. | [Skills de Gemini](https://github.com/google-gemini/gemini-skills) |
| **Firebase Remote Config**<br>`firebase-remote-config-basics` | Cambiar el comportamiento de la app sin publicar otra versión. | [Skills de Firebase](https://github.com/firebase/agent-skills) |
| **Firebase AI Logic**<br>`firebase-ai-logic-basics` | Gemini desde la app con Firebase. | [Skills de Firebase](https://github.com/firebase/agent-skills) |
| **Firebase Data Connect**<br>`firebase-data-connect` | PostgreSQL administrado con GraphQL en Firebase. | [Skills de Firebase](https://github.com/firebase/agent-skills) |
| **Actualizar Stripe**<br>`upgrade-stripe` | Migrar a versiones nuevas de la API de Stripe. | [Skills de Stripe](https://github.com/stripe/ai) |
| **Herramientas de código en n8n**<br>`n8n-code-tool` | Nodos de herramienta con código para agentes de n8n. | [n8n Skills](https://github.com/czlonkowski/n8n-skills) |
| **Patrones de backend en Node**<br>`nodejs-backend-patterns` | Capas, errores, validación y estructura de un backend en Node. | [Agents de wshobson](https://github.com/wshobson/agents) |
| **Servidor Express**<br>`nodejs-express-server` | Un servidor Express bien armado: rutas, middleware y errores. | [Useful AI Prompts](https://github.com/aj-geddes/useful-ai-prompts) |
| **PostgreSQL en Docker**<br>`postgres-docker-devops-doc` | Documenta y prepara PostgreSQL en Docker: respaldos, restauración y entrega. | Campuslands |

<a id="calidad"></a>

## Calidad

**Si no se probó, no está listo.** Pruebas automáticas, revisión de código, depuración de causa raíz y rendimiento medido.

Instalar el área completa: `npm run kit -- --area calidad`

### Agentes

| Agente | Qué hace | Pídelo así |
|---|---|---|
| **Revisor de código**<br>`code-reviewer` | Revisa cambios como un ingeniero senior en cinco dimensiones: corrección, legibilidad, arquitectura, seguridad y rendimiento, con un veredicto claro y sugerencias concretas. | «Revisa los cambios de esta rama antes de fusionar.» |
| **Depurador de causa raíz**<br>`root-cause-debugger` | Encuentra la causa real de un error difícil: lo reproduce, plantea hipótesis, instrumenta el código y prueba la corrección sin parches a ciegas. | «Las imágenes no cargan solo en Safari. Encuentra por qué.» |
| **Ingeniero de pruebas**<br>`test-engineer` | Diseña y escribe pruebas automáticas con TDD: unitarias con Vitest y de punta a punta con Playwright, y demuestra un error con una prueba antes de arreglarlo. | «Escribe las pruebas del carrito de compras.» |
| **Centinela de calidad**<br>`testing-qa-sentinel` | Verifica en modo solo lectura que una pantalla o función esté lista: pruebas, revisión visual en tres anchos (390, 834 y 1512 px) y accesibilidad. | «Verifica que la pantalla de pagos esté lista para publicar.» |
| **Auditor de rendimiento web**<br>`web-performance-auditor` | Mide y mejora la velocidad de un sitio: Core Web Vitals (LCP, INP, CLS), tiempo de carga, peso del JavaScript y red. | «Mi página tarda en cargar en el celular. Mide y dime qué mejorar.» |

### Skills

| Skill | Qué hace | Viene de |
|---|---|---|
| **Depuración sistemática**<br>`systematic-debugging` | Encuentra la causa raíz con hipótesis y evidencia antes de proponer un arreglo. Pídelo así: «El login falla solo en producción. Encuentra la causa.» | [Superpowers](https://github.com/obra/superpowers) |
| **Desarrollo guiado por pruebas**<br>`test-driven-development` | Rojo, verde, refactor: primero la prueba que falla, luego el código mínimo que la pasa. | [Superpowers](https://github.com/obra/superpowers) |
| **Verificar antes de entregar**<br>`verification-before-completion` | Prohíbe decir «listo» sin haber corrido las pruebas y visto el resultado. | [Superpowers](https://github.com/obra/superpowers) |
| **Pedir revisión**<br>`requesting-code-review` | Prepara el cambio para que otro lo revise con contexto. | [Superpowers](https://github.com/obra/superpowers) |
| **Recibir revisión**<br>`receiving-code-review` | Atiende comentarios de revisión con rigor técnico, sin aceptar a ciegas. | [Superpowers](https://github.com/obra/superpowers) |
| **Revisión y calidad**<br>`code-review-and-quality` | Revisión de código en cinco dimensiones con veredicto claro. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Simplificar código**<br>`code-simplification` | Quita complejidad sin cambiar el comportamiento. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Depurar y recuperarse**<br>`debugging-and-error-recovery` | Qué hacer cuando algo falla: aislar, reproducir y corregir. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Probar en el navegador**<br>`browser-testing-with-devtools` | Verifica la interfaz real con DevTools: consola, red y rendimiento. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Optimizar rendimiento**<br>`performance-optimization` | Mide, encuentra el cuello de botella y mejora con números. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Observabilidad**<br>`observability-and-instrumentation` | Logs, métricas y trazas para saber qué pasa en producción. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Playwright**<br>`playwright` | Pruebas de punta a punta en el navegador. | [Skills de OpenAI](https://github.com/openai/skills) |
| **Vitest**<br>`vitest` | Pruebas unitarias rápidas con Vitest. | [Skills de Anthony Fu](https://github.com/antfu/skills) |
| **Navegador para agentes**<br>`agent-browser` | La IA abre tu app, hace clic, llena formularios y toma capturas. Pídelo así: «Abre localhost:5173 y prueba el registro de usuarios.» | [agent-browser](https://github.com/vercel-labs/agent-browser) |
| **Chrome DevTools**<br>`chrome-devtools` | Depuración con las herramientas de Chrome. | [Chrome DevTools para agentes](https://github.com/ChromeDevTools/chrome-devtools-mcp) |
| **Optimizar LCP**<br>`debug-optimize-lcp` | Encuentra por qué tarda en aparecer lo principal de la página. | [Chrome DevTools para agentes](https://github.com/ChromeDevTools/chrome-devtools-mcp) |
| **Fugas de memoria**<br>`memory-leak-debugging` | Encuentra y corrige fugas de memoria. | [Chrome DevTools para agentes](https://github.com/ChromeDevTools/chrome-devtools-mcp) |
| **Depurar accesibilidad**<br>`a11y-debugging` | Problemas de accesibilidad vistos en el navegador. | [Chrome DevTools para agentes](https://github.com/ChromeDevTools/chrome-devtools-mcp) |
| **Diagnóstico de DevTools**<br>`troubleshooting` | Cuando la conexión con DevTools falla. | [Chrome DevTools para agentes](https://github.com/ChromeDevTools/chrome-devtools-mcp) |
| **Firebase Crashlytics**<br>`firebase-crashlytics` | Reportes de errores de apps móviles. | [Skills de Firebase](https://github.com/firebase/agent-skills) |
| **Modo depuración**<br>`debug-mode` | Hipótesis, logs temporales y verificación para errores difíciles. | [Debug Mode](https://github.com/doraemonkeys/claude-code-debug-mode) |

<a id="seguridad"></a>

## Seguridad

**Piensa como atacante.** Revisión de seguridad durante el desarrollo, auditoría antes de publicar y auditorías completas con metodología profesional.

Instalar el área completa: `npm run kit -- --area seguridad`

### Agentes

| Agente | Qué hace | Pídelo así |
|---|---|---|
| **Auditor de seguridad**<br>`security-auditor` | Revisa el código en busca de vulnerabilidades explotables con OWASP Top 10 y modelado de amenazas STRIDE, y propone la corrección exacta. | «Revisa la seguridad del módulo de usuarios.» |
| **Auditor de seguridad de la app publicada**<br>`app-security-auditor` | Revisa en modo solo lectura lo que rodea a la app antes de publicarla: secretos expuestos, CORS, separación de datos entre clientes, dependencias y configuración de Docker o Nginx. | «Antes de publicar, busca secretos expuestos y revisa CORS.» |
| **Auditor experto en seguridad**<br>`security-audit-expert` | Hace una auditoría de seguridad completa y defensiva en seis fases con la metodología de Cloudflare: reconocimiento, búsqueda, verificación independiente, validación, segunda revisión e informe. | «Haz una auditoría de seguridad completa del repositorio.» |
| **Rol research de security-audit**<br>`research` | Rol de solo lectura que la skill security-audit usa para reconocer el código y verificar candidatos. No se usa fuera de una auditoría. |  |
| **Rol general de security-audit**<br>`general` | Rol aislado que la skill security-audit usa para buscar y verificar hallazgos con ejecución en un entorno aislado. No se usa fuera de una auditoría. |  |

### Skills

| Skill | Qué hace | Viene de |
|---|---|---|
| **Seguridad y endurecimiento**<br>`security-and-hardening` | OWASP, entradas, autenticación, secretos y dependencias. Pídelo así: «Revisa la seguridad de mi API de usuarios.» | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Auditor de reglas de Firebase**<br>`firebase-security-rules-auditor` | Revisa reglas de seguridad de Firestore y Storage. | [Skills de Firebase](https://github.com/firebase/agent-skills) |
| **Auditoría de seguridad**<br>`security-audit` | Auditoría completa en seis fases con verificación independiente de cada hallazgo. Pídelo así: «Haz una auditoría de seguridad completa de este repositorio.» | [Security Audit](https://github.com/cloudflare/security-audit-skill) |
| **Crear reglas de Firestore**<br>`firestore-rules-creation` | Reglas de seguridad de Firestore desde cero, con pruebas. | [Skills de Firebase](https://github.com/firebase/agent-skills) |

<a id="despliegue"></a>

## Despliegue

**Publicar sin miedo.** Git ordenado por ramas, integración continua y publicación en servidores propios o en Vercel.

Instalar el área completa: `npm run kit -- --area despliegue`

### Agentes

| Agente | Qué hace | Pídelo así |
|---|---|---|
| **Ingeniero de despliegue**<br>`dokploy-cloud-ops` | Publica aplicaciones en servidores propios con Docker, Dokploy y Traefik (o en Vercel), con HTTPS, chequeos de salud y despliegues sin cortes. | «Publica esta API en mi servidor con Docker y HTTPS.» |
| **Verificador previo al despliegue**<br>`deploy-preflight-checker` | Revisa, sin cambiar nada, que todo esté listo para publicar: variables de entorno, chequeo de salud, puertos, secretos y certificados. | «¿Está listo este proyecto para publicarse?» |

### Skills

| Skill | Qué hace | Viene de |
|---|---|---|
| **Worktrees de Git**<br>`using-git-worktrees` | Trabaja varias ramas a la vez en carpetas separadas sin mezclar cambios. | [Superpowers](https://github.com/obra/superpowers) |
| **Cerrar una rama**<br>`finishing-a-development-branch` | Decide cómo integrar el trabajo terminado: fusionar, abrir PR o limpiar. | [Superpowers](https://github.com/obra/superpowers) |
| **CI/CD**<br>`ci-cd-and-automation` | Pruebas y despliegues automáticos en cada cambio. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Flujo de Git**<br>`git-workflow-and-versioning` | Ramas, commits claros y versiones. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Publicar y lanzar**<br>`shipping-and-launch` | Lista de verificación para salir a producción sin sorpresas. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Migraciones**<br>`deprecation-and-migration` | Cambiar o retirar algo sin romper a quien lo usa. | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Firebase Hosting**<br>`firebase-hosting-basics` | Publicar sitios estáticos en Firebase. | [Skills de Firebase](https://github.com/firebase/agent-skills) |
| **Firebase App Hosting**<br>`firebase-app-hosting-basics` | Publicar apps con servidor en Firebase. | [Skills de Firebase](https://github.com/firebase/agent-skills) |
| **Publicar en Vercel**<br>`deploy-to-vercel` | Despliega en Vercel paso a paso. | [Agent Skills de Vercel](https://github.com/vercel-labs/agent-skills) |
| **Vercel CLI con tokens**<br>`vercel-cli-with-tokens` | Desplegar en Vercel desde la terminal o CI con tokens. | [Agent Skills de Vercel](https://github.com/vercel-labs/agent-skills) |
| **Commits con convención**<br>`commit-push-convention` | Commits con formato feat(pantalla) o fix(pantalla) y push ordenado. Pídelo así: «Haz commit y push de estos cambios con la convención.» | Campuslands |
| **DNS en Cloudflare**<br>`cloudflare-dns` | Registros DNS en Cloudflare para tus dominios y servicios. | Campuslands |

<a id="video"></a>

## Video e imagen

**Producción audiovisual con IA.** Videos hechos con código (HyperFrames y Remotion), imágenes y clips con IA (Higgsfield), voz y música (ElevenLabs).

Instalar el área completa: `npm run kit -- --area video`

### Agentes

| Agente | Qué hace | Pídelo así |
|---|---|---|
| **Director de video**<br>`video-director-cinematographer` | Ordena una idea desordenada en un video bien dirigido: detecta qué falta, elige el estilo y el motor (HyperFrames, Remotion, Higgsfield o Veo) y arma el guion técnico. | «Quiero un video de 30 segundos para presentar mi proyecto final.» |
| **Director de prompts de imagen y video**<br>`prompt-director-cinematographer` | Escribe prompts precisos para generar imágenes y video con IA (Higgsfield, Veo, Flow): cámara, luz, movimiento, consistencia de personaje y lo que no debe aparecer. | «Escríbeme el prompt para un clip del lago de Atitlán al amanecer.» |
| **Director técnico de animación**<br>`ai-video-motion-director` | Produce y renderiza videos con código: HyperFrames (HTML determinista) o Remotion (React), con subtítulos, música y voz de ElevenLabs, e imágenes o clips de Higgsfield. | «Produce el video con este guion y súbele subtítulos.» |
| **Auditor de recursos de video**<br>`video-asset-auditor` | Revisa, sin cambiar nada, que imágenes, clips, audio y subtítulos estén listos antes de renderizar: resolución, proporción, pistas de audio y tiempos. | «Revisa que los clips y el audio estén listos para renderizar.» |

### Skills

| Skill | Qué hace | Viene de |
|---|---|---|
| **Generar imágenes**<br>`imagegen` | Generación y edición de imágenes con la API de OpenAI. | [Skills de OpenAI](https://github.com/openai/skills) |
| **HyperFrames**<br>`hyperframes` | Punto de entrada para cualquier video con HyperFrames: promos, explicativos, subtítulos, gráficos animados y más (sus guías vienen dentro). Pídelo así: «Haz un video de 20 segundos que presente mi portafolio.» | [HyperFrames](https://github.com/heygen-com/hyperframes) |
| **HyperFrames: CLI**<br>`hyperframes-cli` | Previsualizar, validar y renderizar desde la terminal. | [HyperFrames](https://github.com/heygen-com/hyperframes) |
| **HyperFrames: registro**<br>`hyperframes-registry` | Bloques y componentes listos para usar. | [HyperFrames](https://github.com/heygen-com/hyperframes) |
| **Presentación animada**<br>`slideshow` | Diapositivas que se convierten en video. | [HyperFrames](https://github.com/heygen-com/hyperframes) |
| **De Remotion a HyperFrames**<br>`remotion-to-hyperframes` | Migra composiciones de Remotion. | [HyperFrames](https://github.com/heygen-com/hyperframes) |
| **Uso de medios**<br>`media-use` | Imágenes, clips y audio dentro de un video. | [HyperFrames](https://github.com/heygen-com/hyperframes) |
| **Remotion**<br>`remotion-best-practices` | Videos programados con React. Pídelo así: «Haz un intro animado de 5 segundos en Remotion.» | [Remotion Skills](https://github.com/remotion-dev/skills) |
| **Generar con Higgsfield**<br>`higgsfield-generate` | Imágenes, video, 3D y audio con los modelos de Higgsfield. Pídelo así: «Genera una foto de producto de mi taza con fondo de estudio.» | [Higgsfield Skills](https://github.com/higgsfield-ai/skills) |
| **Personaje consistente**<br>`higgsfield-soul-id` | Entrena un personaje para que salga igual en todas las tomas. | [Higgsfield Skills](https://github.com/higgsfield-ai/skills) |
| **Sesión de fotos de producto**<br>`higgsfield-product-photoshoot` | Fotos de estudio y estilo de vida para un producto. | [Higgsfield Skills](https://github.com/higgsfield-ai/skills) |
| **Tarjetas para tiendas en línea**<br>`higgsfield-marketplace-cards` | Imágenes de producto listas para Amazon, Mercado Libre y otras tiendas. | [Higgsfield Skills](https://github.com/higgsfield-ai/skills) |
| **Texto a voz**<br>`text-to-speech` | Locuciones naturales en español y otros idiomas. Pídelo así: «Convierte este guion en una locución con voz cálida.» | [ElevenLabs Skills](https://github.com/elevenlabs/skills) |
| **Música con IA**<br>`music` | Pistas musicales a la medida de tu video. | [ElevenLabs Skills](https://github.com/elevenlabs/skills) |
| **Efectos de sonido**<br>`sound-effects` | Efectos a partir de una descripción. | [ElevenLabs Skills](https://github.com/elevenlabs/skills) |
| **Voz a texto**<br>`speech-to-text` | Transcribe audio y video con marcas de tiempo. | [ElevenLabs Skills](https://github.com/elevenlabs/skills) |
| **Prompts para video con IA**<br>`video-prompt-engineering` | Estructura, lenguaje de cámara y refinamiento de prompts para Higgsfield, Runway, Kling y más. | Campuslands |
| **Continuidad visual**<br>`video-continuity` | Mismo personaje, estilo y color en todos los clips de una campaña. | Campuslands |

<a id="memoria"></a>

## Memoria y documentación

**Lo que aprendes se queda.** Tu memoria en Obsidian, el grafo de tu código y diagramas que explican la arquitectura.

Instalar el área completa: `npm run kit -- --area memoria`

### Agentes

| Agente | Qué hace | Pídelo así |
|---|---|---|
| **Explorador del código**<br>`codebase-scout` | Explora un repositorio en modo solo lectura y devuelve un resumen corto: dónde está cada cosa, cómo se conecta y qué archivos importan para la tarea. | «¿Dónde se valida el inicio de sesión en este proyecto?» |
| **Arquitecto de diagramas**<br>`editorial-diagram-architect` | Convierte arquitecturas, flujos y procesos en diagramas limpios en HTML y SVG con diagram-design, listos para guardar en el vault de Obsidian de la persona. | «Haz el diagrama de la arquitectura de mi proyecto.» |

### Skills

| Skill | Qué hace | Viene de |
|---|---|---|
| **Documentación y decisiones**<br>`documentation-and-adrs` | README útil y registros de decisiones de arquitectura (ADR). | [Agent Skills](https://github.com/addyosmani/agent-skills) |
| **Diagramas editoriales**<br>`diagram-design` | Arquitecturas y flujos como diagramas limpios en HTML y SVG. Pídelo así: «Dibuja la arquitectura de mi app: frontend, API y base de datos.» | [Diagram Design](https://github.com/cathrynlavery/diagram-design) |

## Gracias a la comunidad

| Kit | Autor | Licencia | Skills | Qué aporta |
|---|---|---|---|---|
| [Superpowers](https://github.com/obra/superpowers) | Jesse Vincent | MIT | 12 | Le da método a la IA: pregunta antes de construir, planea por tareas, depura con sistema y verifica antes de decir «listo». |
| [Agent Skills](https://github.com/addyosmani/agent-skills) | Addy Osmani | MIT | 24 | El ciclo completo de ingeniería de un equipo senior: especificar, planear, construir, verificar, revisar y publicar. |
| [Skills de Anthropic](https://github.com/anthropics/skills) | Anthropic | Apache-2.0 | 2 | Skills oficiales de Anthropic: diseño de interfaces con criterio y creación de nuevas skills. |
| [Impeccable](https://github.com/pbakaus/impeccable) | Paul Bakaus | Apache-2.0 | 1 | Diseño de interfaces sin estética genérica de IA: auditar, pulir, tipografía, color y jerarquía. |
| [Agent Skills de Vercel](https://github.com/vercel-labs/agent-skills) | Vercel | MIT | 6 | Buenas prácticas de React y Next.js, composición de componentes, guías de diseño web y despliegue en Vercel. |
| [agent-browser](https://github.com/vercel-labs/agent-browser) | Vercel Labs | Apache-2.0 | 1 | Un navegador que la IA controla para probar tu app: abrir, hacer clic, llenar formularios y tomar capturas. |
| [Skills de Anthony Fu](https://github.com/antfu/skills) | Anthony Fu | MIT | 2 | Skills generadas desde la documentación oficial de Vite y Vitest. |
| [Web Quality Skills](https://github.com/addyosmani/web-quality-skills) | Addy Osmani | MIT | 2 | Accesibilidad y SEO revisados con las guías de calidad web. |
| [Skills de Supabase](https://github.com/supabase/agent-skills) | Supabase | MIT | 2 | Supabase y PostgreSQL con las recomendaciones oficiales: RLS, índices y consultas. |
| [Skills de Firebase](https://github.com/firebase/agent-skills) | Firebase (Google) | Apache-2.0 | 11 | Skills oficiales de Firebase: Auth, Firestore, Hosting, reglas de seguridad y más. |
| [Chrome DevTools para agentes](https://github.com/ChromeDevTools/chrome-devtools-mcp) | Chrome DevTools (Google) | Apache-2.0 | 5 | Depurar como en DevTools: rendimiento, LCP, fugas de memoria y accesibilidad. |
| [Skills de Stripe](https://github.com/stripe/ai) | Stripe | MIT | 2 | Integraciones de pago con las buenas prácticas oficiales de Stripe. |
| [n8n Skills](https://github.com/czlonkowski/n8n-skills) | Romuald Członkowski | MIT | 8 | Construir flujos de n8n sin errores: nodos, expresiones, código y validación. |
| [Skills de OpenAI](https://github.com/openai/skills) | OpenAI | Apache-2.0 | 2 | Pruebas con Playwright y generación de imágenes. |
| [Skills de Gemini](https://github.com/google-gemini/gemini-skills) | Google | Apache-2.0 | 1 | Desarrollo con la API de Gemini. |
| [Security Audit](https://github.com/cloudflare/security-audit-skill) | Cloudflare | MIT | 1 | Auditorías de seguridad completas en seis fases con verificación independiente de cada hallazgo. |
| [Diagram Design](https://github.com/cathrynlavery/diagram-design) | Cathryn Lavery | MIT | 1 | Diagramas técnicos editoriales en HTML y SVG, sin plantillas genéricas. |
| [HyperFrames](https://github.com/heygen-com/hyperframes) | HeyGen | Apache-2.0 | 6 | Videos hechos con HTML, CSS y JavaScript que se renderizan igual cada vez: promos, explicativos, subtítulos y gráficos animados. |
| [Remotion Skills](https://github.com/remotion-dev/skills) | Remotion | Sin licencia declarada | 1 | Videos programados con React, con las buenas prácticas oficiales de Remotion. |
| [Higgsfield Skills](https://github.com/higgsfield-ai/skills) | Higgsfield AI | MIT | 4 | Imágenes, video, personajes consistentes y fotos de producto con IA. **Requiere:** Cuenta de Higgsfield; consume sus créditos. |
| [ElevenLabs Skills](https://github.com/elevenlabs/skills) | ElevenLabs | MIT | 4 | Texto a voz, música, efectos de sonido y transcripción con IA. **Requiere:** Cuenta de ElevenLabs. |
| [shadcn/ui](https://github.com/shadcn-ui/ui) | shadcn | MIT | 1 | La skill oficial para usar y personalizar componentes de shadcn/ui. |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Next Level Builder | MIT | 1 | Estilos, paletas, tipografías y guías de UX para elegir con criterio el diseño de una interfaz. |
| [Agents de wshobson](https://github.com/wshobson/agents) | Seth Hobson | MIT | 2 | Patrones de backend en Node y tipos avanzados de TypeScript. |
| [Developer Kit](https://github.com/giuseppe-trisciuoglio/developer-kit) | Giuseppe Trisciuoglio | MIT | 1 | Patrones de Tailwind CSS para interfaces consistentes. |
| [dot-skills](https://github.com/pproenca/dot-skills) | Pedro Proença | MIT | 2 | Formularios con React Hook Form y validación con Zod. |
| [Useful AI Prompts](https://github.com/aj-geddes/useful-ai-prompts) | AJ Geddes | MIT | 1 | Servidores Express en Node bien estructurados. |
| [Debug Mode](https://github.com/doraemonkeys/claude-code-debug-mode) | doraemonkeys | MIT | 1 | Modo de depuración guiado por hipótesis e instrumentación temporal. |
