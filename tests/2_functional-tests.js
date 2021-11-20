const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

 // Solve a puzzle with valid puzzle string: POST request to /api/solve
 test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, "218396745753284196496157832531672984649831257827549613962415378185763429374928561");

          done();
        });
    });

//Solve a puzzle with missing puzzle string: POST request to /api/solve
test("Solve a puzzle with missing puzzle string: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({puzzle: ""})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field missing");

          done();
        });
    });
//Solve a puzzle with invalid characters: POST request to /api/solve
test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({puzzle: "..B39.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid characters in puzzle");

          done();
        });
    });
//Solve a puzzle with incorrect length: POST request to /api/solve
test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...11"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");

          done();
        });
    });
//Solve a puzzle that cannot be solved: POST request to /api/solve
test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({puzzle: "8.839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Puzzle cannot be solved");

          done();
        });
    });
//Check a puzzle placement with all fields: POST request to /api/check
test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ coordinate : "A1",
        value: 1,
          puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, true);

          done();
        });
    });
//Check a puzzle placement with single placement conflict: POST request to /api/check
test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ coordinate : "A1",
        value: 6,
          puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.deepEqual(res.body.conflict, ["column"]);


          done();
        });
    });
//Check a puzzle placement with multiple placement conflicts: POST request to /api/check
test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ coordinate : "A1",
        value: 8,
          puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.deepEqual(res.body.conflict, ["row", "region"]);

          done();
        });
    });
//Check a puzzle placement with all placement conflicts: POST request to /api/check
test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ coordinate : "A8",
        value: 9,
          puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.deepEqual(res.body.conflict, ["row","column","region"]);

          done();
        });
    });
//Check a puzzle placement with missing required fields: POST request to /api/check
test("Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ coordinate : "",
        value: "",
          puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Required field(s) missing');

          done();
        });
    });
//Check a puzzle placement with invalid characters: POST request to /api/check
test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ coordinate : "A8",
        value: 9,
          puzzle: "..B39.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid characters in puzzle');

          done();
        });
    });
//Check a puzzle placement with incorrect length: POST request to /api/check
test("Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ coordinate : "A8",
        value: 9,
          puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...11"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');

          done();
        });
    });
//Check a puzzle placement with invalid placement coordinate: POST request to /api/check
test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ coordinate : "A0",
        value: 9,
          puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid coordinate');

          done();
        });
    });
//Check a puzzle placement with invalid placement value: POST request to /api/check
test("Check a puzzle placement with invalid placement value: POST request to /api/check", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ coordinate : "A8",
        value: "X",
          puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid value');

          done();
        });
    });

});

