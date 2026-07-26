document.addEventListener("DOMContentLoaded", async () => {
  renderHeader("inicio");
  renderFooter();
  renderModals();
  initAuth();

  const carousel = document.getElementById("carousel");
  const grid = document.getElementById("grid");
  const status = document.getElementById("status");
  const itemsMap = {};

  try {
    const trending = await tmdb("/trending/movie/week");
    carousel.innerHTML = trending.results.slice(0, 8).map(m => {
      itemsMap[m.id] = m;
      const bg = m.backdrop_path ? BACKDROP_BASE + m.backdrop_path : (m.poster_path ? IMG_BASE + m.poster_path : "");
      return `<div class="carousel__slide" data-id="${m.id}" data-type="movie" style="background-image:url('${bg}')">
        <div class="carousel__caption">
          <p class="eyebrow">Tendencia</p>
          <h3>${escapeHtml(m.title)}</h3>
        </div>
      </div>`;
    }).join("");
    attachCardClicks(carousel, itemsMap, ".carousel__slide");

    document.getElementById("carNext").addEventListener("click", () => carousel.scrollBy({ left: 340, behavior: "smooth" }));
    document.getElementById("carPrev").addEventListener("click", () => carousel.scrollBy({ left: -340, behavior: "smooth" }));

    const popular = await tmdb("/movie/popular");
    grid.innerHTML = popular.results.map(m => { itemsMap[m.id] = m; return cardHtml(m, "movie"); }).join("");
    attachCardClicks(grid, itemsMap);
  } catch (err) {
    status.textContent = "No se pudo cargar el catálogo. Revisá tu TMDB_API_KEY en config.js.";
    console.error(err);
  }
});
