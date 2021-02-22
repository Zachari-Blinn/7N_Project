"use strict";

let app = require('../../server');
let chai = require('chai');
let chaiHttp = require('chai-http');

const { expect, assert } = chai;
chai.use(chaiHttp);

global.forum = {
  title: "Covid & More",
  description: "Le covid c'est pas bien"
};

describe("Forum controller", () => {

  describe('POST route /forum', () => {
    it("should return 201 status and verify data send", (done) => {
      chai
        .request(app)
        .post('/forum')
        .send(forum)
        .end((err, res) => {
          expect(res).to.have.status(201);

          assert.equal(res.body.title, global.forum.title);
          assert.equal(res.body.description, global.forum.description);

          done(err);
        });
    });
  });

  describe('GET route /forum', () => {
    it("should return 200 status", (done) => {
      chai
        .request(app)
        .get('/forum')
        .end((err, res) => {
          expect(res).to.have.status(200);

          done(err);
        });
    });
  });

});