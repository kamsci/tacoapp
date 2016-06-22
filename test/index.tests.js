var expect = require("chai").expect;
// ??instead of going out and getting require data, stay in our test env??
var request = require("supertest");
var app = require("../index.js");
/////////////////////////////////

describe("GET /", function() {
  // tests go here
  it("should return a 200 response", function(done) {
    request(app).get("/").expect(200, done);
  });
});
