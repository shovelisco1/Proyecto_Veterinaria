document.addEventListener('DOMContentLoaded', () => {
    const formContacto = document.getElementById('form-contacto');

    formContacto.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const nombre = document.getElementById('nombre-contacto').value;
        const motivo = document.getElementById('motivo').options[document.getElementById('motivo').selectedIndex].text;

        
        alert(`¡Gracias por escribirnos, ${nombre}!\n\nHemos recibido tu mensaje sobre "${motivo}". Nos pondremos en contacto contigo pronto.`);

        
        formContacto.reset();
    });
});