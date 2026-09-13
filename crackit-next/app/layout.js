import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "CrackIt — Real Interview Questions, Not Guesswork",
  description:
    "HR and technical interview questions compiled from real campus drives at up to 23 companies, plus worked model answers. Instant PDF download.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%E2%9A%A1%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${baloo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
