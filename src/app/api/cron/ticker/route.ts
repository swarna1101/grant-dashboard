import { NextResponse } from "next/server";
import axios from "axios";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
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

    const context = await createTRPCContext({ headers: new Headers() });
    const caller = createCaller(context);

    await caller.prices.create({
      price: resp.data.tickers[0].last.toString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ticker price cron job failed:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
