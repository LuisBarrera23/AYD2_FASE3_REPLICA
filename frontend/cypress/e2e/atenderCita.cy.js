describe('Atender cita desde Doctor', () => {
    beforeEach(() => {
        cy.viewport(1280, 820); 
        cy.visit('http://localhost:3000'); 
        cy.get('input[type="email"]').type('coxlajsansebastian3b@gmail.com'); 
        cy.get('input[type="password"]').type('Holamundo2*'); 
        cy.contains('Sign in').click(); 
        cy.url().should('include', '/doctor'); 
        cy.wait(1000); 
    });

    it('Debe atender una cita de forma correcta', () => {

        cy.get('#navegar_atenderFinal').click();
        cy.wait(1000);
        cy.get('button.btn-success').last().click();
    });
});
