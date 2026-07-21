import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, EB_Garamond, Great_Vibes } from "next/font/google";
import { wedding } from "@/lib/config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const { partnerA, joiner, partnerB } = wedding.couple;
const coupleTitle = `${partnerA} ${joiner} ${partnerB}`;

export const metadata: Metadata = {
  title: `${coupleTitle} — Wedding Invitation`,
  description: `${wedding.intro} — ${wedding.invitation}. ${wedding.dateLabel.weekday}, ${wedding.dateLabel.month} ${wedding.dateLabel.day}, ${wedding.dateLabel.year}.`,
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${ebGaramond.variable} ${greatVibes.variable} grain antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
