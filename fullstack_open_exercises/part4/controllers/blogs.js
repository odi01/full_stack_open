const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		return authorization.replace("Bearer ", "");
	}
	return null;
};

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
	// if ("likes" in request.body === false) {
	//   console.log("Adding likes property equal to: 0");
	//   request.body["likes"] = 0;
	// }
	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" });
	}
	try {
		const user = await User.findById(decodedToken.id);

		request.body.user = user._id;
		const blog = new Blog(request.body);
		const savedBlog = await blog.save();

		// Save the blog id to the user object
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

		response.status(201).json(savedBlog);
	} catch (error) {
		console.error("Validation error:", error.message);
		response.status(400).json({ error: error.message });
	}
});

blogsRouter.get("/:id", async (request, response, next) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.delete("/:id", async (request, response) => {
	try {
		await Blog.findByIdAndDelete(request.params.id);
		response.status(204).end();
	} catch (error) {
		console.error("Failed to delete:", error.message);
		response.status(400).json({ error: error.message });
	}
});

blogsRouter.put("/:id", async (request, response) => {
	const blog = {
		likes: request.body.likes,
	};

	try {
		updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
			new: true,
		});
		if (updatedBlog === null || updatedBlog === undefined) {
			throw new Error("Blog not exists");
		}
		response.status(201).json(updatedBlog);
	} catch (error) {
		console.error("Failed to update blog:", error.message);
		response.status(400).json({ error: error.message });
	}
});

module.exports = blogsRouter;
