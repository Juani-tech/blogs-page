const mostLikes = require("../utils/list_helper").mostLikes;

describe("most likes", () => {
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
    result = mostLikes([]);
    expect(result).toBe(null);
  });

  test("of a list with one blog are the likes that blog", () => {
    const logSpy = jest.spyOn(global.console, "log");

    result = mostLikes(listWithMoreThanOneBlog.slice(0, 1));
    logSpy.mockRestore();
    expect(result).toEqual(listWithMoreThanOneBlog.slice(0, 1)[0]);
  });

  test("of a list with more than one blog is the one with most likes", () => {
    result = mostLikes(listWithMoreThanOneBlog);
    expect(result).toEqual(listWithMoreThanOneBlog[1]);
  });

  test("of a list with multiple blogs gets result correctly", () => {
    const listWithOneMoreBlogFromDijkstra = [
      ...listWithMoreThanOneBlog,
      {
        _id: "5a422aa71b54a676234d1234",
        title: "Go To Statement Considered Good?",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra69.pdf",
        likes: 200,
        __v: 0,
      },
    ];
    result = mostLikes(listWithMoreThanOneBlog);
    expect(result).toEqual(listWithMoreThanOneBlog[1]);
  });
});
