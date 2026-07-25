import { ReduxProvider } from "@/redux/provider";
import Script from "next/script";
import "../components/style/globals.css";
import { Jost, Cormorant_Garamond } from "next/font/google";


const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ['normal', 'italic'],
});

export const metadata = {
  metadataBase: new URL("https://frontbags.vercel.app"),
  title: {
    default: "Zack Luxury | Premium Women's Handbags & Accessories",
    template: "%s | Zack Luxury",
  },
  description: "Discover Zack Luxury's curated collection of premium women's handbags and accessories, crafted with timeless elegance for the modern woman.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://frontbags.vercel.app",
    siteName: "Zack Luxury",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable}`}>
      <head>
        {/* Preconnect to critical assets only */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      <body
        className={`${jost.className} antialiased bg-[#F9F6F0] text-[#1A1A1A]`}
        suppressHydrationWarning
      >

        {/* Analytics - Strategy set to afterInteractive for LCP Optimization */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="zackluxury-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}