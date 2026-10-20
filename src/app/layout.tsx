import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
    "Ahmad Rafi Sutanto, cybersecurity student at BINUS University. Privacy tools, digital forensics, and CTF infrastructure. Open to internships and job opportunities.",
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
      "Personal portfolio of Ahmad Rafi Sutanto. Cybersecurity student specializing in Blue Team operations & Digital Forensics at BINUS University.",
    siteName: "Ahmad Rafi Sutanto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Rafi Sutanto — Cybersecurity & Digital Forensics",
    description:
      "Personal portfolio of Ahmad Rafi Sutanto. Cybersecurity student specializing in Blue Team operations & Digital Forensics at BINUS University.",
    creator: "@darflashxd",
  },
};

export const viewport: Viewport = {
  themeColor: "#101214",
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
      className={`${jetbrainsMono.variable} ${plusJakartaSans.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3 focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
