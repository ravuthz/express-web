var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:7001");
var link = "/api/users";

// UNIT test begin

const shouldSuccess = (err, res) => {
  if (err) {
    console.log(err);
  }
  // HTTP status should be 200
  //  res.status.should.equal(200);
  // Error key should be false.
  //  res.error.should.equal(false);
  should(res).property('status', 200)
  should(res).property('error', false);
}

describe("Users unit test for rest api", function() {

  it("should return list of users with pagination", function(done) {

    // calling home page api 
    // ?page=2&size=1&sort[id]=ASC
    server
    .get(link + '?page=2&size=1&sort=id&fields=username,email,phone')
    .expect("Content-type", /json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res) {

        // console.log(res.body);
        shouldSuccess(err, res);

        // res.body.should.have.property('total').and.to.be.a('number');
        // res.body.should.have.property('total').equal(4);
        // res.body.total.should.equal(4);

        // const length = res.body.items.length;

        should(res.body).have.keys('total', 'items', 'totalPages', 'currentPage');

        // The res.body should have json property 'total' with type number and value not 0
        should(res.body).have.property('total')
            .which.is.a.Number()
            .with.aboveOrEqual(0);

        // The res.body should have json property 'items' with type array and value not 0
        should(res.body).have.property('items')
            .which.is.a.Array()
            .with.not.empty();
            // .with.lengthOf(1);

        should(res.body).have.property('totalPages')
            .which.is.a.Number()
            .aboveOrEqual(0);

        should(res.body).have.property('currentPage')
            .which.is.a.Number()
            .aboveOrEqual(1);

        // res.body.total.should.not.equal(0);
        // res.body.total.should.equal(length);

        // res.body.should.have.property('total', length);
        // res.body.should.have.property('items').with.lengthOf(length);
        // res.body.should.have.property('totalPages', 1);
        // res.body.should.have.property('currentPage', 1);

        done();
    });
  });

  it("should return 404 of user 0", function(done) {
    server
      .get(link + "/0")
      .expect("Content-type", /json/)
      .expect(404) // THis is HTTP response
      .end(function(err, res) {
          should(res).property('status', 404)
          should(res).property('error').not.empty();
          done();
      });
  });

  it("should return 200 of user 2", function(done) {
    server
      .get(link + "/2")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function(err, res) {
        shouldSuccess(err, res);
        done();
      });
  });

  it("should return user after created", (done) => {
    const data = {
      "username": "test1",
      "password": "123123",
      "email": "test1@gmail.com",
      "phone": "+855964577779"
    };
    server
      .post(link)
      .send(data)
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        shouldSuccess(err, res);
        done();
      });
  });

  it("should return user after updated", (done) => {
    const data = {
      "username": "test2",
      "password": "123123",
      "email": "adminz@gmail.com",
      "phone": "+855964577779"
      // "createdAt": new Date(),
      // "updatedAt": new Date()
    };
    server
      .put(link + "/4")
      .send(data)
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function(err, res) {
        shouldSuccess(err, res);
        done();
      });
  });

});