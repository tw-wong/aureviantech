import type { Metadata } from "next";
import { Inter, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "600", "700", "800"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Aurevian Tech Solutions — Web, Mobile & Infrastructure",
  description:
    "A senior engineering studio delivering web, mobile and infrastructure end-to-end — from first commit to production deployment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} ${playfair.variable} font-body flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
