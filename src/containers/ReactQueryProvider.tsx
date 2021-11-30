import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetchHelper } from "utils/apiHelpers";

type Props = {}

export const ReactQueryProvider: FC<Props> = ({ children }) => {

  // @ts-ignore
  const defaultQueryFn = async ({ queryKey }) => {
    return await fetchHelper(queryKey);
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};



