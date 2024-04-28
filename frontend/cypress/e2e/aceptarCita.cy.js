describe('Aceptar una cita para el doctor', () => {
    beforeEach(() => {
        cy.viewport(1280, 820); 
        cy.visit('http://localhost:3000'); 
        cy.get('input[type="email"]').type('coxlajsansebastian3b@gmail.com'); 
        cy.get('input[type="password"]').type('Holamundo2*'); 
        cy.contains('Sign in').click(); 
        cy.url().should('include', '/doctor'); 
        cy.wait(1000); 
    });

    it('Debe aceptar una cita de forma correcta', () => {

        cy.get('#navegar_atender').click();
        cy.wait(1000);

        cy.get('.table-dark tbody tr:last-child .btn-outline-info').click();
        cy.wait(1500);

        cy.get('#horaInput').type('08:00');
        cy.wait(1000);

        cy.get('.custom-modal-content .btn-outline-success').click();
        cy.wait(1000);

    });
});
