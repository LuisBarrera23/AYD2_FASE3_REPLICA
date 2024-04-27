describe('Eliminar Doctor', () => {
    beforeEach(() => {
        cy.viewport(1280, 820); // Establecer las dimensiones del viewport
        cy.visit('http://localhost:3000'); // Visitar la página
        cy.get('input[type="email"]').type('gamesusac@gmail.com'); // Llenar el campo de correo electrónico
        cy.get('input[type="password"]').type('Admin123*'); // Llenar el campo de contraseña
        cy.contains('Sign in').click(); // Hacer clic en el botón de inicio de sesión
        cy.url().should('include', '/admin'); // Verificar que la URL incluya '/admin'
        cy.wait(1000); // Esperar un segundo
    });

    it('debería agregar un producto correctamente', () => {

        // Navega a la página de creación de citas
        cy.get('#navegar_cargaD').click();
        cy.wait(1000);

        // Cargar el archivo CSV
        cy.fixture('MasivoDoctor.csv').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'MasivoDoctor.csv',
                mimeType: 'text/csv'
            });
        });

        // Hacer clic en el botón de carga
        cy.get('button[type="button"]').click();


    });
});
