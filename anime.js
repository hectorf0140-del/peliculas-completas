document.addEventListener("DOMContentLoaded", async () => {
  renderHeader("anime");
  renderFooter();
  renderModals();
  initAuth();

  const grid = document.getElementById("grid");
  const status = document.getElementById("status");
  const search = document.getElementById("searchInput");
  let itemsMap = {};

  async function load() {
    status.textContent = "Cargando…"; grid.innerHTML = "";
    try {
      let results;
      const q = search.value.trim();
      if (q) {
        const data = await tmdb("/search/tv", { query: q });
        results = data.results.filter(s => s.original_language === "ja" && s.genre_ids?.includes(16));
      } else {
        const data = await tmdb("/discover/tv", { with_genres: 16, with_original_language: "ja", sort_by: "popularity.desc" });
        results = data.results;
      }
      itemsMap = {};
      grid.innerHTML = results.map(s => { itemsMap[s.id] = s; return cardHtml(s, "tv"); }).join("");
      attachCardClicks(grid, itemsMap);
      status.textContent = results.length ? "" : "Sin resultados.";
    } catch (err) {
      status.textContent = "No se pudo cargar el catálogo. Revisá tu TMDB_API_KEY en config.js.";
      console.error(err);
    }
  }

  load();
  let t;
  search.addEventListener("input", () => { clearTimeout(t); t = setTimeout(load, 400); });
});
