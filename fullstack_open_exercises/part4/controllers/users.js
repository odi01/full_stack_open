const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  try {
    const { username, name, password, blogs } = request.body;

    if (!password) {
      const errMsg = "`password` is required";
      console.error("Validation error:", errMsg);
      response.status(400).json({ error: errMsg });
    }

    if (password.length < 3) {
      const errMsg = "password must be at least 3 characters long";
      console.error("Validation error:", errMsg);
      response.status(400).json({ error: errMsg });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
      blogs,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    // console.error("Validation error:", error.message);
    response.status(400).json({ error: error.message });
  }
});

usersRouter.delete("/:id", async (request, response) => {
  try {
    const deleted = await User.findByIdAndDelete(request.params.id);
    if (!deleted) {
      response.status(404).json({ error: "user not found" });
    }
    response.status(204).json({ status: "user has been deleted" });
  } catch (error) {
    console.error("Failed to delete:", error.message);
    response.status(400).json({ error: error.message });
  }
});

usersRouter.patch("/:id", async (request, response) => {
  try {
    const { blogs } = request.body;

    if (!blogs) {
      const errMsg = "`blogs` field is required for update";
      console.error("Validation error:", errMsg);
      response.status(400).json({ error: errMsg });
    }

    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      { blogs },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      response.status(404).json({ error: "user not found" });
    }

    response.json(updatedUser);
  } catch (error) {
    console.error("Failed to update:", error.message);
    response.status(400).json({ error: error.message });
  }
});

module.exports = usersRouter;
