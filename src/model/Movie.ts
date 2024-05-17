export type GENRE = "FICTION" | "ACTION" | "THRILLER";

export type Movie = {
  id?: string;
  title: string;
  director: string;
  release: number;
  genre: GENRE;
  rating: number;
};

export const movieBuilder = (movie: Partial<Movie> = {}) => {
  return {
    setTitle: (title: string) => movieBuilder({ ...movie, title }),
    setDirector: (director: string) => movieBuilder({ ...movie, director }),
    setGenre: (genre: GENRE) => movieBuilder({ ...movie, genre }),
    setRelease: (release: number) => movieBuilder({ ...movie, release }),
    setRating: (rating: number) => movieBuilder({ ...movie, rating }),
    build: () => movie as Movie,
  };
};
