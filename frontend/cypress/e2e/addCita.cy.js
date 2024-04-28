describe('Agregar una cita de un paciente', () => {
    beforeEach(() => {
     
      cy.viewport(1280, 820); 

      cy.visit('http://localhost:3000');
      cy.get('input[type="email"]').type('202010025ayesercristianoxlaj@gmail.com');
      cy.get('input[type="password"]').type('Holamundo1*');
      cy.contains('Sign in').click();
      cy.url().should('include', '/homepaciente');
      cy.wait(1000);
  
    });
    
    it('Debe agregar una cita de forma correcta', () => {
      
      cy.get('#navegar_cita').click();
      cy.wait(1000);
      cy.get('#inputcita').type('Descripción de la cita');
      cy.get('#inputdate').type('2024-04-26');
      
      cy.get('#btnaddcita').click();
      
      cy.wait(1000);
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Your appointment was successfully scheduled!');
      });

      cy.get('#navegar_historialcita').click();
    });
  });
  