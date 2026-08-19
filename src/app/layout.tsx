import type { Metadata } from "next";
import { Be_Vietnam_Pro, Merriweather } from "next/font/google";
import "./globals.css";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const serif = Merriweather({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khoán hộ Vĩnh Phúc — Bảo tàng số 3D",
  description: "Hành trình tương tác từ thực tiễn khoán hộ tại Vĩnh Phúc đến quá trình điều chỉnh chính sách 1966–1988.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${sans.variable} ${serif.variable}`}>
      <body className="w-screen h-screen overflow-hidden bg-black text-white font-sans antialiased">{children}</body>
    </html>
  );
}
