import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { movieController } from "./src/controllers/MovieOperations";
import { movieRepository } from "./src/database/movieRepository";

const readMovie = async (event: Partial<APIGatewayEvent>): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters;

  const movie = await movieController(movieRepository).readMovie(id);

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...movie,
    }),
  };
};

const readMovies = async (): Promise<APIGatewayProxyResult> => {
  const movies = await movieController(movieRepository).readMovies();

  return {
    statusCode: 200,
    body: JSON.stringify([...movies]),
  };
};

const createMovie = async ({ body }): Promise<APIGatewayProxyResult> => {
  const movie = typeof body === "string" ? JSON.parse(body) : body;

  const createdMovie = await movieController(movieRepository).createMovie(movie);

  return {
    statusCode: 200,
    body: JSON.stringify(createdMovie),
  };
};

const updateMovie = async (event: Partial<APIGatewayEvent>) => {
  const { id } = event.pathParameters;
  const movie = typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  const updatedMovie = await movieController(movieRepository).updateMovie(id, movie);

  return {
    statusCode: 200,
    body: JSON.stringify(updatedMovie),
  };
};

const deleteMovie = async (event: Partial<APIGatewayEvent>) => {
  const { id } = event.pathParameters;

  await movieController(movieRepository).deleteMovie(id);

  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

export { createMovie, readMovie, updateMovie, deleteMovie, readMovies };
