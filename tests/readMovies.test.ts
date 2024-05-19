import { readMovies } from "..";
import { movieRepository } from "../src/database/movieRepository";
import { v4 as uuid } from "uuid";
import type { Movie } from "../src/model/Movie";

describe("readMovies", () => {
  const movie: Movie = {
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

  it("should get all the stored movies", async () => {
    const response = await readMovies();

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual([movie]);
  });

  it("should return an empty array when there isn't a stored movie", async () => {
    await movieRepository.deleteOne(movie.id);

    const response = await readMovies();

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body).length).toEqual(0);
  });
});
