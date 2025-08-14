document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('galeria-root');
    fetch("../js/data/galeria.json")
        .then(response => response.json())
        .then(data => {
            const imagenes = data.imagenes;
            if (!imagenes || imagenes.length === 0) {
                root.textContent = "No hay imágenes para mostrar.";
                return;
            }

            let indiceActual = 0;
            const carrusel = document.createElement('div');
            carrusel.className = 'carrusel';

            const btnPrev = document.createElement('button');
            btnPrev.id = 'prev-img';
            btnPrev.innerHTML = '&#10094;';

            const img = document.createElement('img');
            img.id = 'galeria-img';
            img.className = 'img-galeria';

            const btnNext = document.createElement('button');
            btnNext.id = 'next-img';
            btnNext.innerHTML = '&#10095;';

            const desc = document.createElement('div');
            desc.id = 'galeria-descripcion';

            carrusel.appendChild(btnPrev);
            carrusel.appendChild(img);
            carrusel.appendChild(btnNext);

            root.appendChild(carrusel);
            root.appendChild(desc);

            function mostrarImagen(indice) {
                img.src = imagenes[indice].url;
                img.alt = imagenes[indice].descripcion || "Imagen galería";
                desc.textContent = imagenes[indice].descripcion || "";
            }

            btnPrev.addEventListener('click', () => {
                indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
                mostrarImagen(indiceActual);
            });

            btnNext.addEventListener('click', () => {
                indiceActual = (indiceActual + 1) % imagenes.length;
                mostrarImagen(indiceActual);
            });

            mostrarImagen(indiceActual);
        })
        .catch(() => {
            root.textContent = "No se pudo cargar la galería.";
        });
});