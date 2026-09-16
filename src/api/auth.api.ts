import apiClient from "@/lib/apiClient";
import { ILoginPayload } from "@/types/auth.types";

export function userLogin(paylod: ILoginPayload) {
    return apiClient(`/auth/login`, {method: "POST", body : paylod});
}