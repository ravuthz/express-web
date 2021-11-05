var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:7001");

describe("Main unit test", function() {

  it("should return home page", function(done) {
    server
    .get("/")
    .expect("Content-type", /json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.error.should.equal(false);
        done();
    });
  });

});