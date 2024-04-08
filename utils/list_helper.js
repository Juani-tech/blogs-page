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
module.exports = { dummy, totalLikes, favoriteBlog };
