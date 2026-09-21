import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://darflashxd.my.id"),
  title: "Ahmad Rafi Sutanto — Cybersecurity & Digital Forensics",
  description:
    "Personal portfolio of Ahmad Rafi Sutanto. Cybersecurity student at BINUS University, Deputy Coordinator of R&D at Cyber Security Community, and Digital Forensics / DFIR researcher.",
  keywords: [
    "Ahmad Rafi Sutanto",
    "Cybersecurity",
    "Digital Forensics",
    "DFIR",
    "Blue Team Operations",
    "Threat Detection",
    "BINUS University",
    "Cyber Security Community",
  ],
  authors: [{ name: "Ahmad Rafi Sutanto" }],
  creator: "Ahmad Rafi Sutanto",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://darflashxd.my.id",
    title: "Ahmad Rafi Sutanto — Cybersecurity & Digital Forensics",
    description:
      "Personal portfolio of Ahmad Rafi Sutanto. Cybersecurity student and DFIR researcher at BINUS University.",
    siteName: "Ahmad Rafi Sutanto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Rafi Sutanto — Cybersecurity & Digital Forensics",
    description:
      "Personal portfolio of Ahmad Rafi Sutanto. Cybersecurity student and DFIR researcher at BINUS University.",
    creator: "@darflashxd",
  },
};

export const viewport: Viewport = {
  themeColor: "#06080F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-studio-bg text-studio-text font-sans antialiased selection:bg-studio-accent selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-studio-text focus:text-studio-bg focus:font-mono focus:text-xs focus:ring-2 focus:ring-studio-accent focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
