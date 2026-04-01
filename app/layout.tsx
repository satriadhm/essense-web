import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Essense — Own Your Essence",
  description:
    "Biometric-powered fragrance intelligence. AI formulas tuned to your skin, weather, and story.",
  icons: {
    icon: "/app_logo.png",
    shortcut: "/app_logo.png",
    apple: "/app_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="page-root min-h-full bg-[var(--bg-deep)] text-[var(--text-primary)]">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
