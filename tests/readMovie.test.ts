import { readMovie } from "..";
import { movieRepository } from "../src/database/movieRepository";
import { v4 as uuid } from "uuid";
import { Movie } from "../src/model/Movie";

describe("readMovie", () => {
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
      readMovie({
        pathParameters: {
          id: "1",
        },
      }),
    ).rejects.toThrow(new Error("Movie id is not valid"));
  });

  it("should fetch a movie by id", async () => {
    const result = await readMovie({
      pathParameters: {
        id: movie.id,
      },
    });

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).toEqual(movie);
  });

  it("should fetch a movie not stored in the database", async () => {
    const response = await readMovie({
      pathParameters: {
        id: uuid(),
      },
    });

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual({});
  });
});
