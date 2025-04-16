"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

export function CoinDataFetcher() {
  const utils = api.useUtils();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchCoinData = api.prices.fetchCoinData.useMutation({
    onSuccess: async () => {
      setErrorMessage(null);
      await utils.prices.getLatest.invalidate();
    },
    onError: (error) => {
      setErrorMessage(error.message || "An error occurred while fetching data");
    },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => {
          setErrorMessage(null);
          fetchCoinData.mutate();
        }}
        className="hidden rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={fetchCoinData.isPending}
      >
        {fetchCoinData.isPending ? "Fetching..." : "Fetch Coin Data"}
      </button>

      {errorMessage && (
        <div className="max-w-md rounded-md bg-red-500/10 p-4 text-red-500">
          <p className="font-semibold">Error:</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
