const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");

// beforeEach(async () => {
//   await Blog.deleteMany({});

//   for (let blog of helper.initialBlogs) {
//     let blogObject = new Blog(blog);
//     await blogObject.save();
//   }
// });

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blogs have an id", async () => {
  const response = await api.get("/api/blogs");

  const blog = response.body[0];

  expect(blog.id).toBeDefined();
});

test("blogs are posted correctly", async () => {
  const newBlog = {
    title: "async/await refactors",
    author: "Juani",
    url: "https://someurl.com",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  const authors = blogsAtEnd.map((blog) => blog.author);
  const urls = blogsAtEnd.map((blog) => blog.url);
  const likes = blogsAtEnd.map((blog) => blog.likes);

  expect(titles).toContain("async/await refactors");
  expect(authors).toContain("Juani");
  expect(urls).toContain("https://someurl.com");
  expect(likes).toContain(7);
});

test("undefined likes are saved as zero", async () => {
  const newBlog = {
    title: "async/await refactors",
    author: "Juani",
    url: "https://someurl.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const likes = blogsAtEnd.map((blog) => {
    return blog.likes;
  });

  expect(likes).toContain(0);
});

test("undefined title or url gets 400 status code", async () => {
  const newBlog = {
    title: "async/await refactors",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("succeds with status 204 if id is valid when deleting a blog", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titlesPostDelete = blogsAtEnd.map((blog) => {
    return blog.title;
  });

  expect(titlesPostDelete).not.toContain(blogToDelete.title);
});

test("changing likes if id is valid succeds with status 200", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToModify = blogsAtStart[0];
  const updatedBlogData = { likes: 200 };
  await api
    .put(`/api/blogs/${blogToModify.id}`)
    .send(updatedBlogData)
    .expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  const likesAtEnd = blogsAtEnd.map((blog) => blog.likes);

  expect(likesAtEnd).toContain(200);
});

afterAll(() => {
  mongoose.connection.close();
});
