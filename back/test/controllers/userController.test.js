const app = require('../../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect, assert } = chai
chai.use(chaiHttp)

global.user = {
  email: 'zachari.blinn@hotmail.com',
  password: 'dqsjjpajdezahd'
}

describe('User controller', () => {
  describe('POST route /user', () => {
    it('should return 201 status and verify data send', (done) => {
      chai
        .request(app)
        .post('/user')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201)

          assert.equal(res.body.email, global.user.email)
          assert.equal(res.body.password, global.user.password)

          done(err)
        })
    })
  })

  describe('GET route /user', () => {
    it('should return 200 status', (done) => {
      chai
        .request(app)
        .get('/user')
        .end((err, res) => {
          expect(res).to.have.status(200)

          done(err)
        })
    })
  })
})
