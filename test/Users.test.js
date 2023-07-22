const { expect } = require("chai");
const { requester } = require("./testing.config")


describe('Testeo de session', () => {
    it('Endpoint Post /register para crear un nuevo usuario', async () => {
        let mockUser = {
            username: "pruebanro50",
            email: "pruebanro50@gmail.com",
            password: "test123"
        };
        const { _body } = await requester
            .post('/register')
            .send(mockUser)


        expect(_body.status).to.equal("success");
        expect(_body.payload).to.be.ok;
    });
    it('Endpoint Post /login para loguear al usuario', async () => {
        let loginUser = {
            username: "pruebanro50@gmail.com",
            password: "test123"
        };
        const { _body } = await requester
            .post('/login')
            .send(loginUser)


        expect(_body.status).to.equal("success");
        expect(_body.payload).to.be.ok;
    });


})