import { Outfit as OutfitFont, Ovo } from "next/font/google";
import "./globals.css";

const outfit = OutfitFont({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

const ovoFont = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ovo",
});

export const metadata = {
  title: "David-Jesse | Web Bender & Frontend Developer",
  description: "Portfolio website for David-Jesse the Web Bender",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${outfit.variable} ${ovoFont.variable} font-Outfit leading-8 overflow-x-hidden  text-black  transition-colors duration-300 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
