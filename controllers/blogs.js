const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blog = await Blog.find({}).populate("user");
  response.json(blog);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (!body.title || !body.url) {
    response.status(400).end();
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user._id,
  });

  const savedBlog = await blog.save();
  request.user.blogs = request.user.blogs.concat(savedBlog._id);
  await request.user.save();

  const populatedBlog = await savedBlog.populate("user", { username: 1 });

  response.status(201).json(populatedBlog);
  // response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    if (!request.user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== request.user.id) {
      return response.status(401).json({ error: "unauthorized user" });
    }

    await Blog.findByIdAndDelete(request.params.id);

    const user = await User.findById(request.user.id);
    user.blogs = user.blogs.filter(
      (blog) => blog.id.toString() !== request.params.id
    );
    await user.save();

    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const updatedLikes = body.likes;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: updatedLikes },
    { new: true }
  );
  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
