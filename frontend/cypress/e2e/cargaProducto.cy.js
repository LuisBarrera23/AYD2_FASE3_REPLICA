describe('Cargar Productos de forma masiva', () => {
    beforeEach(() => {
        cy.viewport(1280, 820); 
        cy.visit('http://localhost:3000'); 
        cy.get('input[type="email"]').type('gamesusac@gmail.com'); 
        cy.get('input[type="password"]').type('Admin123*'); 
        cy.contains('Sign in').click(); 
        cy.url().should('include', '/admin'); 
        cy.wait(1000); 
    });

    it('Debe cargar los productos de forma correcta', () => {

       
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
