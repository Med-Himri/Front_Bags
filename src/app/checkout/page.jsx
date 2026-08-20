import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { Checkout } from "@/components/checkout/Checkout";

export const metadata = {
  title: "Checkout | Zack Luxury",
  robots: { index: false, follow: false }, // no need to index a checkout page
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <Header />
      <Checkout />
      <Footer />
    </div>
  );
}