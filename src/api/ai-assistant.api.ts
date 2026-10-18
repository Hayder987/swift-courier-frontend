import apiClient from "@/lib/apiClient";
import type {
  IAIChatMessage,
  IAIChatResponseData,
} from "@/types/ai-assistant.type";
import type { IApiResponse } from "@/types/api.type";

export function sendAIChat(message: string, history: IAIChatMessage[]) {
  return apiClient<IApiResponse<IAIChatResponseData>>("/ai-assistant/chat", {
    method: "POST",
    body: {
      message,
      history: history.slice(-6),
    },
  });
}
