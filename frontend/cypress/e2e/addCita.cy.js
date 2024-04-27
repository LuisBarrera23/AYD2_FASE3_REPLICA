describe('Create Appointment', () => {
    beforeEach(() => {
      // Establece las dimensiones del viewport
      cy.viewport(1280, 820); // Ancho: 1280px, Alto: 720px
      // Inicia sesión
      cy.visit('http://localhost:3000');
      cy.get('input[type="email"]').type('202010025ayesercristianoxlaj@gmail.com');
      cy.get('input[type="password"]').type('Holamundo1*');
      cy.contains('Sign in').click();
      cy.url().should('include', '/homepaciente');
      cy.wait(1000);
  
    });
    
    it('should create a new appointment successfully', () => {
      // Navega a la página de creación de citas
      cy.get('#navegar_cita').click();
      cy.wait(1000);
      // Ingresa los detalles de la cita
      cy.get('#inputcita').type('Descripción de la cita');
      cy.get('#inputdate').type('2024-04-26');
      
      // Envía el formulario de creación de cita
      cy.get('#btnaddcita').click();
      
      // Verifica que la cita se haya creado correctamente
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Your appointment was successfully scheduled!');
      });

      cy.get('#navegar_historialcita').click();
    });
  });
  