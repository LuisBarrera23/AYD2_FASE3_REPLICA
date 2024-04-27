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
  
  it('should update profile successfully', () => {
    // Intercepta la llamada AJAX y maneja la respuesta del servidor
    cy.intercept('PUT', '**/updateUser').as('updateUser');
    
    // Navega a la página de perfil
    cy.visit('http://localhost:3000/homepaciente');
    
    // Ingresa los nuevos valores para el perfil
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
    
    // Envía el formulario de actualización
    cy.contains('Update').click();
    
    // Espera a que la llamada AJAX se complete
    cy.wait('@updateUser').then((interception) => {
      // Obtiene la respuesta del servidor
      const { response } = interception;
      // Verifica que la respuesta del servidor contenga el mensaje deseado
      expect(response.body.message).to.equal('Your profile was successfully updated.');
    });
  });
});
