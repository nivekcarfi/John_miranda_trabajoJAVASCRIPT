document.addEventListener("DOMContentLoaded", () => {
    fetch("js/data/noticias.json")
        .then(response => response.json())
        .then(data => {
            const noticias = data.noticias;
            let indiceActual = 0;
            const noticiaContenido = document.getElementById('noticia-contenido');
            const prevBtn = document.getElementById('prev-noticia');
            const nextBtn = document.getElementById('next-noticia');

            function mostrarNoticia(indice) {
                const noticia = noticias[indice];
                noticiaContenido.innerHTML = `
                    <div class="noticia-carrusel">
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.descripcion}</p>
                        <small>${noticia.fecha}</small>
                    </div>
                `;
            }

            prevBtn.addEventListener('click', () => {
                indiceActual = (indiceActual - 1 + noticias.length) % noticias.length;
                mostrarNoticia(indiceActual);
            });

            nextBtn.addEventListener('click', () => {
                indiceActual = (indiceActual + 1) % noticias.length;
                mostrarNoticia(indiceActual);
            });

            mostrarNoticia(indiceActual);
        })
        .catch(error => console.error("Error cargando noticias:", error));
});
