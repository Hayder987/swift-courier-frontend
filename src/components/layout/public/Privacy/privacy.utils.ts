import {
  Baby,
  Cookie,
  CreditCard,
  FileText,
  Info,
  Lock,
  Mail,
  Package,
  RefreshCw,
  Server,
  Share2,
  Shield,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

export type PolicySection = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string[];
};

export const policySections: PolicySection[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: Info,
    content: [
      "SwiftCourier respects your privacy and is committed to handling your personal information responsibly. This Privacy Policy explains what information we collect, how we use it, and the choices available to you when you use our courier and logistics services.",
      "By using SwiftCourier's website, mobile applications, or delivery services, you acknowledge that you have read and understood this policy. If you do not agree with the practices described here, please discontinue use of our services.",
      "This policy applies to information collected through our website, mobile applications, customer support channels, and in-person courier interactions.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    icon: FileText,
    content: [
      "We collect information you provide directly to us, such as your name, email address, phone number, and delivery addresses. This information is necessary to create shipments, coordinate deliveries, and provide customer support.",
      "We also collect information automatically when you use our services, including device information, browser type, IP address, and usage patterns. This helps us maintain service reliability and improve the user experience.",
      "In some cases, we may receive information about you from third parties, such as payment processors or business partners, where permitted by applicable law.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    icon: Users,
    content: [
      "We use the information we collect to provide, maintain, and improve our courier services. This includes processing shipments, coordinating pickups and deliveries, and communicating with you about your orders.",
      "We may also use your information to respond to inquiries, provide customer support, send service-related notifications, and personalize your experience on our platform.",
      "Where you have opted in, we may use your contact information to send promotional communications about SwiftCourier products, features, or offers. You can opt out of these communications at any time.",
    ],
  },
  {
    id: "shipment-tracking",
    title: "Shipment and Tracking Information",
    icon: Package,
    content: [
      "To deliver your parcels, we collect shipment details such as sender and recipient names, pickup and delivery addresses, package dimensions and weight, and any special handling instructions you provide.",
      "Tracking information is generated as your shipment moves through our network. This information may be shared with you, the recipient, and authorized personnel involved in completing the delivery.",
      "Shipment and tracking data may be retained for a reasonable period to support customer service, resolve disputes, and meet operational needs. Exact retention periods may vary depending on the nature of the shipment and applicable requirements.",
    ],
  },
  {
    id: "payments-transactions",
    title: "Payments and Transactions",
    icon: CreditCard,
    content: [
      "When you make payments for SwiftCourier services, transaction details are processed by our payment service providers. We do not store full payment card numbers on our servers.",
      "Payment processors may collect and store information in accordance with their own privacy policies. We encourage you to review those policies before completing a transaction.",
      "We retain limited transaction records, such as order identifiers and payment status, to manage billing, process refunds, and maintain accurate financial records.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Similar Technologies",
    icon: Cookie,
    content: [
      "SwiftCourier uses cookies and similar technologies to keep you signed in, remember your preferences, and understand how our services are used. Cookies are small text files stored on your device by your browser.",
      "You can control or delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website or mobile applications.",
      "We may use analytics tools to collect aggregated usage data. These tools help us measure performance and improve our services, but they are not intended to identify you personally.",
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing and Disclosure",
    icon: Share2,
    content: [
      "We do not sell your personal information. We may share information with service providers who help us operate our business, such as payment processors, mapping services, and customer support platforms.",
      "We may disclose information when required by law, regulation, or legal process, or when we believe disclosure is necessary to protect the rights, property, or safety of SwiftCourier, our customers, or others.",
      "In the event of a merger, acquisition, or sale of assets, customer information may be transferred as part of the transaction. We will notify you of any such change as required by applicable law.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    content: [
      "We take reasonable measures to protect the information we collect from unauthorized access, alteration, disclosure, or destruction. These measures include physical, technical, and organizational safeguards appropriate to the nature of the information.",
      "No method of transmission over the internet or electronic storage is completely secure. While we work to protect your information, we cannot guarantee absolute security.",
      "If we become aware of a data breach that affects your personal information, we will notify you and relevant authorities as required by applicable law.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: Server,
    content: [
      "We retain personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.",
      "Retention periods vary depending on the type of information and the purpose for which it was collected. For example, shipment records may be retained longer than marketing preferences.",
      "When information is no longer needed, we take reasonable steps to delete or anonymize it in accordance with our internal practices.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    icon: UserCheck,
    content: [
      "Depending on your location, you may have certain rights regarding your personal information. These may include the right to access, correct, or delete the information we hold about you.",
      "You may also have the right to object to or restrict certain processing, or to request that we provide your information in a portable format. To exercise these rights, please contact us using the details below.",
      "We will respond to requests in accordance with applicable law. In some cases, we may need to verify your identity before fulfilling a request.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    icon: Shield,
    content: [
      "SwiftCourier may integrate with third-party services to support payment processing, mapping, analytics, and customer communication. These services operate under their own privacy policies.",
      "We encourage you to review the privacy practices of any third-party service you interact with through our platform. SwiftCourier is not responsible for the privacy practices of these external services.",
      "Links to third-party websites are provided for convenience. Following those links means you leave the SwiftCourier platform and are subject to the destination site's policies.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    icon: Baby,
    content: [
      "SwiftCourier's services are intended for individuals who are old enough to enter into a binding contract under applicable law. We do not knowingly collect personal information from children.",
      "If you believe that a child has provided us with personal information, please contact us so that we can take appropriate steps to remove the information.",
      "We encourage parents and guardians to monitor their children's online activity and to contact us with any concerns.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    icon: RefreshCw,
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. When we make material changes, we will take reasonable steps to notify you.",
      "The most current version of this policy will always be available on this page. We encourage you to review it periodically to stay informed about how we protect your information.",
      "Continued use of SwiftCourier's services after a policy update indicates that you accept the revised policy. If you do not agree, you should discontinue use of our services.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    content: [
      "If you have questions or concerns about this Privacy Policy or our data practices, please contact our support team through the contact page.",
      "We take privacy inquiries seriously and will work to address your concerns in a timely manner. You can also reach out to us using the contact information provided elsewhere on our website.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Overview cards data                                               */
/* ------------------------------------------------------------------ */
export const overviewCards = [
  {
    title: "Personal Information",
    description:
      "Basic details like your name and contact info used to coordinate deliveries.",
    icon: Users,
  },
  {
    title: "Shipment & Tracking",
    description:
      "Shipment details and tracking updates necessary to complete your delivery.",
    icon: Package,
  },
  {
    title: "Payment Security",
    description:
      "Payment details are processed securely by our payment providers.",
    icon: CreditCard,
  },
  {
    title: "Data Protection",
    description:
      "Reasonable safeguards help protect the information you share with us.",
    icon: ShieldCheck,
  },
];
