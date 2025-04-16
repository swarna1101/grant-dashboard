import { NextResponse } from "next/server";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const context = await createTRPCContext({ headers: new Headers() });
    const caller = createCaller(context);

    const prices = await caller.prices.getAllPrices();

    return NextResponse.json({ success: true, data: prices });
  } catch (error) {
    console.error("Price fetch cron job failed:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
