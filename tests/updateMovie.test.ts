import { updateMovie } from "..";
import { movieRepository } from "../src/database/movieRepository";
import type { Movie } from "../src/model/Movie";
import { v4 as uuid } from "uuid";

describe("updateMovie", () => {
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

  it("should update all the fields in a movie", async () => {
    const updatedMovie: Movie = {
      id: movie.id,
      title: "updated title",
      director: "updated director",
      release: 2021,
      genre: "THRILLER",
      rating: 4,
    };

    const response = await updateMovie({
      pathParameters: {
        id: movie.id,
      },
      body: JSON.stringify(updatedMovie),
    });

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual(updatedMovie);
  });

  it("should throw an error when using the wrong path parameter format", async () => {
    await expect(async () =>
      updateMovie({
        pathParameters: {
          id: "1",
        },
      }),
    ).rejects.toThrow(new Error("Movie id is not valid"));
  });
});
