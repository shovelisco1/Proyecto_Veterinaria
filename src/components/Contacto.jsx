import { useState } from 'react';

export const Contacto = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [motivo, setMotivo] = useState('');
    const [motivoTexto, setMotivoTexto] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        alert(`¡Gracias por escribirnos, ${nombre}!\n\nHemos recibido tu mensaje sobre "${motivoTexto}". Nos pondremos en contacto contigo pronto.`);

        
        setNombre('');
        setEmail('');
        setMotivo('');
        setMotivoTexto('');
        setMensaje('');
    };

    const handleMotivoChange = (e) => {
        setMotivo(e.target.value);
        const selectedIndex = e.target.selectedIndex;
        setMotivoTexto(e.target.options[selectedIndex].text);
    };

    return (
        <main className="container mt-5" style={{ maxWidth: '600px' }}>
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <h1 className="text-center text-dark mb-2">Contáctanos</h1>
                <p className="text-center text-muted mb-4">
                    ¿Tienes dudas? Escríbenos y te responderemos a la brevedad.
                </p>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div>
                        <label htmlFor="nombre-contacto" className="form-label fw-bold text-secondary">
                            Nombre completo:
                        </label>
                        <input 
                            type="text" 
                            id="nombre-contacto" 
                            required 
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email-contacto" className="form-label fw-bold text-secondary">
                            Correo electrónico:
                        </label>
                        <input 
                            type="email" 
                            id="email-contacto" 
                            required 
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="motivo" className="form-label fw-bold text-secondary">
                            Motivo de la consulta:
                        </label>
                        <select 
                            id="motivo" 
                            required 
                            className="form-select"
                            value={motivo}
                            onChange={handleMotivoChange}
                        >
                            <option value="">Selecciona una opción...</option>
                            <option value="duda_servicio">Duda sobre un servicio</option>
                            <option value="duda_medicamento">Consulta por medicamentos</option>
                            <option value="reclamo">Reclamo o sugerencia</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="mensaje" className="form-label fw-bold text-secondary">
                            Mensaje:
                        </label>
                        <textarea 
                            id="mensaje" 
                            rows="5" 
                            required 
                            className="form-control"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-success fw-bold py-2 fs-5 mt-2">
                        Enviar Mensaje ✉️
                    </button>
                </form>
            </div>
        </main>
    );
};