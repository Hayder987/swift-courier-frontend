const PublicPageNormalBg = () => {
  return (
    <div className="bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Top-right ambient red glow */}
        <div className="absolute -right-40 -top-40 size-140 rounded-full bg-[#e50914]/6 blur-[130px] dark:bg-[#e50914]/15" />
        {/* Bottom-left ambient red glow */}
        <div className="absolute -bottom-48 -left-48 size-140 rounded-full bg-[#e50914]/5 blur-[140px] dark:bg-[#e50914]/10" />
        {/* Subtle center red glow */}
        <div className="absolute left-1/2 top-1/3 size-100 -translate-x-1/2 rounded-full bg-[#e50914]/4 blur-[120px] dark:bg-[#e50914]/8" />

        {/* Fine grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            color: "#e50914",
          }}
        />
      </div>
    </div>
  );
};

export default PublicPageNormalBg;
