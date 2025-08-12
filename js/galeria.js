document.addEventListener("DOMContentLoaded", () => {
    const imagenes = [
        { src: "assets/youtube.jpg", alt: "Imagen 1" },
        { src: "assets/tiktok.png", alt: "Imagen 2" },
        { src: "assets/twitch.webp", alt: "Imagen 3" }

    ];

    let indiceActual = 0;
    const imgElemento = document.getElementById("carrusel-img");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    function mostrarImagen(indice) {
        imgElemento.src = imagenes[indice].src;
        imgElemento.alt = imagenes[indice].alt;
    }

    prevBtn.addEventListener("click", () => {
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        mostrarImagen(indiceActual);
    });

    nextBtn.addEventListener("click", () => {
        indiceActual = (indiceActual + 1) % imagenes.length;
        mostrarImagen(indiceActual);
    });

    mostrarImagen(indiceActual);
});