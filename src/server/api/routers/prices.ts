import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pricesRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ price: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.priceHistory.create({
        data: {
          price: input.price,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.priceHistory.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

  getAllPrices: publicProcedure.query(async ({ ctx }) => {
    const prices = await ctx.db.priceHistory.findMany({
      orderBy: { createdAt: "desc" },
    });
    return prices;
  }),

  getPriceByDate: publicProcedure
    .input(z.object({ date: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const price = await ctx.db.priceHistory.findFirst({
        where: { createdAt: input.date },
      });
      return price;
    }),

  fetchCoinData: publicProcedure.mutation(async ({ ctx }) => {
    try {
      const options = {
        method: "GET",
        url: "https://67a21a53409de5ed52544d7a.mockapi.io/priceHistory",
        headers: { accept: "application/json" },
      };

      const response = await axios.request(options);

      // Store the data in the database
      console.log(response.data);
      const savedData = await ctx.db.priceHistory.createMany({
        data: response.data.map((item: { price: number }) => ({
          price: item.price.toString(),
        })),
      });

      return savedData;
    } catch (error) {
      throw new Error("Failed to fetch coin data");
    }
  }),
});
