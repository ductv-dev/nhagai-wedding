// app/layout.tsx
import "./globals.css";
import {
  Playfair_Display,
  Great_Vibes,
  Dancing_Script,
  Be_Vietnam_Pro,
} from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-greatvibes",
});

const dancing = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  variable: "--font-dancing",
});

const bevn = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  variable: "--font-bevn",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${greatVibes.variable} ${dancing.variable} ${bevn.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
