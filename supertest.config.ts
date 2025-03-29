import "dotenv/config";

export const ACCESS_KEY = process.env.ACCESS_KEY as string;
export const BASE_URL = process.env.BASE_URL ?? "https://www.rijksmuseum.nl/api/";