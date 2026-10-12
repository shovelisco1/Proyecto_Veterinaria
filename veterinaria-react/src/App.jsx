import { Header } from "./components/Header";

function App() {
  return (
    <div className="bg-light min-vh-100">
      <Header />
      
      <main className="container mt-5">
        {/* Aquí irá el contenido central más adelante */}
        <div className="text-center p-5 bg-white shadow-sm rounded">
          <h1>Cuidamos a tu mejor amigo</h1>
          <p className="text-muted">Encuentra los mejores servicios médicos y productos para tu mascota.</p>
        </div>
      </main>
    </div>
  );
}

export default App;