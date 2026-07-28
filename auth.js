// El sitio ya no verifica sesión real: el modal solo informa y redirige
// al link que configuraste. requireLogin() siempre muestra el aviso.

function openAuthModal(message) {
  document.getElementById("authModalText").textContent = message;
  document.getElementById("authModalOverlay").classList.remove("hidden");
}

function closeAuthModal() {
  document.getElementById("authModalOverlay").classList.add("hidden");
}

function requireLogin() {
  openAuthModal("Para reproducir este contenido, iniciá sesión.");
}

function initAuth() {
  document.getElementById("authModalClose").addEventListener("click", closeAuthModal);
}
