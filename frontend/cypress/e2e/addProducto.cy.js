describe('Ingresar Producto', () => {
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
        cy.get('#navegar_addProducto').click();
        cy.wait(1000);

        const nombreProducto = 'Nuevo Producto';
        const descripcionProducto = 'Descripción del Nuevo Producto';
        const precioProducto = '10';
        const stockProducto = '100';

        // Llenar los campos del formulario
        cy.get('input[aria-label="nombre"]').type(nombreProducto);
        cy.get('textarea[aria-label="Description"]').type(descripcionProducto);
        cy.get('input[aria-label="precio"]').type(precioProducto);
        cy.get('input[aria-label="stock"]').type(stockProducto);


        const fileName1 = 'medicina.png';
 
        // Carga el archivo de imagen utilizando cy.fixture()
        cy.fixture(fileName1).then((fileContent1) => {
            // Encuentra el input de tipo file y simula la carga del archivo
            const blob1 = Cypress.Blob.base64StringToBlob(fileContent1);

            cy.get('input[type="file"]').attachFile({
                fileContent: blob1,
                fileName: fileName1,
                mimeType: 'image/jpeg'
            });

            // Espera a que la imagen se cargue correctamente en la vista previa
            cy.get('.form-image-preview').should('be.visible');

            cy.wait(1000);

        });

        cy.wait(2000);
        // Hacer clic en el botón de agregar
        cy.get('button[type="button"]').click();

        // Verifica que la cita se haya creado correctamente
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Product saved successfully');
        });

        // Opcionalmente, podrías también verificar que el producto aparece en la lista de productos, si existe una lista en tu interfaz.
    });
});
