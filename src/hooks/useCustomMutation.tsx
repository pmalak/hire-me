import { useMutation, UseMutationOptions } from "react-query";
import { fetchHelper } from "utils/apiHelpers";

// type useMutation = () => useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(options: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationResult<TData, TError, TVariables, TContext>;

export const useCustomMutation = (requestPath: string, options:UseMutationOptions) => {

  const mutationfuncCheckIn = async () =>
    await fetchHelper(
      requestPath,
      "POST"
    );


  return useMutation(mutationfuncCheckIn, options)
}