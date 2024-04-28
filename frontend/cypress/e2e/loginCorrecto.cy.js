describe('Prueba de inicio de sesión correcto', () => {
    it('debería redirigir a la página correspondiente después del inicio de sesión exitoso', () => {

        cy.visit('http://localhost:3000/');

        // Introducir credenciales correctas
        cy.get('input[type="email"]').type('gamesusac@gmail.com');
        cy.get('input[type="password"]').type('Admin123*');

        cy.contains('Sign in').click();

        cy.wait(1000);

        cy.url().should('include', '/admin'); 
       

         
    });
});
