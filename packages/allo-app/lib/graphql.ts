import { Client, cacheExchange, fetchExchange } from "urql";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_INDEXER_URL;
  if (!url) throw new Error("NEXT_PUBLIC_INDEXER_URL is not set");
  return new Client({ url, exchanges: [cacheExchange, fetchExchange] });
}
