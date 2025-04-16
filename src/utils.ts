import axios from "axios";
//   export function getRandomHexColor() {
//     // Random hue between 0 and 360
//     const hue = Math.floor(Math.random() * 360);

import moment from "moment";
import { db } from "./server/db";
import { api } from "./trpc/react";

//     // Fixed saturation and lightness for pastel colors
//     const saturation = 70; // 70% saturation
//     const lightness = 80; // 80% lightness

//     // Return the HSL color string
//     return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//   }

export function getRandomHexColor() {
  const hue = Math.floor(Math.random() * 360); // Random hue
  const saturation = Math.floor(Math.random() * 40 + 50); // Saturation between 50% and 90%
  const lightness = Math.floor(Math.random() * 30 + 40); // Lightness between 40% and 70%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export async function getTaikoPrice(date: string): Promise<number> {
  try {
    const response = await fetch(`/api/getTaikoPrice/${date}`);
    const data = await response.json();
    return data.price ? Number(data.price) : 0;
  } catch (error) {
    console.error(`Error fetching price for date: ${date}`, error);
    return 0;
  }
}

export async function getTickerPrice(date?: string): Promise<number> {
  const apiKey = process.env.NEXT_PUBLIC_GECKO_API_KEY;
  const options = {
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/taiko/tickers",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": `${apiKey}`,
    },
  };

  const resp = await axios.request(options);
  return resp.data.tickers[0].last;
}
