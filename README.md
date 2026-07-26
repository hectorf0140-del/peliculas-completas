# Carrete — catálogo de películas con login real de Google

Sitio estático (HTML/CSS/JS puro), pensado para GitHub Pages o Render.
Usa la API pública de TMDB para las carátulas y sinopsis, y Google
Identity Services para el login real (el usuario autoriza de verdad; vos
solo recibís su nombre, email y foto — nunca su contraseña).

## Estructura de páginas
- `index.html` — inicio, con carrusel de tendencias y populares
- `peliculas.html` — catálogo de películas, con buscador y filtro de género
- `series.html` — catálogo de series (mismo patrón que películas)
- `anime.html` — aproximación de anime: series/películas de animación en
  japonés. **TMDB no tiene una categoría "anime" oficial**, así que esto
  filtra por género Animación + idioma original japonés. No es 100% exacto,
  pero es lo más cercano que da la API sin pagar un servicio especializado
  (como Jikan/MyAnimeList).
- `generos.html` — lista de géneros como chips, cada uno lleva a
  `peliculas.html?genero=ID` o `series.html?genero=ID` ya filtrado
- `components.js`, `auth.js`, `api.js`, `movies.js` — lógica compartida
  entre todas las páginas (nav, login, llamadas a TMDB, tarjetas y modal)

## Cómo quedó el login
El botón "Iniciar sesión con Google" ya no está visible en el menú. En el
header solo hay un botón simple que dice "Iniciar sesión"; al hacer clic
(o al intentar abrir cualquier película/serie sin sesión), se abre un
modal que explica por qué hace falta iniciar sesión y ahí sí aparece el
botón real de Google. La sesión se guarda en `localStorage` para que no
tengas que loguearte de nuevo en cada página.

## 1. Conseguir las credenciales

**TMDB (carátulas):**
1. Creá una cuenta en https://www.themoviedb.org/
2. Configuración → API → solicitá una API key (tipo "Developer", es gratis).
3. Pegala en `config.js` → `TMDB_API_KEY`.

**Google (login):**
1. Andá a https://console.cloud.google.com/apis/credentials
2. Creá un proyecto → "Crear credenciales" → "ID de cliente de OAuth" → tipo "Aplicación web".
3. En "Orígenes de JavaScript autorizados" agregá la URL donde vas a alojar
   el sitio, por ejemplo `https://tuusuario.github.io`.
4. Copiá el Client ID y pegalo en `config.js` → `GOOGLE_CLIENT_ID`.

## 2. Probar localmente
Cualquier servidor estático sirve, por ejemplo:
```
python3 -m http.server 8000
```
Abrí `http://localhost:8000`. Nota: Google exige que el origen esté
autorizado, así que agregá también `http://localhost:8000` en el paso
anterior mientras probás.

## 3. Desplegar en GitHub Pages (HTTPS incluido)
1. Subí esta carpeta a un repo de GitHub.
2. Settings → Pages → Source: rama `main`, carpeta `/root`.
3. GitHub te da una URL `https://tuusuario.github.io/repo` con HTTPS automático.
4. Agregá esa URL exacta a los orígenes autorizados de Google (paso 1).

## Límite importante a tener claro
Este login decodifica el token de Google **en el navegador**, sin
verificarlo contra un backend. Sirve perfecto para lo que pediste (mostrar
el nombre del usuario). Si en algún momento vas a usar esto para decisiones
de seguridad reales (por ejemplo, cobrar una suscripción o restringir datos
sensibles), ahí sí vas a necesitar un backend que verifique la firma del
token con la librería oficial de Google — avisame y lo armamos.

## Qué más puedo sumar si querés
- Guardar favoritos por usuario (necesita backend + base de datos: Firebase es lo más rápido).
- Trailers embebidos desde TMDB (endpoint `/movie/{id}/videos`).
- Categorías (estrenos, mejor valoradas, por género).
- Modo oscuro/claro, paginación infinita.
