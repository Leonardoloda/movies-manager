import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { movieController } from "./src/controllers/movieController";
import { movieRepository } from "./src/database/movieRepository";
import { createResponse, parseInput } from "./src/utils/httpTool";
import { Movie } from "./src/model/Movie";

const readMovie = async (event: Partial<APIGatewayEvent>): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters;

  const movie = await movieController(movieRepository).readMovie(id);

  return createResponse(200, movie);
};

const readMovies = async (): Promise<APIGatewayProxyResult> => {
  const movies = await movieController(movieRepository).readMovies();

  return createResponse(200, [...movies]);
};

const createMovie = async ({ body }): Promise<APIGatewayProxyResult> => {
  const movie = parseInput<Movie>(body);

  console.info("Movie: ", movie);

  const createdMovie = await movieController(movieRepository).createMovie(movie);

  return createResponse(200, createdMovie);
};

const updateMovie = async (event: Partial<APIGatewayEvent>) => {
  const { id } = event.pathParameters;
  const movie = typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  const updatedMovie = await movieController(movieRepository).updateMovie(id, movie);

  return createResponse(200, updatedMovie);
};

const deleteMovie = async (event: Partial<APIGatewayEvent>) => {
  const { id } = event.pathParameters;

  const result = await movieController(movieRepository).deleteMovie(id);

  return createResponse(200, result);
};

export { createMovie, readMovie, updateMovie, deleteMovie, readMovies };
