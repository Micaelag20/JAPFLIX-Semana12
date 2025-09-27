const datosGuardados = JSON.parse(localStorage.getItem("moviesData"));

// Función para mostrar detalles en el offcanvas bootstrap
function mostrarDetalle(pelicula) {
  document.getElementById("offcanvasLabel").innerText = pelicula.title;
  document.getElementById("detalle-overview").innerText = pelicula.overview || "Sin descripción.";
  document.getElementById("detalle-genres").innerText = pelicula.genres
    ? pelicula.genres.map(g => g.name).join(", ")
    : "Sin géneros";

  const anio = pelicula.release_date ? pelicula.release_date.slice(0, 4) : "Desconocido";

  document.getElementById("detalle-anio").innerText = anio;
  document.getElementById("detalle-duracion").innerText = pelicula.runtime || "Desconocido";
  document.getElementById("detalle-presupuesto").innerText = pelicula.budget ? pelicula.budget.toLocaleString() : "No disponible";
  document.getElementById("detalle-ganancias").innerText = pelicula.revenue ? pelicula.revenue.toLocaleString() : "No disponible";
  document.getElementById("detalle-calificacion").innerText = pelicula.vote_average || "No disponible";
}

// Función para buscar películas por Título
function buscarPeliculas() {
  const titulo = document.getElementById("titulo").value.trim();
  if (!titulo) {
    document.getElementById("resultado").innerHTML = "<p>Por favor ingresa un título</p>";
    return;
  }

  const pelicula = datosGuardados.find(movie => movie.title.toLowerCase() === titulo.toLowerCase());

  if (pelicula) {
    document.getElementById("resultado").innerHTML = `
      <div id="pelicula-item" style="cursor: pointer;">
        <h2>${pelicula.title}</h2>
        <p><strong>Director:</strong> ${pelicula.director}</p>
        <p><strong>Año:</strong> ${pelicula.year}</p>
        <p><strong>Género:</strong> ${pelicula.genre}</p>
        <p><strong>Duración:</strong> ${pelicula.duration} minutos</p>
        <p><strong>Calificación:</strong> ${pelicula.rating}</p>
        <p><strong>Descripción:</strong> ${pelicula.description}</p>
      </div>
    `;

    // Evento para mostrar detalles al hacer clic en una película
    document.getElementById("pelicula-item").addEventListener("click", () => {
      mostrarDetalle(pelicula);
    });
  } else {
    document.getElementById("resultado").innerHTML = "<p>Película no encontrada.</p>";
  }
}
// Funcionalidad del botón Buscar
document.getElementById("btnBuscar").addEventListener("click", buscarPeliculas);

// Funcionalidad del botón de Mostrar más detalles
document.querySelector('[data-bs-toggle="collapse"]').addEventListener('click', () => {
  const collapseEl = document.getElementById('collapseDetalle');
  const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl);
  bsCollapse.toggle();
});
