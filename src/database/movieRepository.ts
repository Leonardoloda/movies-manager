import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  GetItemCommandOutput,
  PutItemCommand,
  PutItemCommandInput,
  PutItemCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateItemCommand,
  UpdateItemCommandInput,
  UpdateItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import { v4 as uuid } from "uuid";
import type { Movie } from "../model/Movie";
import { withParam } from "../utils/functional";

export type MovieRepository = {
  create: (movie: Movie) => Promise<Movie>;
  getOne: (title: string) => Promise<Movie | null>;
  getAll: () => Promise<Movie[]>;
  update: (id: string, movie: Partial<Movie>) => Promise<Movie>;
  deleteOne: (id: string) => Promise<void>;
};

const client = new DynamoDBClient({
  credentials: fromIni({
    profile: "Personal",
  }),
  region: "us-east-1",
});

const create = withParam<DynamoDBClient>(client, async (movie: Movie) => {
  const createCommand = new PutItemCommand({
    TableName: process.env.MOVIES_TABLE,
    Item: {
      id: { S: movie.id ?? uuid() },
      title: { S: movie.title },
      director: { S: movie.director },
      release: { N: movie.release.toString() },
      genre: { S: movie.genre },
      rating: { N: movie.rating.toString() },
    },
  });

  try {
    await client.send<PutItemCommandInput, PutItemCommandOutput>(createCommand);

    return unmarshall(createCommand.input.Item);
  } catch (error) {
    console.error("Failed to create a movie", error);
  }
});

const getAll = withParam<DynamoDBClient>(client, async () => {
  const getAllCommand = new ScanCommand({
    TableName: process.env.MOVIES_TABLE,
  });

  try {
    const result = await client.send<ScanCommandInput, ScanCommandOutput>(getAllCommand);

    const movies = result.Items.map((record) => unmarshall(record));

    return movies;
  } catch (error) {
    console.error("Failed to create a movie", error);
  }
});

const deleteOne = withParam<DynamoDBClient>(client, async (id: string) => {
  const deleteCommand = new DeleteItemCommand({
    TableName: process.env.MOVIES_TABLE,
    Key: {
      id: { S: id },
    },
  });

  try {
    const result = await client.send(deleteCommand);

    return result;
  } catch (error) {
    console.error("Failed to delete a movie", error);
  }
});

const getOne = withParam<DynamoDBClient>(client, async (id: string) => {
  const getCommand = new GetItemCommand({
    TableName: process.env.MOVIES_TABLE,
    Key: {
      id: { S: id },
    },
  });

  try {
    const result = await client.send<GetItemCommandInput, GetItemCommandOutput>(getCommand);

    if (result.Item === null || result.Item === undefined) return null;

    const movie = unmarshall(result.Item);

    return movie;
  } catch (error) {
    console.error("Failed to create a movie", error);
  }
});

const update = withParam<DynamoDBClient>(client, async (id: string, movie: Partial<Movie>) => {
  const updateCommand = new UpdateItemCommand({
    TableName: process.env.MOVIES_TABLE,
    Key: {
      id: { S: id },
    },
    UpdateExpression: "set title = :title, director = :director, #release = :release, genre = :genre, rating = :rating",
    ExpressionAttributeValues: {
      ":title": { S: movie.title },
      ":director": { S: movie.director },
      ":release": { N: movie.release.toString() },
      ":genre": { S: movie.genre },
      ":rating": { N: movie.rating.toString() },
    },
    ExpressionAttributeNames: {
      "#release": "release",
    },
    ReturnValues: "ALL_NEW",
  });

  try {
    const result = await client.send<UpdateItemCommandInput, UpdateItemCommandOutput>(updateCommand);

    return unmarshall(result.Attributes);
  } catch (error) {
    console.error("Failed to update a movie", error);
  }
});

export const movieRepository: MovieRepository = {
  create,
  getOne,
  getAll,
  deleteOne,
  update,
};
