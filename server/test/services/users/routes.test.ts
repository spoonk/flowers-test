import chai = require("chai");
import app from "../../../src/index";
import chaiHttp = require("chai-http");
import sinon from "sinon";
import User from "../../../src/models/user";

const { expect } = chai;
chai.use(chaiHttp);

const users = [
  {
    _id: "1",
    username: "jerry",
  },
];

sinon.stub(User, "find").resolves(users);

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const res = await chai.request(app).get("/users");
    expect(res).to.have.status(200);
    expect(res.body.users).to.exist;
    expect(res.body.users[0]._id).to.equal("1");
  });
});
