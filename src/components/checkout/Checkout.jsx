"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MessageCircle, Loader2 } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { clearCart } from "@/redux/slices/cartSlice"; // adjust action name if different

// Your business WhatsApp number in international format, no +, no spaces
// e.g. Morocco number 06 12 34 56 78 becomes "212612345678"
const WHATSAPP_NUMBER = "212619805905"; // <-- replace with your real number

export function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const buildWhatsAppMessage = (order) => {
    const lines = [
      `New order from Zack Luxury website`,
      ``,
      `Customer: ${order.customerName}`,
      `Phone: ${order.phone}`,
      order.city ? `City: ${order.city}` : null,
      order.address ? `Address: ${order.address}` : null,
      ``,
      `Items:`,
      ...order.items.map(
        (item) =>
          `- ${item.title}${item.color ? ` (${item.color})` : ""}${
            item.size ? ` - Size ${item.size}` : ""
          } x${item.quantity} - ${item.price} DH`
      ),
      ``,
      `Total: ${order.total} DH`,
      order.notes ? `\nNotes: ${order.notes}` : null,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customerName || !form.phone) {
      toast.error("Please provide your name and phone number");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        ...form,
        items: cartItems.map((item) => ({
          product: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          color: item.color || "",
          size: item.size || "",
        })),
        total,
      };

      // Save the order to your database first — this is your permanent
      // record, independent of whether the customer actually sends the
      // WhatsApp message or not.
      const response = await axiosInstance.post("/api/order/create", orderPayload);
      const savedOrder = response.data.order;

      // Then open WhatsApp with the order pre-filled, so the customer just
      // has to hit send.
      const message = encodeURIComponent(buildWhatsAppMessage(savedOrder));
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      window.open(whatsappUrl, "_blank");

      toast.success("Order saved! Complete it by sending the WhatsApp message.");
      dispatch(clearCart());
      setForm({ customerName: "", phone: "", city: "", address: "", notes: "" });
    } catch (err) {
      console.error("Error submitting order:", err);
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-serif font-semibold text-[#1A1A1A] mb-2">
        Checkout
      </h1>
      <p className="text-sm text-[#1A1A1A]/60 mb-8">
        Fill in your details below — we'll confirm your order over WhatsApp.
      </p>

      {/* Order Summary */}
      <div className="bg-[#F9F6F0] rounded-2xl p-5 mb-8 space-y-3 border border-[#C9A24B]/20">
        {cartItems.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-[#1A1A1A]">
              {item.title}
              {item.color ? ` (${item.color})` : ""}
              {item.size ? ` - Size ${item.size}` : ""} × {item.quantity}
            </span>
            <span className="text-[#1A1A1A] font-medium">
              {(item.price * item.quantity).toFixed(2)} DH
            </span>
          </div>
        ))}
        <div className="flex justify-between pt-3 border-t border-[#C9A24B]/20 font-semibold text-[#1A1A1A]">
          <span>Total</span>
          <span>{total.toFixed(2)} DH</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/70 mb-1.5">
            Full Name *
          </label>
          <input
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            className="w-full border border-[#C9A24B]/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A24B]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/70 mb-1.5">
            Phone Number *
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="06XXXXXXXX"
            className="w-full border border-[#C9A24B]/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A24B]"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/70 mb-1.5">
              City
            </label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border border-[#C9A24B]/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A24B]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/70 mb-1.5">
              Address
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-[#C9A24B]/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A24B]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/70 mb-1.5">
            Notes (optional)
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={2}
            className="w-full border border-[#C9A24B]/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A24B]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-[#C9A24B] py-4 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-black transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <MessageCircle size={18} />
          )}
          {isSubmitting ? "Submitting..." : "Confirm Order via WhatsApp"}
        </button>
      </form>
    </div>
  );
}