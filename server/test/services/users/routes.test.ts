import chai = require("chai");
import app from "../../../src/index";
import chaiHttp = require("chai-http");
import sinon from "sinon";
import User from "../../../src/models/user";
import mongoose from "mongoose";

const { expect } = chai;
chai.use(chaiHttp);

const users = [
  {
    _id: "1",
    username: "jerry",
  },
];

sinon.stub(User, "find").resolves(users);

// stub saving
// sinon.stub(mongoose.Model.prototype, "save");
sinon.stub(User.prototype, "save");

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const res = await chai.request(app).get("/users");
    expect(res).to.have.status(200);
    expect(res.body.users).to.exist;
    expect(res.body.users[0]._id).to.equal("1");
  });
});

describe("POST /adduser", () => {
  it("should save a user to the database", async () => {
    const res = await chai
      .request(app)
      .post("/addUser")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        username: "un",
        email: "em",
        password: "pwd",
      });

    expect(res).to.have.status(200);
    expect(res.body.newUserId).to.exist;
  });

  it("should fail if no username", async () => {
    const res = await chai
      .request(app)
      .post("/addUser")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        email: "em",
        password: "pwd",
      });

    expect(res).to.have.status(400);
  });

  it("should fail if no email", async () => {
    const res = await chai
      .request(app)
      .post("/addUser")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        username: 'un',
        password: "pwd",
      });

    expect(res).to.have.status(400);
  });

  it("should fail if no password", async () => {
    const res = await chai
      .request(app)
      .post("/addUser")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        username: 'un',
        email: "em",
      });

    expect(res).to.have.status(400);
  });
});
