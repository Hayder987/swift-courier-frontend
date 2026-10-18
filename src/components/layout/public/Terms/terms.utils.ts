import {
  AlertTriangle,
  BookOpen,
  Box,
  Calendar,
  CircleDollarSign,
  Clock,
  CreditCard,
  FileText,
  Gavel,
  Lock,
  Mail,
  MapPin,
  Package,
  RefreshCw,
  Scale,
  ScrollText,
  Settings,
  Shield,
  ShieldCheck,
  ShieldX,
  Truck,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type TermsSection = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string[];
};

export type OverviewCard = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  targetId: string;
};

/* ------------------------------------------------------------------ */
/*  Configurable metadata                                             */
/* ------------------------------------------------------------------ */

/**
 * Update these values with the actual dates before publishing.
 * They are intentionally marked as placeholders so the business
 * or legal team can confirm them.
 */
export const termsMeta = {
  lastUpdated: "[Add last updated date]",
  effectiveDate: "[Add effective date]",
} as const;

/* ------------------------------------------------------------------ */
/*  Overview cards                                                    */
/* ------------------------------------------------------------------ */

export const overviewCards: OverviewCard[] = [
  {
    title: "Service Usage",
    description:
      "Understand how SwiftCourier's courier and logistics services may be used.",
    icon: Truck,
    targetId: "about-services",
  },
  {
    title: "Shipping Rules",
    description:
      "Key guidelines for packaging, prohibited items, and shipment information.",
    icon: Package,
    targetId: "packaging-prohibited",
  },
  {
    title: "Payments & Fees",
    description: "How shipping fees, payments, and refunds are handled.",
    icon: CreditCard,
    targetId: "fees-payments",
  },
  {
    title: "User Responsibilities",
    description: "Your responsibilities when using SwiftCourier's services.",
    icon: ShieldCheck,
    targetId: "user-responsibilities",
  },
];

/* ------------------------------------------------------------------ */
/*  Terms sections                                                    */
/* ------------------------------------------------------------------ */

