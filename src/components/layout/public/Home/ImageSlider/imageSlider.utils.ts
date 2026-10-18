import {
  ArrowUpRight,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import type { StaticImageData } from "next/image";

import img1 from "@/assets/slider-img/1.jpg";
import img2 from "@/assets/slider-img/2.jpg";
import img3 from "@/assets/slider-img/3.jpg";
import img4 from "@/assets/slider-img/4.jpg";
import img5 from "@/assets/slider-img/5.jpg";
import img6 from "@/assets/slider-img/6.jpg";
import img7 from "@/assets/slider-img/7.jpg";
import img8 from "@/assets/slider-img/8.jpg";
import img9 from "@/assets/slider-img/9.jpg";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type SlideData = {
  id: string;
  image: StaticImageData;
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  alt: string;
  cta?: {
    label: string;
    href: string;
  };
};

export const AUTOPLAY_DELAY = 5000;

/* ------------------------------------------------------------------ */
/*  Slide data                                                        */
/* ------------------------------------------------------------------ */

export const slides: SlideData[] = [
  {
    id: "fast-delivery",
    image: img1,
    eyebrow: "Express Delivery",
    title: "Fast parcel delivery, every time.",
    description:
      "Move parcels across the city with a courier experience built for speed and reliability.",
    icon: Zap,
    alt: "SwiftCourier express parcel delivery in motion",
    cta: { label: "Explore Services", href: "/services" },
  },
  {
    id: "shipment-tracking",
    image: img2,
    eyebrow: "Live Tracking",
    title: "Seamless shipment tracking.",
    description:
      "Follow every movement of your parcel with clear, real-time tracking updates.",
    icon: MapPin,
    alt: "Shipment tracking interface for SwiftCourier parcels",
    cta: { label: "Track Shipment", href: "/" },
  },
  {
    id: "nationwide-network",
    image: img3,
    eyebrow: "Nationwide Network",
    title: "Delivering across the country.",
    description:
      "A growing network of courier routes connecting cities, towns, and doorsteps.",
    icon: Truck,
    alt: "SwiftCourier nationwide delivery network",
  },
  {
    id: "secure-handling",
    image: img4,
    eyebrow: "Secure Handling",
    title: "Every parcel, handled with care.",
    description:
      "Careful packaging and secure handling are at the heart of every SwiftCourier delivery.",
    icon: ShieldCheck,
    alt: "Secure package handling by SwiftCourier",
  },
  {
    id: "reliable-partners",
    image: img5,
    eyebrow: "Trusted Partners",
    title: "Reliable courier partners.",
    description:
      "We work with dependable partners to keep shipments moving smoothly along every route.",
    icon: Users,
    alt: "SwiftCourier courier partners coordinating deliveries",
  },
  {
    id: "smart-operations",
    image: img6,
    eyebrow: "Smart Logistics",
    title: "Operations powered by smart logistics.",
    description:
      "Intelligent routing and coordinated dispatch help keep our operations efficient.",
    icon: Package,
    alt: "Smart logistics operations at SwiftCourier",
  },
  {
    id: "pickup-experience",
    image: img7,
    eyebrow: "Easy Pickup",
    title: "Pickups that fit your schedule.",
    description:
      "Schedule convenient pickups and let SwiftCourier handle the rest of the journey.",
    icon: ArrowUpRight,
    alt: "Convenient SwiftCourier pickup experience",
  },
  {
    id: "last-mile",
    image: img8,
    eyebrow: "Last-Mile Delivery",
    title: "Efficient last-mile delivery.",
    description:
      "Our final delivery step is designed to reach recipients quickly and reliably.",
    icon: MapPin,
    alt: "SwiftCourier last-mile delivery in action",
  },
  {
    id: "trusted-delivery",
    image: img9,
    eyebrow: "Built on Trust",
    title: "Delivery you can count on.",
    description:
      "SwiftCourier is built to give senders and recipients confidence in every shipment.",
    icon: ShieldCheck,
    alt: "Trusted SwiftCourier delivery experience",
    cta: { label: "Contact Support", href: "/contact" },
  },
];
