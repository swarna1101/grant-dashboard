"use client";

import moment from "moment";
import { api, RouterOutputs } from "~/trpc/react";

type Price = RouterOutputs["prices"]["getAllPrices"][0];

export function PriceList({ initialPrices }: { initialPrices: Price[] }) {
  const { data: prices } = api.prices.getAllPrices.useQuery(undefined, {
    initialData: initialPrices,
  });

  return (
    <div className="mx-auto mt-8 w-full max-w-2xl">
      <h2 className="mb-4 text-2xl font-bold">Price History</h2>
      <div className="overflow-hidden rounded-lg bg-white/10">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {prices.map((price) => (
              <tr key={price.id} className="hover:bg-white/5">
                <td className="whitespace-nowrap px-6 py-4 text-white">
                  ${price.price}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-white">
                  {moment(price.createdAt).format("DD/MM/YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
