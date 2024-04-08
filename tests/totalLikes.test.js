const totalLikes = require("../utils/list_helper").totalLikes;

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("of empty list is zero", () => {
    const blogs = [];
    const result = totalLikes(blogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when a list has more than one blog, the result is correct", () => {
    let listWithMoreThanOneBlog = [...listWithOneBlog];
    listWithMoreThanOneBlog.push({
      _id: "5a422aa71b54a676234d1111",
      title: "Some Random Title",
      author: "Alan Turing",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Turing69.pdf",
      likes: 10,
      __v: 0,
    });

    const result = totalLikes(listWithMoreThanOneBlog);
    expect(result).toBe(15);
  });
});
