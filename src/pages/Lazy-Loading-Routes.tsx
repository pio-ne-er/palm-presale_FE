import { lazy, Suspense } from "react";

export const lazyLoadRoutes = (component: string) => {
  const LazyElement = lazy(() => import(`./${component}`));

  return (
    <Suspense fallback="Loading...">
      <LazyElement />
    </Suspense>
  );
};
