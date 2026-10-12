document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('form-registro');

    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmarPassword = document.getElementById('confirmar-password').value;

        if (password !== confirmarPassword) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        const nuevoUsuario = {
            nombre: nombre,
            email: email,
            password: password 
        };

        let usuarios = JSON.parse(localStorage.getItem('usuariosVetSanMarcos')) || [];
        
        const usuarioExiste = usuarios.find(u => u.email === email);
        if (usuarioExiste) {
            alert('Este correo ya está registrado.');
            return;
        }

        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuariosVetSanMarcos', JSON.stringify(usuarios));

        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        window.location.href = 'login.html';
    });
});