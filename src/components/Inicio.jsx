import { servicios } from '../data/servicios';
import { medicamentos } from '../data/medicamentos';
import { ItemCard } from "./cards/ItemCard";

export const Inicio = ({ verDetalle }) => {
    const serviciosDestacados = servicios.slice(0, 3).map((servicio) => ({
        ...servicio,
        categoriaPrincipal: 'servicios',
    }));

    const medicamentosDestacados = medicamentos.slice(0, 3).map((medicamento) => ({
        ...medicamento,
        categoriaPrincipal: 'medicamentos',
    }));

    return (
        <main className="container mt-5 mb-5">

            <section className="text-center p-5 bg-white shadow-sm rounded mb-5">
                <h1 className="fw-bold mb-3">
                    Cuidamos a tu mejor amigo
                </h1>

                <p className="text-muted fs-5">
                    Encuentra los mejores servicios médicos y productos para tu mascota.
                </p>

                <button
                    className="btn btn-primary fw-bold mt-3"
                    onClick={() => verDetalle && verDetalle(serviciosDestacados[0]?.codigo)}
                >
                    Conoce nuestros servicios
                </button>
            </section>
            <section className="mb-5">
                <h2 className="fw-bold mb-4">
                    Servicios destacados
                </h2>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    {serviciosDestacados.map((servicio) => (
                        <div className="col" key={servicio.codigo}>
                            <ItemCard
                                producto={servicio}
                                onVerDetalle={verDetalle}
                            />
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="fw-bold mb-4">
                    Medicamentos destacados
                </h2>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    {medicamentosDestacados.map((medicamento) => (
                        <div className="col" key={medicamento.codigo}>
                            <ItemCard
                                producto={medicamento}
                                onVerDetalle={verDetalle}
                            />
                        </div>
                    ))}
                </div>
            </section>

        </main>
);
};