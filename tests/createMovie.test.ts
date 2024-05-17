import { createMovie } from "..";
import { movieRepository } from "../src/database/movieRepository";
import { v4 as uuid } from "uuid";
import type { Movie } from "../src/model/Movie";

describe("createMovie", () => {
  const movie: Movie = {
    id: uuid(),
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    release: 1994,
    genre: "ACTION",
    rating: 10,
  };

  beforeAll(() => {
    process.env.MOVIES_TABLE = "Test";
  });

  afterAll(async () => {
    await movieRepository.deleteOne(movie.id);
  });

  it("should create a new movie", async () => {
    const response = await createMovie({
      body: JSON.stringify(movie),
    });

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual(movie);
  });

  it("should fail when creating a movie with a rating lower than 0", async () => {
    await expect(async () =>
      createMovie({
        body: JSON.stringify({
          ...movie,
          rating: -1,
        }),
      }),
    ).rejects.toThrow(new Error("Movie rating must be between 1 and 10"));
  });

  it("should fail when creating a movie with a rating higher than 10", async () => {
    await expect(async () =>
      createMovie({
        body: JSON.stringify({
          ...movie,
          rating: 11,
        }),
      }),
    ).rejects.toThrow(new Error("Movie rating must be between 1 and 10"));
  });

  it("should fail when missing a payload", async () => {
    await expect(async () => createMovie({ body: {} })).rejects.toThrow(new Error("Movie title is required"));
  });

  it("should fail when missing a required parameter", async () => {
    await expect(async () =>
      createMovie({
        body: JSON.stringify({
          ...movie,
          director: null,
        }),
      }),
    ).rejects.toThrow(new Error("Movie director is required"));
  });
});
