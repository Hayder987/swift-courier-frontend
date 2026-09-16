"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";

export default function GoogleLoginComponent() {
  const router = useRouter();
  const { mutate: googleLogin, isPending } = useGoogleOAuth();
  const queryClient = useQueryClient();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again",
        type: "error",
      });

      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["user"],
          });

          toast.add({
            title: "Logged in Successfully",
            description: "Welcome back",
            type: "success",
          });

          router.push("/");
        },

        onError: (err) => {
          toast.add({
            title: "Google OAuth Failed",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong. Please try again",
      type: "error",
    });
  };

  return (
    <div className="w-full">
      {isPending ? (
        <button
          type="button"
          disabled
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium text-muted-foreground opacity-80"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Signing in with Google...</span>
        </button>
      ) : (
        <GoogleLogin
          theme="outline"
          shape="pill"
          text="continue_with"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      )}
    </div>
  );
}
