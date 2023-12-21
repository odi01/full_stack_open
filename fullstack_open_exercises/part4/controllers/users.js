const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

usersRouter.post("/", async (request, response) => {
	try {
		const { username, name, password } = request.body;

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
		});

		const savedUser = await user.save();

		response.status(201).json(savedUser);
	} catch (error) {
		// console.error("Validation error:", error.message);
		response.status(400).json({ error: error.message });
	}
});

module.exports = usersRouter;
