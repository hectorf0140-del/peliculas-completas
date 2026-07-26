document.addEventListener("DOMContentLoaded", async () => {
  renderHeader("series");
  renderFooter();
  renderModals();
  initAuth();

  const grid = document.getElementById("grid");
  const status = document.getElementById("status");
  const search = document.getElementById("searchInput");
  const genreSelect = document.getElementById("genreSelect");
  let itemsMap = {};

  async function loadGenres() {
    const data = await tmdb("/genre/tv/list");
    genreSelect.innerHTML = `<option value="">Todos los géneros</option>` +
      data.genres.map(g => `<option value="${g.id}">${g.name}</option>`).join("");
    const params = new URLSearchParams(location.search);
    if (params.get("genero")) genreSelect.value = params.get("genero");
  }

  async function load() {
    status.textContent = "Cargando…"; grid.innerHTML = "";
    try {
      let data;
      const q = search.value.trim();
      if (q) data = await tmdb("/search/tv", { query: q });
      else if (genreSelect.value) data = await tmdb("/discover/tv", { with_genres: genreSelect.value, sort_by: "popularity.desc" });
      else data = await tmdb("/tv/popular");

      itemsMap = {};
      grid.innerHTML = data.results.map(s => { itemsMap[s.id] = s; return cardHtml(s, "tv"); }).join("");
      attachCardClicks(grid, itemsMap);
      status.textContent = data.results.length ? "" : "Sin resultados.";
    } catch (err) {
      status.textContent = "No se pudo cargar el catálogo. Revisá tu TMDB_API_KEY en config.js.";
      console.error(err);
    }
  }

  await loadGenres();
  load();
  let t;
  search.addEventListener("input", () => { clearTimeout(t); t = setTimeout(load, 400); });
  genreSelect.addEventListener("change", load);
});
