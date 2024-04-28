describe('Actualizacion de datos', () => {
  beforeEach(() => {

    cy.viewport(1280, 820); 
    // Inicia sesión
    cy.visit('http://localhost:3000');
    cy.get('input[type="email"]').type('202010025ayesercristianoxlaj@gmail.com');
    cy.get('input[type="password"]').type('Holamundo1*');
    cy.contains('Sign in').click();
    cy.url().should('include', '/homepaciente');
  });
  
  it('Dbería actualizar los datos de forma correcta', () => {

    cy.intercept('PUT', '**/updateUser').as('updateUser');
    
    cy.visit('http://localhost:3000/homepaciente');
    
    cy.get('#inputfullname').clear().type('Luis');
    cy.wait(1000);
    cy.get('#inputlastname').clear().type('Perez');
    cy.wait(1000);
    cy.get('#inputusername').clear().type('Luisxd');
    cy.wait(1000);
    cy.get('#inputnewpassword').clear().type('Holamundo1*');
    cy.wait(1000);
    cy.get('#inputpassword').clear().type('Holamundo1*');
    cy.wait(1000);
    
    cy.contains('Update').click();
    
    cy.wait('@updateUser').then((interception) => {
      // Obtiene la respuesta del servidor
      const { response } = interception;
      
      expect(response.body.message).to.equal('Your profile was successfully updated.');
    });
  });
});
