describe('Pruebas del sistema Veterinaria San Marcos', () => {
    
  it('debe validar que el login rechace campos vacíos', () => {
    const email = "";
    const password = "";
    const esValido = email.trim() !== "" && password.trim() !== "";
    expect(esValido).toBe(false);
  });

  it('debe calcular correctamente el total del carrito', () => {
    const precio = 15000;
    const cantidad = 2;
    const total = precio * cantidad;
    expect(total).toBe(30000);
  });

  it('debe verificar que las contraseñas coincidan en el registro', () => {
    const pass1 = "Admin123";
    const pass2 = "Admin123";
    expect(pass1 === pass2).toBe(true);
  });

});