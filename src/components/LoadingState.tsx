'use client';

import { Spinner } from 'flowbite-react';

export const LoadingState = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-white text-center dark:bg-gray-900">
      <Spinner size="xl" />
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Building Grant Dashboard
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Please wait while we fetch and process the data...
      </p>
    </div>
  );
}; 