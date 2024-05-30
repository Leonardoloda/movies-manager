import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const createResponse = (status: number, body: { [record: string]: any }): APIGatewayProxyResult => {
  return {
    statusCode: status,
    body: JSON.stringify(body),
  };
};

export const parseInput = <T>(body: string | T): T => {
  return typeof body === "string" ? (JSON.parse(body) as T) : body;
};

export const getPathParameter = <T extends string | number = string>(event: Partial<APIGatewayEvent>, key) => {
  return event.pathParameters[key] as T;
};
