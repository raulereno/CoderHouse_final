const supertest = require('supertest');

const expect = require('chai').expect;
const requester = supertest.agent(`http://localhost:3001`)

module.exports = {
    requester,
    expect
}