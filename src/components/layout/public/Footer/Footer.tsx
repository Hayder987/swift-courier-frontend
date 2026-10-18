"use client";

import { ArrowUpRight, Mail, MapPin, Package, Phone } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import NewsletterForm from "./NewsletterForm";

const FooterThreeBackground = dynamic(() => import("./FooterThreeBackground"), {
  ssr: false,
  loading: () => null,
});

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Services", href: "/services" },
    { label: "Faq", href: "/faq" },
  ],

  support: [
    { label: "Help Center", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "X", href: "https://x.com", icon: FaXTwitter },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
];

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border bg-background">
      {/* Three.js background — non-interactive, behind content */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <FooterThreeBackground />
      </div>

      {/* Top ambient accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#e50914]/60 to-transparent" />

      {/* Subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-[#e50914]/[0.04] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter / CTA section */}
        <div className="border-b border-border/70 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
            {/* CTA text */}
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3 py-1.5 text-xs font-semibold text-[#e50914] backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e50914] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#e50914]" />
                </span>
                SwiftCourier Updates
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Stay ahead of every{" "}
                <span className="relative inline-block text-[#e50914]">
                  delivery.
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#e50914]/60 to-transparent" />
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Get delivery updates, logistics insights, product news, and
                useful tips directly in your inbox.
              </p>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:max-w-md lg:justify-self-end">
              <div className="rounded-2xl border border-border/80 bg-background/60 p-1.5 backdrop-blur-md shadow-sm">
                <div className="rounded-xl bg-background/80 p-4">
                  <NewsletterForm />
                </div>
              </div>

              <p className="mt-3 px-1 text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e50914] text-white shadow-lg shadow-red-500/25 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-red-500/40">
                <Package className="h-5 w-5" />

                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-white ring-2 ring-background" />
              </span>

              <div>
                <span className="block text-xl font-bold tracking-tight">
                  Swift<span className="text-[#e50914]">Courier</span>
                </span>

                <span className="text-xs text-muted-foreground">
                  Fast. Reliable. Delivered.
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              A smarter courier and logistics platform built to make deliveries
              faster, simpler, and more reliable.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-2.5">
              <a
                href="mailto:hayderbd4290@gmail.com"
                className="group flex items-center gap-3 rounded-lg text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-muted/60 transition group-hover:border-[#e50914]/30 group-hover:bg-[#e50914]/5 group-hover:text-[#e50914]">
                  <Mail className="h-3.5 w-3.5" />
                </span>

                <span className="break-all">hayderbd4290@gmail.com</span>
              </a>

              <a
                href="tel:+8801771814597"
                className="group flex items-center gap-3 rounded-lg text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-muted/60 transition group-hover:border-[#e50914]/30 group-hover:bg-[#e50914]/5 group-hover:text-[#e50914]">
                  <Phone className="h-3.5 w-3.5" />
                </span>

                <span>+880 1771814597</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/60">
                  <MapPin className="h-3.5 w-3.5" />
                </span>

                <span>
                  Bangladesh
                  <br />
                  Nationwide Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Company */}
          <FooterColumn title="Company" links={footerLinks.company} />

          {/* Support */}
          <FooterColumn title="Support" links={footerLinks.support} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-6 border-t border-border/70 py-7 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} SwiftCourier@Hayder. All rights
              reserved.
            </p>

            <p className="text-xs">Built for smarter logistics.</p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 bg-background/60 text-muted-foreground backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#e50914]/40 hover:bg-[#e50914] hover:text-white hover:shadow-md hover:shadow-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          {/* Back to top */}
          <a
            href="#top"
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40 md:self-auto"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 transition group-hover:-translate-y-0.5 group-hover:border-[#e50914]/40 group-hover:bg-[#e50914] group-hover:text-white group-hover:shadow-md group-hover:shadow-red-500/20">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  links: readonly {
    label: string;
    href: string;
  }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}

              <ArrowUpRight className="h-3 w-3 -translate-x-0.5 translate-y-0.5 opacity-0 transition group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
