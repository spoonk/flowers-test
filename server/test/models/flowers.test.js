const { expect } = require("chai");
const mongoose = require("mongoose");

const Flower = require("../../src/models/flowers");

describe("Flower model test", () => {
  // @todo: figure out async fn call, I don't like done..
  before((done) => {
    // @todo: env variable
    mongoose.connect("mongodb://localhost:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", () => {
      console.log("connected to test database");
      done();
    });
  });

  after((done) => {
    // Disconnect after all tests are done
    mongoose.connection.close(() => {
      console.log("Disconnected from test database");
      done();
    });
  });

  beforeEach(async () => {
    // Clear the User collection before each test
    await Flower.deleteMany({});
  });

  it("should create a new flower", async () => {
    const flowerData = { name: "test_flower" };
    const newFlower = new Flower(flowerData);
    const savedFlower = await newFlower.save();

    expect(savedFlower._id).to.exist;
    expect(savedFlower.name).to.equal(flowerData.name);
  });
});
