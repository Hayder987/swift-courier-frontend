import { Package } from "lucide-react";
import Link from "next/link";

const SwiftLogo = () => {
  return (
    <div>
      <Link href="/" className="group flex items-center gap-3">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#e50914] text-white shadow-lg shadow-red-500/20">
          <Package className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

          <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-white ring-2 ring-background" />
        </span>

        <span className="hidden text-xl font-bold tracking-tight sm:block">
          Swift<span className="text-[#e50914]">Courier</span>
        </span>
      </Link>
    </div>
  );
};

export default SwiftLogo;
