export const chain =
  (...functions: Function[]) =>
  (argument: any) =>
    functions.map((fn) => fn(argument));

export const withParam =
  <T>(client: T, fn: Function) =>
  (...args: any[]) =>
    fn(...args);
