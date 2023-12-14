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

// test("blogs are returned as json", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// });

// test("All blogs are returned with current length", async () => {
//   const response = await api.get("/api/blogs");
//   expect(response.body).toHaveLength(helper.initialBlogss.length);
// });

// test("Verifies blog id property", async () => {
//   const response = await api.get("/api/blogs");
//   const blogs = response.body;

//   blogs.forEach((blog) => {
//     expect(blog._id).toBeDefined();
//   });
// });

// test("Create new post and make sure the post appears on DB", async () => {
//   const preInsertBlogs = await api.get("/api/blogs");

//   await api
//     .post("/api/blogs")
//     .send(helper.newBlog)
//     .expect(201)
//     .expect("Content-Type", /application\/json/);

//   const postInsertBlogs = await api.get("/api/blogs");
//   expect(postInsertBlogs.body).toHaveLength(preInsertBlogs.body.length + 1);

//   const lastElementIndex = postInsertBlogs.body.length - 1;
//   expect(postInsertBlogs.body[lastElementIndex].title).toEqual(
//     helper.newBlog.title
//   );
//   expect(postInsertBlogs.body[lastElementIndex].author).toEqual(
//     helper.newBlog.author
//   );
//   expect(postInsertBlogs.body[lastElementIndex].url).toEqual(
//     helper.newBlog.url
//   );
//   expect(postInsertBlogs.body[lastElementIndex].likes).toEqual(
//     helper.newBlog.likes
//   );
// });

test("Is Blog missing like property", async () => {
  res = await api.post("/api/blogs").send(helper.missingLikesBlog);
  expect(res.statusCode).toEqual(400);
  expect(res.body.error).toContain("Must have likes feild");
});

afterAll(async () => {
  await mongoose.connection.close();
});

// describe("when there is initially some blogs saved", () => {
// 	beforeEach(async () => {
// 		await Blog.deleteMany({});
// 		await Blog.insertMany(helper.initialBlogss);
// 	});

// 	test("blogs are returned as json with the current length", () => {
// 		const response = api.get("/api/blogs");
// 		response
// 			.expect(200)
// 			.expect("Content-Type", /application\/json/)
// 			.expect(response.body)
// 			.toHaveLength(helper.initialBlogss.length);
// 	});

// 	afterAll(async () => {
// 		await mongoose.connection.close();
// 	});
// });

// test('a valid blog can be added', async () => {
// 	const newBlog = helper.initialBlogss[0]

// 	await api
// 	  .post('/api/blogs')
// 	  .send(newBlog)
// 	  .expect(201)
// 	  .expect('Content-Type', /application\/json/)

// 	const response = await api.get('/api/blogs')

// 	const contents = response.body.map(r => r.content)

// 	expect(response.body).toHaveLength(initialNotes.length + 1)
// 	expect(contents).toContain(
// 	  'async/await simplifies making async calls'
// 	)
//   })

//   test('blog without content is not added', async () => {
// 	const newBlog =
// 		{
// 			author: 'Willam Jason',
// 			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// 			likes: 1,
// 			__v: 0,
// 		}

// 	await api
// 	  .post('/api/blogs')
// 	  .send(newBlog)
// 	  .expect(400)

// 	const response = await api.get('/api/newBlog')

// 	expect(response.body).toHaveLength(initialNotes.length)
//   })

//   test('a blog can be deleted', async () => {
// 	const blogsAtStart = await helper.initialBlogss()
// 	const blogToDelete = blogsAtStart[0]

// 	await api.delete(`/api/notes/${blogToDelete.id}`).expect(204);
// 	const blogsAtEnd = await helper.initialBlogss()

// 	expect(blogsAtEnd).toHaveLength(
// 	  helper.initialNotes.length - 1
// 	)

// 	const contents = blogsAtEnd.map(r => r.content)

// 	expect(contents).not.toContain(blogToDelete.content)
//   })
