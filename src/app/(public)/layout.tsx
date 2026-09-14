import NavHeader from "@/components/layout/public/Navbar/NavHeader";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <NavHeader />

      <main className="min-h-[calc(100vh-72px)]">
        {children}
      </main>
    </div>
  );
}