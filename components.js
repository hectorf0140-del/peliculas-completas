function renderHeader(active) {
  const links = [
    { href: "index.html", label: "Inicio", key: "inicio" },
    { href: "peliculas.html", label: "Películas", key: "peliculas" },
    { href: "series.html", label: "Series", key: "series" },
    { href: "anime.html", label: "Anime", key: "anime" },
    { href: "generos.html", label: "Géneros", key: "generos" },
  ];
  const navHtml = links.map(l =>
    `<a href="${l.href}" class="navlink${active === l.key ? ' navlink--active' : ''}">${l.label}</a>`
  ).join("");

  document.getElementById("site-header").innerHTML = `
    <div class="wrap topbar__inner">
      <a href="index.html" class="logo">CARRETE</a>
      <nav class="nav">${navHtml}</nav>
      <div id="authArea" class="auth-area">
        <!-- Botón de login original (dorado) – sin cambios -->
        <a id="loginBtn" class="login-btn" href="${CONFIG.LOGIN_BUTTON_URL}" target="_blank" rel="noopener">Iniciar sesión</a>
        <div id="userChip" class="user-chip hidden">
          <img id="userPic" alt="">
          <span id="userName"></span>
          <button id="logoutBtn" class="logout-btn">Salir</button>
        </div>
      </div>
    </div>
  `;
}

function renderFooter() {
  document.getElementById("site-footer").innerHTML =
    `<div class="wrap">Proyecto de demostración — datos de películas y series vía TMDB.</div>`;
}

function renderModals() {
  document.getElementById("modals").innerHTML = `
    <div id="authModalOverlay" class="modal-overlay hidden">
      <div class="modal">
        <button id="authModalClose" class="modal-close" aria-label="Cerrar">×</button>
        <span class="lock-badge">Contenido restringido</span>
        <h3>Antes de continuar</h3>
        <p id="authModalText">Iniciá sesión con tu cuenta de Google para continuar.</p>
        <!-- Botón con estilo Google (solo en el modal) -->
        <button type="button" class="google-btn" id="authModalLoginBtn">
          <svg class="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.1-6.68-4.93H1.28v3.15C3.26 21.31 7.32 24 12 24z"/>
            <path fill="#FBBC05" d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.28C.47 8.18 0 10.02 0 12s.47 3.82 1.28 5.42l4.04-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.32 0 3.26 2.69 1.28 6.58l4.04 3.15c.94-2.83 3.57-4.98 6.68-4.98z"/>
          </svg>
          <span>Iniciar sesión con Google</span>
        </button>
      </div>
    </div>
    <div id="movieModalOverlay" class="modal-overlay hidden">
      <div class="modal">
        <button id="movieModalClose" class="modal-close" aria-label="Cerrar">×</button>
        <div id="movieModalContent"></div>
      </div>
    </div>
  `;

  // Cerrar modal de autenticación
  document.getElementById("authModalClose").addEventListener("click",
    () => document.getElementById("authModalOverlay").classList.add("hidden")
  );
  document.getElementById("authModalOverlay").addEventListener("click", e => {
    if (e.target.id === "authModalOverlay") e.target.classList.add("hidden");
  });

  // Cerrar modal de película
  document.getElementById("movieModalClose").addEventListener("click",
    () => document.getElementById("movieModalOverlay").classList.add("hidden")
  );
  document.getElementById("movieModalOverlay").addEventListener("click", e => {
    if (e.target.id === "movieModalOverlay") e.target.classList.add("hidden");
  });

  // Acción del botón de Google en el modal
  document.getElementById("authModalLoginBtn").addEventListener("click", function() {
    window.open(CONFIG.LOGIN_BUTTON_URL, "_blank", "noopener");
  });
}