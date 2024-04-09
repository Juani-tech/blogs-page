const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentBlog) => accumulator + currentBlog.likes,
    0
  );
};

// Define una nueva función favoriteBlog que recibe una lista de blogs como parámetro. La función descubre qué blog tiene más me gusta. Si hay muchos favoritos, basta con devolver uno de ellos.
const favoriteBlog = (blogs) => {
  if (blogs.length == 0) {
    return null;
  }
  const resultWithReduce = blogs.reduce(
    (mostLiked, currentBlog) =>
      currentBlog.likes > mostLiked.likes ? currentBlog : mostLiked,
    blogs[0]
  );
  return resultWithReduce;
};

//Define una función llamada mostBlogs que reciba una lista de blogs como parámetro. La función devuelve el author que tiene la mayor cantidad de blogs. El valor de retorno también contiene el número de blogs que tiene el autor principal:

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authors = blogs.map((blog) => blog.author);
  const result = lodash.maxBy(
    lodash.keys(lodash.countBy(authors)),
    (author) => lodash.countBy(authors)[author]
  );
  return { author: result, blogs: lodash.countBy(authors)[result] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
