const { expect } = require("chai");
const { requester } = require("./testing.config");

describe('Testeo de carrito', () => {
    let cartId;
    let productId = "647366b12ecab8dd5b4614ce"
    let productId2 = "647366b12ecab8dd5b4614d1"
    before(async () => {
        const loginUser = {
            username: "test",
            password: "test"
        }

        const { _body } = await requester.post('/login').send(loginUser);

        cartId = _body.cartId

        expect(_body.status).to.equal("success")
    });
    describe('Test de Productos', () => {
        it('Endpoint Post cart/:cid/product/:pid para agregar un producto al carrito', async () => {


            const { _body } = await requester.post(`/cart/${cartId}/product/${productId}`).send();

            expect(_body.status).to.equal("success")
            expect(_body.payload.products.length !== 0).to.equal(true);
            expect(_body.payload).to.have.property('_id');

        });
        it('Endpoint Delete cart/:cid/product/:pid para eliminar un producto del carrito', async () => {
            const { _body } = await requester.delete(`/cart/${cartId}/product/${productId}`).send();

            expect(_body.status).to.equal("success")
            expect(_body.payload.products.length === 0).to.equal(true);
            expect(_body.payload).to.have.property('_id');
        })
        it('Endpoint Delete cart/:cid para limpiar el carrito', async () => {

            const { _body } = await requester.post(`/cart/${cartId}/product/${productId}`).send();
            const { _body: _body2 } = await requester.post(`/cart/${cartId}/product/${productId2}`).send();

            expect(_body.status).to.equal("success")
            expect(_body2.status).to.equal("success")
            expect(_body2.payload.products.length === 2).to.equal(true);

            const { _body: _body3 } = await requester.delete(`/cart/${cartId}`).send();

            expect(_body3.status).to.equal("success")
            expect(_body3.payload.products.length === 0).to.equal(true);
        })
        it('Endpoint Get cart/:cid/purchase para hacer el checkout', async () => {
            const { _body: _body2 } = await requester.post(`/cart/${cartId}/product/${productId2}`).send();
            expect(_body2.status).to.equal("success")

            const { _body } = await requester.get(`/cart/${cartId}/purchase`).send();
            expect(_body.status).to.equal("success")
            expect(_body.payload).to.have.property('code');
            expect(_body.payload).to.have.property('purchase_datetime');
            expect(_body.payload).to.have.property('amount');
            expect(_body.payload).to.have.property('purchaser');
            expect(_body.payload.products.length !== 0).to.equal(true);

        })
    })
})

/*
ticket: {
  code: '653c787e-acc8-49f5-a2a4-6ad055f6a9bc',
  purchase_datetime: 2023-06-17T23:08:39.426Z,
  amount: 2500,
  purchaser: 'test@gmail.com',
  products: [
    {
      _id: new ObjectId("647366b12ecab8dd5b4614d1"),
      title: 'Pedigree Adulto 7,5kg',
      description: 'Balanceado para perros adultos sabor carne,pollos y cereales de 7,5kg',
      category: 'balanceado',
      price: 2500,
      image: '/uploads/pedigree_adulto_7,5.jpg',
      owner: 'admin',
      stock: 6,
      __v: 0
    }
  ],
  _id: new ObjectId("648e3cf7979d1e5a3ea97d41"),
  __v: 0
}
*/
