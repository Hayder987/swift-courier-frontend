import { useMutation } from "@tanstack/react-query";
import { postContact } from "@/api/public.api";

export const useCreateContact = () => {
  return useMutation({
    mutationFn: postContact,
  });
};
