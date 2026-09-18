import apiClient from "@/lib/apiClient";
import { IContactPayload } from "@/validation/contact.validation";


export function postContact (payload: IContactPayload){
    return apiClient("/contacts", {method: "POST", body: payload})
}