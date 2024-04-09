const mostBlogs = require("../utils/list_helper").mostBlogs;

describe("most blogs", () => {
  const listWithMoreThanOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1111",
      title: "Random Title",
      author: "Alan Turing",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Turing01.pdf",
      likes: 10,
      __v: 0,
    },
  ];

  test("of empty list is null", () => {
    result = mostBlogs([]);
    expect(result).toBe(null);
  });

  test("of a list with one blog is that author", () => {
    result = mostBlogs(listWithMoreThanOneBlog.slice(0, 1));
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
  });

  test("of a bigger list is the author with the most blogs", () => {
    const extraBlog = {
      _id: "5a422aa71b54a676234d1112",
      title: "Another Random Title",
      author: "Alan Turing",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Turing01.pdf",
      likes: 10,
      __v: 0,
    };
    const listWithTwoBlogsOfTuring = [...listWithMoreThanOneBlog, extraBlog];
    result = mostBlogs(listWithTwoBlogsOfTuring);
    expect(result).toEqual({ author: "Alan Turing", blogs: 2 });
  });

  test("Of a list with the same ammount of blogs returns the first one", () => {
    const result = mostBlogs(listWithMoreThanOneBlog);

    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
  });
});
