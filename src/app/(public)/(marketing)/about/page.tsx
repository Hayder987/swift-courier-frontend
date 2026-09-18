"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AboutContent from "@/components/layout/public/About/about-content";

const AboutPage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted && resolvedTheme === "dark";

  return <AboutContent dark={dark} mounted={mounted} />;
};

export default AboutPage;
