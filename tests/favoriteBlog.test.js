const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("favorite blog", () => {
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
    result = favoriteBlog([]);
    expect(result).toBe(null);
  });

  test("of a list with one blog is that blog", () => {
    result = favoriteBlog(listWithMoreThanOneBlog.slice(0, 1));
    expect(result).toEqual(listWithMoreThanOneBlog.slice(0, 1)[0]);
  });

  test("of a list with more than one blog is the one with most likes", () => {
    result = favoriteBlog(listWithMoreThanOneBlog);
    expect(result).toEqual(listWithMoreThanOneBlog[1]);
  });

  test("of a list with even likes is the first one", () => {
    const listWithEvenLikes = [...listWithMoreThanOneBlog];
    listWithEvenLikes[1].likes = 5;

    result = favoriteBlog(listWithEvenLikes);
    expect(result).toEqual(listWithEvenLikes[0]);
  });
});
