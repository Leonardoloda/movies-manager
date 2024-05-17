import { deleteMovie } from "..";
import { movieRepository } from "../src/database/movieRepository";
import { v4 as uuid } from "uuid";
import type { Movie } from "../src/model/Movie";

describe("deleteMovie", () => {
  let movie: Movie = {
    id: uuid(),
    title: "title",
    director: "director",
    release: 2020,
    genre: "ACTION",
    rating: 5,
  };

  beforeAll(async () => {
    process.env.MOVIES_TABLE = "Test";

    await movieRepository.create(movie);
  });

  afterAll(async () => {
    await movieRepository.deleteOne(movie.id);
  });

  it("should throw an error when using the wrong path parameter format", async () => {
    await expect(async () =>
      deleteMovie({
        pathParameters: {
          id: "1",
        },
      }),
    ).rejects.toThrow(new Error("Movie id is not valid"));
  });

  it("should delete a movie from the database", async () => {
    await deleteMovie({
      pathParameters: {
        id: movie.id,
      },
    });

    expect(await movieRepository.getOne(movie.id)).toBeFalsy();
  });
});
