import chai = require("chai");
import app from "../../../src/index";
import chaiHttp = require("chai-http");
import sinon from "sinon";
import * as habitController from "../../../src/services/habits/controllers/habitController";

const { expect } = chai;
chai.use(chaiHttp);

const habits = [
  {
    id: "1",
    name: "jump",
  },
];

// @note: these tests will be boring until the routes handle validation
sinon.stub(habitController, "completeHabit").resolves(undefined);
sinon.stub(habitController, "getHabits").resolves(habits);
sinon.stub(habitController, "addHabit").resolves(undefined);

describe("GET /habits", () => {
  it("should return a list of habits", async () => {
    const res = await chai.request(app).get("/habits");
    expect(res).to.have.status(200);
    expect(res.body.habits).to.exist;
    expect(res.body.habits[0].id).to.equal("1");
  });
});

describe("POST /addHabit", () => {
  it("should add the new habit", async () => {
    const res = await chai
      .request(app)
      .post("/addHabit")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ userId: "12", name: "name", description: "description" });

    expect(res).to.have.status(200);
    expect(res.body.success).to.equal(true);
  });
});

describe("POST /completeHabit", () => {
  it("should complete the habit", async () => {
    const res = await chai
      .request(app)
      .post("/addHabit")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ userId: "12", habitId: "1" });

    expect(res).to.have.status(200);
    expect(res.body.success).to.equal(true);
  });
});
