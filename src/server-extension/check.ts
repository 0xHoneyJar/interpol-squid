import { RequestCheckContext } from "../../node_modules/@subsquid/graphql-server/src/check";

export async function requestCheck(
  req: RequestCheckContext
): Promise<boolean | string> {
  return (
    req.http.headers.get("authorization") === `Bearer ${process.env.API_KEY}`
  );
}
