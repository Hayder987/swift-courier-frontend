import Public3DBackground from "@/components/layout/public/Background/Public3DBackground";
import Footer from "@/components/layout/public/Footer/Footer";
import NavHeader from "@/components/layout/public/Navbar/NavHeader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Public3DBackground />

      <div className="relative z-10">
        <NavHeader />

        <main className="min-h-[calc(100vh-72px)]">
          <div className="mx-auto w-full max-w-380 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
