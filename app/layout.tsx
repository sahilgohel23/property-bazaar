import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Fixed: Using Inter font
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers"; // Keeps your existing Auth/Theme providers
import "./globals.css";
import { SavedProvider } from "@/contexts/SavedContext"; // Your new Wishlist feature

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PropertyBazaar | Find Your Dream Home",
  description: "Search premium properties, villas, and apartments in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Outer Provider (Auth, etc.) */}
        <Providers>
          {/* Inner Provider (Saved Properties) */}
          <SavedProvider>
            {children}
            <Analytics />
          </SavedProvider>
        </Providers>
      </body>
    </html>
  );
}