import React from 'react';

// Funciones auxiliares de lógica basadas en tu proyecto
function validarLogin(email, password) {
  if (!email || !password) return false;
  if (!email.includes('@') || !email.includes('.')) return false;
  return password.length >= 6;
}

function calcularTotalCarrito(carrito) {
  if (!Array.isArray(carrito)) return 0;
  return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

function validarContrasenas(pass1, pass2) {
  return pass1 === pass2;
}

describe('Pruebas Unitarias - Veterinaria San Marcos', () => {

  // PRUEBA 1
  it('Prueba 1: Debería validar correctamente un correo y contraseña en el login', () => {
    const esValido = validarLogin('usuario@veterinaria.com', '123456');
    expect(esValido).toBeTrue();
  });

  // PRUEBA 2
  it('Prueba 2: Debería calcular el total a pagar del carrito correctamente', () => {
    const carrito = [
      { nombre: 'Consulta', precio: 15000, cantidad: 1 },
      { nombre: 'Vacuna', precio: 10000, cantidad: 2 }
    ];
    const total = calcularTotalCarrito(carrito);
    expect(total).toBe(35000);
  });

  // PRUEBA 3
  it('Prueba 3: Debería confirmar que las contraseñas coinciden en el registro', () => {
    const coinciden = validarContrasenas('clave123', 'clave123');
    expect(coinciden).toBeTrue();
  });

});