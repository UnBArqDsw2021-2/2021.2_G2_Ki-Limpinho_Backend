const request = require("supertest");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const expect = chai.expect;
const app = require("../../index");
const config = require("../../config/config");

chai.config.includeStack = true;

describe("## Auth APIs", () => {
  let user = {
    name: "Test",
    email: "test@gmail.com",
    cpf: "04604857192",
    password: "123456",
  };

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

  describe("# POST /api/user", () => {
    it("should create a new user", (done) => {
      request(app)
        .post("/api/user")
        .send(user)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.name).to.equal(user.name);
          expect(res.body.email).to.equal(user.email);
          expect(res.body.cpf).to.equal(user.cpf);
          expect(res.body.password).to.equal(user.password);
          user = res.body;
          done();
        })
        .catch(done);
    });
   
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
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal("Email não encontrado.");
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
