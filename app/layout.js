import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Commonwealth Asset Trust Investment company.",
  description: "Commonwealth Asset Trust Investment company, formally known as solid rock investment  ",
  keywords: "investment, trust, asset management, finance",
  openGraph: {
    title: "Commonwealth Asset Trust Investment company.",
    description: "Commonwealth Asset Trust Investment company, formally known as solid rock investment ",
    url: "https://www.commonwealthassettrustnvestmentcompany.com/",
    siteName: "Commonwealth Asset Trust",
    images: [
      {
        url: "https://img.freepik.com/free-photo/light-bulb-with-colorful-graphic-inside_1232-186.jpg?ga=GA1.1.1777763460.1762345373&semt=ais_hybrid&w=740&q=80",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "https://img.freepik.com/free-photo/dollar-banknotes-tree-growing-white-pot_35913-3163.jpg?ga=GA1.1.1777763460.1762345373&semt=ais_hybrid&w=740&q=80",
    title: "Commonwealth Asset Trust Investment company.",
    description: "Commonwealth Asset Trust Investment company, formally known as solid rock investment for the website",
    images: ["https://img.freepik.com/premium-photo/business-growth-concept_173387-1062.jpg?ga=GA1.1.1777763460.1762345373&semt=ais_hybrid&w=740&q=80"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
