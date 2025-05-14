import { Client, cacheExchange, fetchExchange } from "urql";

export function createClient(url: string) {
  if (!url) throw new Error("URL is not set");
  return new Client({ url, exchanges: [cacheExchange, fetchExchange] });
}
