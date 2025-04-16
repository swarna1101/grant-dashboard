import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.pathname.split("/")[3];

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 },
      );
    }

    const price = await db.priceHistory.findFirst({
      where: {
        createdAt: new Date(date),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!price) {
      return NextResponse.json({ error: "Price not found" }, { status: 404 });
    }

    return NextResponse.json({ price: price.price });
  } catch (error) {
    console.error("Error fetching price:", error);
    return NextResponse.json(
      { error: "Failed to fetch price" },
      { status: 500 },
    );
  }
}
