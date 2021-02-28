const app = require('../../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect, assert } = chai
chai.use(chaiHttp)

global.user = {
  email: 'zachari.blinn@hotmail.com',
  password: 'dq4sjjp3ajd78ezahd'
}

describe('Auth controller', () => {
  describe('Register route /auth/register', () => {
    it('should return 201 status', (done) => {
      chai
        .request(app)
        .post('/auth/register')
        .send(global.user)
        .end((err, res) => {
          expect(res).to.have.status(201)

          done(err)
        })
    })
  })

  describe('Login route /auth/login', () => {
    it('should return 200 status', (done) => {
      chai
        .request(app)
        .post('/auth/login')
        .send({ email: global.email, password: global.password })
        .end((err, res) => {
          if (err) return done(err)
          return done()
        })
    })
  })
})