export const termsSections: TermsSection[] = [
  {
    id: "introduction-acceptance",
    title: "Introduction and Acceptance of Terms",
    icon: BookOpen,
    content: [
      "These Terms and Conditions govern your access to and use of SwiftCourier's website, mobile applications, and courier, shipping, tracking, and related logistics services. By accessing or using our services, you agree to be bound by these terms.",
      "If you do not agree with any part of these terms, you should not use SwiftCourier's services. These terms apply to all visitors, users, and others who access or use the services.",
      "These terms should be read together with our Privacy Policy and any additional service-specific terms that may apply to particular features or offerings.",
    ],
  },
  {
    id: "about-services",
    title: "About SwiftCourier Services",
    icon: Truck,
    content: [
      "SwiftCourier provides courier and logistics services, including parcel pickup, delivery, shipment tracking, and related customer support. The specific services available to you may vary depending on your location and the service options you select.",
      "We may partner with third-party carriers, payment processors, and technology providers to deliver certain aspects of our services. These partners operate under their own terms and policies.",
      "Service descriptions, availability, and features may change over time as we improve and expand our offerings.",
    ],
  },
  {
    id: "user-accounts",
    title: "User Accounts and Account Security",
    icon: UserCheck,
    content: [
      "Certain features of SwiftCourier may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.",
      "You agree to provide accurate, current, and complete information when creating your account and to update it as necessary. Providing false or misleading information may result in suspension or termination of your account.",
      "If you believe your account has been compromised or accessed without authorization, please contact us promptly so we can take appropriate steps to secure it.",
    ],
  },
  {
    id: "booking-shipment",
    title: "Booking and Shipment Information",
    icon: Package,
    content: [
      "When you book a shipment through SwiftCourier, you are responsible for providing accurate details, including sender and recipient names, addresses, contact information, package dimensions, weight, and any special handling requirements.",
      "Inaccurate or incomplete shipment information may result in delays, additional fees, failed delivery attempts, or returned packages. SwiftCourier is not responsible for issues arising from incorrect information provided by the user.",
      "Once a shipment is confirmed, changes to the booking may be subject to availability, additional charges, or may not be possible depending on the stage of the delivery process.",
    ],
  },
  {
    id: "packaging-prohibited",
    title: "Packaging and Prohibited Items",
    icon: Box,
    content: [
      "You are responsible for packaging your items securely and appropriately for transport. Inadequate packaging may result in damage that SwiftCourier cannot be held responsible for.",
      "Certain items may not be permitted for shipment due to legal restrictions, safety concerns, or carrier policies. Prohibited items may include hazardous materials, illegal goods, and other restricted categories.",
      "The specific list of prohibited items may vary and should be confirmed with SwiftCourier before booking. We reserve the right to refuse or dispose of shipments containing prohibited items in accordance with applicable law.",
    ],
  },
  {
    id: "pickup-delivery",
    title: "Pickup and Delivery",
    icon: MapPin,
    content: [
      "SwiftCourier will make reasonable efforts to complete pickups and deliveries within the requested time windows. However, pickup and delivery times may be affected by factors outside our control, including traffic, weather, and recipient availability.",
      "If a recipient is unavailable at the time of delivery, the shipment may be left according to the delivery instructions you provided, returned to a SwiftCourier facility, or rescheduled. Additional fees may apply for repeated delivery attempts.",
      "You are responsible for ensuring that the delivery address is accurate and accessible. SwiftCourier is not responsible for deliveries made to incorrect addresses provided by the user.",
    ],
  },
  {
    id: "delivery-estimates",
    title: "Delivery Estimates and Delays",
    icon: Clock,
    content: [
      "Any delivery estimates provided by SwiftCourier are approximate and not guaranteed unless explicitly agreed in writing. Estimates are based on normal operating conditions and may vary.",
      "Delays may occur due to circumstances beyond our control, including weather events, transportation disruptions, customs processing, and other unforeseen factors.",
      "SwiftCourier is not liable for delays caused by events outside our reasonable control, but we will make reasonable efforts to keep you informed and to complete your delivery as soon as possible.",
    ],
  },
  {
    id: "fees-payments",
    title: "Shipping Fees, Payments, and Refunds",
    icon: CircleDollarSign,
    content: [
      "Shipping fees are calculated based on factors such as package weight, dimensions, destination, and selected service options. Applicable fees will be displayed before you confirm a booking.",
      "Payment for SwiftCourier services is processed through our designated payment providers. By submitting payment information, you authorize us to charge the applicable fees.",
      "Refund eligibility and processing are subject to the specific circumstances of each shipment and our refund policies. Please contact customer support for assistance with refund requests.",
    ],
  },
  {
    id: "tracking-notifications",
    title: "Shipment Tracking and Notifications",
    icon: ShieldCheck,
    content: [
      "SwiftCourier provides shipment tracking information to help you monitor the progress of your delivery. Tracking data is updated as your shipment moves through our network and may not reflect real-time status at all times.",
      "You may receive notifications by email, SMS, or other channels regarding your shipment. You are responsible for ensuring that your contact information is accurate and up to date.",
      "Tracking information is provided for convenience and informational purposes. It should not be relied upon as a guarantee of delivery timing or condition.",
    ],
  },
  {
    id: "loss-damage",
    title: "Loss, Damage, and Delivery Disputes",
    icon: AlertTriangle,
    content: [
      "If your shipment is lost or damaged, please contact SwiftCourier customer support as soon as possible so we can investigate the matter. We will make reasonable efforts to resolve disputes in a fair and timely manner.",
      "Compensation, if any, may be subject to the terms of the selected service, applicable law, and the declared value of the shipment. Specific compensation amounts and procedures should be confirmed with SwiftCourier.",
      "Claims must be submitted within the applicable time frames and may require supporting documentation, such as photos or receipts. Failure to provide requested information may affect our ability to resolve a claim.",
    ],
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities and Prohibited Conduct",
    icon: ShieldX,
    content: [
      "You agree to use SwiftCourier's services only for lawful purposes and in accordance with these terms. You must not use the services to ship prohibited items, engage in fraudulent activity, or violate any applicable law.",
      "You must not attempt to interfere with the operation of our website, applications, or services, or attempt to gain unauthorized access to systems or data.",
      "SwiftCourier reserves the right to suspend or terminate access to services for users who violate these terms or engage in prohibited conduct.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy and Personal Information",
    icon: Lock,
    content: [
      "SwiftCourier collects and uses personal information in accordance with our Privacy Policy. By using our services, you acknowledge that you have reviewed and understood our privacy practices.",
      "We take reasonable measures to protect the information you share with us. However, no system can guarantee complete security.",
      "For more details about how we handle your information, please refer to our Privacy Policy.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    icon: Users,
    content: [
      "SwiftCourier may integrate with third-party services, such as payment processors, mapping providers, and communication platforms. These services operate under their own terms and privacy policies.",
      "We are not responsible for the practices of third-party services. We encourage you to review their terms and policies before using them.",
      "Links to third-party websites are provided for convenience and do not imply endorsement by SwiftCourier.",
    ],
  },
  {
    id: "service-availability",
    title: "Service Availability and Modifications",
    icon: Settings,
    content: [
      "SwiftCourier aims to provide reliable service, but we do not guarantee uninterrupted availability. Services may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.",
      "We may modify, suspend, or discontinue certain features or services at any time. Where possible, we will provide reasonable notice of significant changes.",
      "Your continued use of the services after changes take effect indicates your acceptance of the modified terms.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: Scale,
    content: [
      "To the fullest extent permitted by applicable law, SwiftCourier is not liable for indirect, incidental, special, or consequential damages arising from the use of our services.",
      "Our liability for any claim related to a shipment is limited to the terms of the selected service and applicable law. Specific liability limits should be confirmed with SwiftCourier.",
      "Nothing in these terms is intended to exclude or limit liability that cannot be excluded or limited under applicable law.",
    ],
  },
  {
    id: "suspension-termination",
    title: "Suspension and Termination",
    icon: UserX,
    content: [
      "SwiftCourier may suspend or terminate access to services if we reasonably believe that you have violated these terms, engaged in fraudulent activity, or created risk for other users or our operations.",
      "You may stop using our services at any time. Obligations that by their nature should survive termination, such as payment obligations and liability provisions, will continue to apply.",
      "Upon termination, we may delete or retain your information in accordance with our Privacy Policy and applicable law.",
    ],
  },
  {
    id: "changes-terms",
    title: "Changes to These Terms",
    icon: RefreshCw,
    content: [
      "We may update these Terms and Conditions from time to time to reflect changes in our services, legal requirements, or business practices. The most current version will always be available on this page.",
      "When we make material changes, we will take reasonable steps to notify you. Your continued use of the services after changes take effect indicates that you accept the updated terms.",
      "We encourage you to review these terms periodically to stay informed.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law and Dispute Resolution",
    icon: Gavel,
    content: [
      "These terms are governed by the laws of the jurisdiction in which SwiftCourier operates, without regard to conflict of law principles. The specific jurisdiction and governing law should be confirmed with SwiftCourier.",
      "Any disputes arising from these terms or the use of our services will be resolved in accordance with the applicable laws and procedures of that jurisdiction.",
      "Where required, we may offer alternative dispute resolution processes, such as mediation or arbitration, as specified in separate agreements.",
    ],
  },
  {
    id: "contact-information",
    title: "Contact Information",
    icon: Mail,
    content: [
      "If you have questions or concerns about these Terms and Conditions, please contact our support team through the contact page.",
      "We take all inquiries seriously and will make reasonable efforts to address your concerns in a timely manner.",
      "You can also reach out to us using the contact information provided elsewhere on our website.",
    ],
  },
];
