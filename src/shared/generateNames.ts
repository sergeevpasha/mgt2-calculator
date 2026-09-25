// The contract of POST /api/generate-names, shared by the page and the server route.

export const TITLE_COUNT = 12;

export interface GenerateNamesRequest {
  // Names from the genre data. The server rejects anything else.
  genre: string;
  subgenre?: string;
  // One or two of the genre's topics.
  topics: string[];
}
