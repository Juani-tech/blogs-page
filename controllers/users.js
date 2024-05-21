const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || username.length < 3) {
    return response.status(400).json({
      error: "username missing or too short",
    });
  }
  // La validacion tiene que hacerse aca porque en la db se guarda el hash
  if (!password || password.length < 3) {
    return response.status(400).json({
      error: "password missing or too short",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

module.exports = usersRouter;
