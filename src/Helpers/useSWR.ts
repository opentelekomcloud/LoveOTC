import { clearCache, useRequest } from "ahooks";
import type { Options, Service } from "ahooks/lib/useRequest/src/types";

/**
 * @author Aloento
 * @since 1.3.5
 * @version 0.3.0
 */
export function useSWR<TData, TParams extends any[]>(
  key: string,
  service: Service<TData, TParams>,
  options: Options<TData, TParams> & {
    useMemory?: true
  }
) {
  if (!options.useMemory) {
    options.setCache = (data) => localStorage.setItem(key, JSON.stringify(data));
    options.getCache = () => JSON.parse(localStorage.getItem(key) || "{}");
  }

  const req = useRequest(
    service,
    {
      staleTime: 5000,
      ...options,
      cacheKey: key
    }
  );

  return {
    ...req,
    refresh: () => {
      if (options.useMemory)
        clearCache(key);
      else
        localStorage.removeItem(key);

      req.refresh();
    }
  };
}
