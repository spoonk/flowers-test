import chai = require("chai");
import app from "../../../src/index";
import chaiHttp = require("chai-http");
import sinon from "sinon";
import * as gardenController from "../../../src/services/garden/controllers/gardenController";

const { expect } = chai;
chai.use(chaiHttp);

const TEST_GARDEN = {
  garden: {
    user: "user",
    flowers: [
      {
        flowerId: "123",
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ],
  },
};

sinon.stub(gardenController, "getGarden").resolves(TEST_GARDEN);

describe("GET /garden", () => {
  it("should return the garden for the user", async () => {
    const res = await chai.request(app).get("/garden");
    expect(res).to.have.status(200);
    expect(res.body.garden).to.exist;
    expect(res.body.garden.user).to.equal("user");
  });
});
