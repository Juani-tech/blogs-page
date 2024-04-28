const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const User = require("../models/user");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

describe("creation of user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("1234", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("fails with status 400 if username is invalid", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ao",
      name: "Ao",
      password: "password123",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });

  test("fails with status 400 if password is invalid", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ao",
      name: "Ao",
      password: "12",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });

  test("fails with status 400 if username already exists", async () => {
    const usersAtStart = await helper.usersInDb();
    const user = usersAtStart[0];

    await api.post("/api/users").send(user).expect(400);
  });
});
