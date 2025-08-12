document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-presupuesto');
    const mensajeError = document.getElementById('mensaje-error');
    const producto = document.getElementById('producto');
    const plazo = document.getElementById('plazo');
    const extras = document.querySelectorAll('input[name="extras"]');
    const presupuesto = document.getElementById('presupuesto');
    const condiciones = document.getElementById('condiciones');

    function calcularPresupuesto() {
        let precioBase = 0;
        switch (producto.value) {
            case 'A': precioBase = 100; break;
            case 'B': precioBase = 200; break;
            case 'C': precioBase = 300; break;
            default: precioBase = 0;
        }

        let precioExtras = 0;
        extras.forEach(e => {
            if (e.checked) precioExtras += parseInt(e.value);
        });

        let total = precioBase + precioExtras;

        // Descuento por plazo: si el plazo es menor o igual a 6 meses, 10% descuento
        // Si el plazo es mayor a 6 y menor o igual a 12, 5% descuento
        // Si el plazo es mayor a 12, sin descuento
        let descuento = 0;
        const plazoVal = parseInt(plazo.value);
        if (!isNaN(plazoVal)) {
            if (plazoVal <= 6) descuento = 0.10;
            else if (plazoVal <= 12) descuento = 0.05;
        }
        total = total - (total * descuento);

        presupuesto.value = total.toFixed(2) + " €";
    }

    producto.addEventListener('change', calcularPresupuesto);
    plazo.addEventListener('input', calcularPresupuesto);
    extras.forEach(e => e.addEventListener('change', calcularPresupuesto));
    form.addEventListener('reset', () => {
        setTimeout(() => {
            presupuesto.value = '';
            mensajeError.innerHTML = '';
        }, 0);
    });

    form.addEventListener('submit', function(e) {
        let errores = [];

        // Validar nombre
        const nombre = form.nombre.value.trim();
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,15}$/.test(nombre)) {
            errores.push('El nombre solo puede contener letras y máximo 15 caracteres.');
        }

        // Validar apellidos
        const apellidos = form.apellidos.value.trim();
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,40}$/.test(apellidos)) {
            errores.push('Los apellidos solo pueden contener letras y máximo 40 caracteres.');
        }

        // Validar teléfono
        const telefono = form.telefono.value.trim();
        if (!/^\d{9}$/.test(telefono)) {
            errores.push('El teléfono debe contener solo 9 números.');
        }

        // Validar email
        const email = form.email.value.trim();
        if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email)) {
            errores.push('El correo electrónico no es válido.');
        }

        // Validar producto
        if (!producto.value) {
            errores.push('Debes seleccionar un producto.');
        }

        // Validar plazo
        if (!plazo.value || isNaN(parseInt(plazo.value)) || parseInt(plazo.value) < 1) {
            errores.push('Debes indicar un plazo válido.');
        }

        // Validar condiciones
        if (!condiciones.checked) {
            errores.push('Debes aceptar las condiciones de privacidad.');
        }

        if (errores.length > 0) {
            e.preventDefault();
            mensajeError.innerHTML = errores.join('<br>');
        } else {
            mensajeError.innerHTML = '';
        }
    });
});