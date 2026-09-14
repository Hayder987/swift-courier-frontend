"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Package, Phone } from "lucide-react";

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
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Be a Courier",
      href: "/become-courier",
    },
    {
      label: "Careers",
      href: "/careers",
    },
  ],

  services: [
    {
      label: "Send a Parcel",
      href: "/send-parcel",
    },
    {
      label: "Track Shipment",
      href: "/track",
    },
    {
      label: "Delivery Zones",
      href: "/zones",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ],

  support: [
    {
      label: "Help Center",
      href: "/help",
    },
    {
      label: "FAQ",
      href: "/faq",
    },
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms",
    },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: FaXTwitter,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: FaGithub,
  },
];

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border bg-background">
      {/* Three.js background */}
      <FooterThreeBackground />

      {/* Top ambient gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e50914]/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter / CTA section */}
        <div className="border-b border-border py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
            {/* CTA text */}
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3 py-1.5 text-xs font-semibold text-[#e50914]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e50914]" />
                SwiftCourier Updates
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Stay ahead of every{" "}
                <span className="text-[#e50914]">delivery.</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Get delivery updates, logistics insights, product news, and
                useful tips directly in your inbox.
              </p>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:max-w-md lg:justify-self-end">
              <NewsletterForm />

              <p className="mt-3 px-1 text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e50914] text-white shadow-xl shadow-red-500/20 transition-transform duration-300 group-hover:scale-105">
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
            <div className="mt-6 space-y-3">
              <a
                href="mailto:support@swiftcourier.com"
                className="group flex items-center gap-3 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <Mail className="h-3.5 w-3.5" />
                </span>

                <span>hayderbd4290@gmail.com</span>
              </a>

              <a
                href="tel:+8801700000000"
                className="group flex items-center gap-3 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <Phone className="h-3.5 w-3.5" />
                </span>

                <span>+880 1771814597</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
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

          {/* Services */}
          <FooterColumn title="Services" links={footerLinks.services} />

          {/* Support */}
          <FooterColumn title="Support" links={footerLinks.support} />
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-6 border-t border-border py-7 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} SwiftCourier@Hayder. All rights reserved.
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
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition hover:border-[#e50914]/30 hover:bg-[#e50914] hover:text-white"
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
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-muted-foreground transition hover:text-foreground md:self-auto"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition group-hover:border-[#e50914]/30 group-hover:bg-[#e50914] group-hover:text-white">
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
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}

              <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
