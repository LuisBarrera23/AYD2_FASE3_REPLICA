describe('Actualizar Producto', () => {
    beforeEach(() => {
        cy.viewport(1280, 820); 
        cy.visit('http://localhost:3000'); 
        cy.get('input[type="email"]').type('coxlajsansebastian3b@gmail.com'); 
        cy.get('input[type="password"]').type('Holamundo2*'); 
        cy.contains('Sign in').click(); 
        cy.url().should('include', '/doctor'); 
        cy.wait(1000);
    });

    it('Debería actualizar el producto de forma correcta', () => {

       
        cy.get('#navegar_updateP').click();
        cy.wait(1000);

        cy.get('.table-light tbody tr:first-child .btn-outline-primary').click();
        cy.wait(1000);

        
        cy.get('#inputEditP').clear().type('Nuevo Nombre de Producto');
        cy.wait(1000);

        
        cy.get('#inputEditSt').clear().type('50');
        cy.wait(1000);

        
        cy.get('.btn-success').click();
        cy.wait(1000);

        

    });
});
