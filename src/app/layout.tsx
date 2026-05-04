import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Template from "./template";

export const metadata: Metadata = {
  title: "PetShop - Your Local Pet Store",
  description: "Find your perfect pet companion with our curated selection of dogs, cats, and small animals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          <Template>{children}</Template>
        </Providers>
      </body>
    </html>
  );
}
