class ResponseProductStrategy {
    buildResponse(ProductList) {
        return {
            products: ProductList.map(product => ({
                id_product: product.id_producto,
                image: product.image,
                name: product.nombre,
                description: product.descripcion,
                price: product.precio,
                stock: product.stock,
            })),
        };
    }
}

class SuccessResponseProductStrategy extends ResponseProductStrategy {
    buildResponse(ProductList) {
        return {
            products: ProductList.map(product => ({
                id_product: product.id_producto,
                image: product.image,
                name: product.nombre,
                description: product.descripcion,
                price: product.precio,
                stock: product.stock,
            })),
        };
    }
}

module.exports = {
    SuccessResponseProductStrategy,
    SuccessResponseProductStrategy
};
