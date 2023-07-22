const { expect } = require("chai");
const { requester } = require("./testing.config");

describe('testeo de productos', () => {
    before(async () => {
        const user = {
            username: "ra",
            password: "villa"
        }

        const { _body } = await requester.post('/login').send(user);

        expect(_body.status).to.equal("success")
    });
    describe('Test de Productos', () => {
        let createdProductId
        it('Endpoint Post /products para crear un nuevo producto', async () => {
            let mockProduct = {
                title: "Producto de prueba v1",
                description: "Lorem impsum",
                code: "1500",
                price: 100,
                stock: 10,
                category: "Prueba",
                thumbnail: "lorem.jpg",
            };
            const { _body } = await requester
                .post('/products')
                .send(mockProduct)


            expect(_body.payload).to.have.property('_id');
            expect(_body.payload.title).to.equal(mockProduct.title);
            createdProductId = _body.payload._id;
        });
        it('Endpoint Put products/:pid para modificar un producto', async () => {
            let mockUpdateProduct = {
                title: "Producto de prueba modificado v2",
                description: "Lorem impsum",
                code: "2100",
                price: 20,
                stock: 10,
                category: "Prueba",
                thumbnail: "lorem2.jpg",
            };
            const { _body } = await requester
                .put(`/products/${createdProductId}`)
                .send(mockUpdateProduct)

            expect(_body.payload.title).to.equal(mockUpdateProduct.title);

        })
        it('Endpoint Delete /products/:pid para modificar un producto', async () => {
            const res = await requester
                .delete(`/products/${createdProductId}`)
                .expect(200);

            expect(res.body.payload).to.equal("Product deleted");
        })
    })
})