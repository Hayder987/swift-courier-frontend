import { postContact } from "@/api/public.api"
import { useMutation } from "@tanstack/react-query"

export const useCreateContact = () =>{
    return useMutation ({
        mutationFn : postContact
    })
}