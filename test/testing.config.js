const supertest = require('supertest');

const expect = require('chai').expect;
const requester = supertest.agent(`http://localhost":${process.env.PORT || 8080}`)

module.exports = {
    requester,
    expect
}