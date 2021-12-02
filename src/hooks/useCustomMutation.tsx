import { useMutation, UseMutationOptions } from "react-query";
import { fetchHelper } from "utils/apiHelpers";

export const useCustomMutation = (
  requestPath: string,
  options?: UseMutationOptions
) => {
  const mutationfuncCheckIn = async () =>
    await fetchHelper(requestPath, "POST");

  return useMutation(mutationfuncCheckIn, options);
};
