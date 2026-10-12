document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-login');
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const mensajeError = document.getElementById('mensaje-error');

    formulario.addEventListener('submit', (evento) => {
        // Detiene el envío automático del formulario
        evento.preventDefault(); 
        
        mensajeError.style.display = 'none';
        mensajeError.textContent = '';

        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();

        // VALIDADOR 1: Bloquea si los campos están vacíos
        if (email === '' || password === '') {
            mostrarError('Por favor, completa todos los campos.');
            return;
        }

        // VALIDADOR 2: Bloquea si el correo no tiene @ o punto
        if (!email.includes('@') || !email.includes('.')) {
            mostrarError('El formato del correo electrónico no es válido.');
            return;
        }

        // VALIDADOR 3: Bloquea si la contraseña es muy corta
        if (password.length < 6) {
            mostrarError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        // Si todo está correcto, pasa aquí
        alert('¡Inicio de sesión exitoso!');
        window.location.href = 'index.html'; 
    });

    function mostrarError(mensaje) {
        mensajeError.textContent = mensaje;
        mensajeError.style.display = 'block';
    }
});