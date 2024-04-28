describe('Prueba de inicio de sesión incorrecto', () => {
    it('debería mostrar un mensaje de error al ingresar credenciales incorrectas', () => {
    
        cy.visit('http://localhost:3000/');

        // Introducir credenciales incorrectas
        cy.get('input[type="email"]').type('correoincorrecto@example.com');
        cy.get('input[type="password"]').type('contraseñaincorrecta');

        cy.contains('Sign in').click();


        cy.on('window:alert', (str) => {
            expect(str).to.equal('Email and/or password incorrect.');
        });


    });
});
