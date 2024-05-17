import type { Movie } from "../model/Movie";
import { chain } from "./functional";

const validateTitle = (movie: Movie) => {
  if (!movie.title) {
    throw new Error("Movie title is required");
  }
};

const validateDirector = (movie: Movie) => {
  if (!movie.director) {
    throw new Error("Movie director is required");
  }
};

const validateRating = (movie: Movie) => {
  if (!movie.rating) {
    throw new Error("Movie rating is required");
  }

  if (movie.rating < 0 || movie.rating > 10) {
    throw new Error("Movie rating must be between 1 and 10");
  }
};

const validateRelease = (movie: Movie) => {
  if (!movie.release) {
    throw new Error("Movie release is required");
  }

  if (movie.release > new Date().getFullYear()) {
    throw new Error("Movie release must be in the past");
  }

  if (movie.release < 1900) {
    throw new Error("Movie release must be after 1900");
  }
};

const validateGenre = (movie: Movie) => {
  if (!movie.genre) {
    throw new Error("Movie genre is required");
  }
};

const validateId = (id: string | null) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!id) {
    throw new Error("Movie id is required");
  }

  if (uuidRegex.test(id) === false) {
    throw new Error("Movie id is not valid");
  }
};

const validateMovie = chain(validateTitle, validateDirector, validateRating, validateRelease, validateGenre);

export { validateId, validateMovie, validateDirector, validateGenre, validateTitle };
