require("dotenv").config();
const mongoose = require("mongoose");
const Person = require("../models/person");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { describe } = require("mocha");
const should = chai.should();

chai.use(chaiHttp);
describe("Person", () => {
  beforeEach((done) => {
    Person.deleteMany({}, (err) => {
      done();
    });
  });

  describe("/GET person", () => {
    it("it shoud GET all the persons", (done) => {
      chai
        .request(app)
        .get("/api/persons")
        .end((err, res) => {
          res.body.persons.should.be.a("array");
          res.body.persons.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST person", () => {
    it("it should not POST a person without a name", (done) => {
      let person = {};
      chai
        .request(app)
        .post("/api/persons")
        .send(person)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have.property("message");
          done();
        });
    });
    it("it should POST a person ", (done) => {
      let person = {
        name: "Test name",
      };
      chai
        .request(app)
        .post("/api/persons")
        .send(person)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have
            .property("name")
            .eql("Test name");
          done();
        });
    });
  });
});
