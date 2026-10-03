import Public3DBackground from "@/components/layout/public/Background/Public3DBackground";
import GlobalLoading from "@/components/loading/global-loading";

export default function PaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Public3DBackground />

      <div className="relative z-10">
        <main className="min-h-[calc(100vh-72px)]">
          <div className="mx-auto w-full max-w-380 px-4 sm:px-6 lg:px-8">
            <GlobalLoading />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
