const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
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

afterAll(() => {
  mongoose.connection.close();
});
