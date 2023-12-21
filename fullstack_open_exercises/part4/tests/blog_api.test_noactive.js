const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogss);
}, 50000);

describe("Valid Blogs Return", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("Blogs are returned with the correct length", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(helper.initialBlogss.length);
	});

	test("Blogs have id property", async () => {
		const response = await api.get("/api/blogs");
		const blogs = response.body;
		blogs.forEach((blog) => {
			expect(blog._id).toBeDefined();
		});
	});
});

describe("Addition of a new blog", () => {
	test("Successful insert with valid data", async () => {
		const preInsertBlogs = await api.get("/api/blogs");

		await api
			.post("/api/blogs")
			.send(helper.newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const postInsertBlogs = await api.get("/api/blogs");
		expect(postInsertBlogs.body).toHaveLength(preInsertBlogs.body.length + 1);

		const lastElementIndex = postInsertBlogs.body.length - 1;
		expect(postInsertBlogs.body[lastElementIndex].title).toEqual(
			helper.newBlog.title
		);
		expect(postInsertBlogs.body[lastElementIndex].author).toEqual(
			helper.newBlog.author
		);
		expect(postInsertBlogs.body[lastElementIndex].url).toEqual(
			helper.newBlog.url
		);
		expect(postInsertBlogs.body[lastElementIndex].likes).toEqual(
			helper.newBlog.likes
		);
	});

	test("Failed with missing likes", async () => {
		res = await api.post("/api/blogs").send(helper.noLikesBlog);
		expect(res.statusCode).toEqual(400);
		expect(res.body.error).toContain("validation failed");
	});

	test("Failed with missing title", async () => {
		res = await api.post("/api/blogs").send(helper.noTileBlog);
		expect(res.statusCode).toEqual(400);
		expect(res.body.error).toContain("validation failed");
	});

	test("Failed with missing url", async () => {
		res = await api.post("/api/blogs").send(helper.noUrlBlog);
		expect(res.statusCode).toEqual(400);
		expect(res.body.error).toContain("validation failed");
	});
});

describe("Deletion opreations", () => {
	test("Successful blog deletion", async () => {
		const preDeleteBlogs = await api.get("/api/blogs");

		res = await api.delete(`/api/blogs/${helper.initialBlogss[0]._id}`);
		expect(res.statusCode).toEqual(204);

		const postDeleteBlogs = await api.get("/api/blogs");
		expect(postDeleteBlogs.body).toHaveLength(preDeleteBlogs.body.length - 1);
	});

	test("Failed blog deletion", async () => {
		const preDeleteBlogs = await api.get("/api/blogs");

		res = await api.delete(`/api/blogs/1`);
		expect(res.statusCode).toEqual(400);

		const postDeleteBlogs = await api.get("/api/blogs");
		expect(postDeleteBlogs.body).toHaveLength(preDeleteBlogs.body.length);
	});
});

describe("Update opreations", () => {
	test("Successful updated a blog", async () => {
		res = await api
			.put(`/api/blogs/${helper.initialBlogss[0]._id}`)
			.send({ likes: 10 });
		expect(res.statusCode).toEqual(201);
		expect(res.body.likes).toEqual(10);
	});

	test("Failed to update blog", async () => {
		res = await api.put("/api/blogs/0").send({ likes: 10 });
		expect(res.statusCode).toEqual(400);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
