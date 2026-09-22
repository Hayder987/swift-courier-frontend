"use client";

import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useLogout } from "@/hooks";

type LogoutButtonProps = {
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
};

export default function LogoutButton({
  className,
  showIcon = true,
  children = "Logout",
}: LogoutButtonProps) {
  const { mutate: logout, isPending: logoutPending } = useLogout();

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: async () => {
        queryClient.setQueryData(["user"], null);

        await queryClient.invalidateQueries({
          queryKey: ["user"],
        });

        toast.add({
          title: "Logged out",
          description: "Logged out successfully",
          type: "success",
        });

        router.push("/");
      },

      onError: (error) => {
        toast.add({
          title: "Logout failed",
          description: error.message || "Something went wrong",
          type: "error",
        });
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={logoutPending}
      className={className}
    >
      {showIcon && <LogOut className="size-4" />}

      <span>{logoutPending ? "Logging out..." : children}</span>
    </button>
  );
}
