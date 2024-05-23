const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  },
  {
    title: "Random Title",
    author: "Alan Turing",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Turing01.pdf",
    likes: 10,
  },
];

// Funcion que crea un nuevo objeto blog, lo guarda en la base de datos y luego lo elimina para obtener un nuevo id
const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const createTestUser = async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("password", 10);
  const user = new User({ username: "testuser", passwordHash });
  await user.save();
  return user;
};

const initializeBlogs = async () => {
  await Blog.deleteMany({}); // Limpia la colección de blogs
  const testUser = await createTestUser(); // Crea el usuario de prueba

  initialBlogs.forEach((blog) => (blog.user = testUser._id));

  const blogPromises = initialBlogs.map((blog) => new Blog(blog).save());
  await Promise.all(blogPromises);
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  createTestUser,
  initializeBlogs,
};
