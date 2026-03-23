import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Clyde Dumpa | Technical Consultant",
  description:
    "A single-page portfolio for Clyde Dumpa featuring consulting strengths, career highlights, and a digital twin chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
