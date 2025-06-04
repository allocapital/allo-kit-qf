import { QueryKey, useQueryClient } from "@tanstack/react-query";

export function useInvalidate() {
  const queryClient = useQueryClient();

  return (queryKeys: QueryKey[]) => {
    // Timeout to let indexer catch up (what could be better solutions?)
    setTimeout(
      () =>
        queryKeys.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey })
        ),
      1000
    );
  };
}
