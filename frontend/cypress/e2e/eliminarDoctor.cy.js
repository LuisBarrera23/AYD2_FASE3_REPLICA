describe('Eliminar Doctor', () => {
    beforeEach(() => {
        cy.viewport(1280, 820); 
        cy.visit('http://localhost:3000'); 
        cy.get('input[type="email"]').type('gamesusac@gmail.com'); 
        cy.get('input[type="password"]').type('Admin123*');
        cy.contains('Sign in').click(); 
        cy.url().should('include', '/admin');
        cy.wait(1000); 
    });

    it('Debe eliminar un doctor de forma correcta', () => {
        cy.get('#navegar_deleteD').click();
        cy.wait(1000);

        
        cy.get('.btn-danger').first().click(); 

       
        cy.wait(1000); 
        cy.on('window:alert', (str) => {
            expect(str).to.equal('User deleted from Cognito and database successfully.');
        });

    });
});
