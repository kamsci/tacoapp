var expect = require("chai").expect;
var request = require("supertest");
var app = require("../index");
var db = require("../models");
/////////////////////////////////////

// Run before tests are run
before(function(done) {
  // make sure db is created
  // .sync is sequelize, not chai
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

// Run each time a test is run
describe("GET /tacos", function(){
  it("should return a 200 response", function(done) {
    request(app).get("/tacos").expect(200, done);
  });
});

describe("POST /tacos", function(){
  it("should create a taco and redirect to /tacos", function(done) {
    request(app).post("/tacos")
      .type("form")
      .send({
        name: "Cheesy Gordita Crunch",
        amount: 3
      })
      .expect("location", "/tacos")
      .expect(302, done);
  });
});

// DELETE tests
describe("DELETE /tacos/:id", function() {
  it("should delete a taco and send a success msg and return a 200 response", function(done){
    request(app).delete("/tacos/1")
      .end(function(err, response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property("msg");
        expect(response.body.msg).to.equal("success");
      });
      done();
  });
  it("should return an error if there is no taco", function(done) {
    request(app).delete("/tacos/0")
      .end(function(err, response) {
        expect(response.statusCode).to.equal(404);
        expect(response.body).to.have.property("msg");
        expect(response.body.msg).to.equal("error");
        done();
      });
  });
});

//// Create taco for PUT & GET tests below ////
describe("POST /tacos", function(){
  it("should create a taco and redirect to /tacos", function(done) {
    request(app).post("/tacos")
      .type("form")
      .send({
        name: "Cheesy Gordita Crunch",
        amount: 3
      })
      .expect("Location", "/tacos")
      .expect(302, done);
  });
});
////

// PUT test
describe("PUT /tacos/:id", function(){
  it("should update a taco and return a success msg and a response", function(done){
    request(app).put("/tacos/2")
      .type("form")
      .send({
        name: "Gordita"
      }).end(function(err, response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property("msg");
        expect(response.body.msg).to.equal("success");
        done();
      });
  }); // end test
  it("should return an error if there is no taco to update", function(done){
    request(app).put("/tacos/0")
      .end(function( err, response) {
        expect(response.statusCode).to.equal(404);
        expect(response.body).to.have.property("msg");
        expect(response.body.msg).to.equal("error");
        done();
      });
  });
});

// GET test for /tacos/new
describe("GET /tacos/new", function(){
  it("should render to new taco form and give response of 200", function(done){
    request(app).get("/tacos/new").expect(200, done);
  });
});

// GET test for /tacos/:id/edit
describe("GET /tacos/:id/edit", function(){
  it("should find a taco by the id given and render a page", function(done){
    request(app).get("/tacos/2/edit")
      .expect(200, done);
  });
  it("should send an error if no taco found", function(done){
    request(app).get("/tacos/0/edit")
      .expect(404, done);
  });
});
describe("GET /tacos/:id", function(){
  it("if taco exists, go to taco:id page", function(done) {
    request(app).get("/tacos/2")
      .expect(200, done);
  });
  it("if taco does not exist, go to error", function(done) {
    request(app).get("/taco/0")
      .expect(404, done);
  });
});
