import Navbar from "@/components/navbar/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Wander Nest",
  description: "Feel at home, away from home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning this is optional to avoid some weird warning message related to client and server components.
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <Navbar />
            {/* since we added Footer, changed the py to pt. */}
            <main className="container py-2 sm:pt-8 sm:py-3">{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
