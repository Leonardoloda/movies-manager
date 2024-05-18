import { MovieRepository } from "../database/movieRepository";
import type { Movie } from "../model/Movie";
import { validateId, validateMovie } from "../utils/validators";

export type OperationResult = {
  message: string;
  payload?: {
    [key: string]: any;
  };
};
export interface MovieOperations {
  createMovie: (movie: Partial<Movie>) => Promise<Movie>;
  readMovie: (id: string) => Promise<Movie>;
  readMovies: () => Promise<Movie[]>;
  updateMovie: (id: string, movie: Partial<Movie>) => Promise<Movie>;
  deleteMovie: (id: string) => Promise<boolean>;
}

export const movieController = (movieRepository: Partial<MovieRepository>): MovieOperations => ({
  async createMovie(movie) {
    validateMovie(movie);

    const createdMovie = await movieRepository.create(movie as Movie);

    return createdMovie;
  },

  async deleteMovie(id) {
    validateId(id);

    await movieRepository.deleteOne(id);

    return true;
  },

  async readMovie(id) {
    validateId(id);
    const movie = await movieRepository.getOne(id);

    return movie;
  },

  async readMovies() {
    const movies = await movieRepository.getAll();

    return movies;
  },

  async updateMovie(id, movie) {
    validateId(id);

    const updatedMovie = await movieRepository.update(id, movie);

    return updatedMovie;
  },
});
