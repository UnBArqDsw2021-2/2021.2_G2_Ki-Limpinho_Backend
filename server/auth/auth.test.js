const request = require("supertest");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const app = require("../../index");
const config = require("../../config/config");
const mongoose = require('mongoose');
const User = require("../user/user.model");
const {before} = require("mocha");


const expect = chai.expect;
chai.config.includeStack = true;

 let user = {
  name: "Test",
  email: "test@gmail.com",
  cpf: "04604857192",
  password: "123456",
};
/**
 * root level hooks
 */

before(async () => {
  await User.deleteMany({});
  await User.create(user);
});
after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.dropDatabase();
  mongoose.connection.close();
  done();
});



describe("## Auth APIs", () => {


  let notCreatedUserCredentials = {
    email: "notcreated@gmail.com",
    password: "123456",
  };

  let invalidUserCredentials = {
    email: "test@gmail.com",
    password: "wrongpassword",
  };

  let validUserCredentials = {
    email: "test@gmail.com",
    password: "123456",
  };

  let jwtToken;

  describe("# POST /api/auth/login", () => {

    it("should return Authentication error", (done) => {
      request(app)
        .post("/api/auth/login")
        .send(invalidUserCredentials)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal("Senha incorreta.");
          done();
        })
        .catch(done);
    });
  
    it("should return Authentication error", (done) => {
      request(app)
        .post("/api/auth/login")
        .send(notCreatedUserCredentials)
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal("Email não encontrado");
          done();
        })
        .catch(done);
    });
    
    it("should get user login to application", (done) => {
      request(app)
        .post("/api/auth/login")
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property("token");
          jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
            expect(err).to.not.be.ok; // eslint-disable-line no-unused-expressions
            expect(decoded.username).to.equal(validUserCredentials.username);
            jwtToken = `Bearer ${res.body.token}`;
            done();
          });
        })
        .catch(done);
    });

  });
});
