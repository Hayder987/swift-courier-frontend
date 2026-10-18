import { ArrowLeft, Headphones, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import logo from "@/assets/logo/logo.png";
import PublicPageNormalBg from "@/components/layout/public/Background/PublicPageNormalBg";
import ContactComponent from "@/components/layout/public/Contact/ContactComponent";
import ContactForm from "@/components/layout/public/Contact/contact-form";

const ContactPage = () => {
  return (
    <div className="">
      <ContactComponent />
    </div>
  );
};

export default ContactPage;
