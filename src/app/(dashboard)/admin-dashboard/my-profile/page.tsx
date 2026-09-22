"use client";

import ProfileComponent from "@/components/layout/dashboard/commmon/Profile";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { useGetMe } from "@/hooks";

const MyProfilePage = () => {
  const { data, isPending, isError } = useGetMe();

  const userData = data?.data;

  if (isPending) {
    return (
      <LoadingScreen
        label="Loading profile"
        description="Please wait while we securely load your profile."
      />
    );
  }

  if (isError || !userData) {
    return (
      <LoadingScreen
        label="Redirecting..."
        description="We couldn't load your profile."
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <ProfileComponent user={userData} />
    </div>
  );
};

export default MyProfilePage;
