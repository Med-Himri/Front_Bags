// "use client";

// import React from "react";
// import { useForm, ValidationError } from "@formspree/react";
// import { ArrowRight, Mail, Phone, CheckCircle, Globe, Sparkles } from "lucide-react";

// export function CTA() {
//   const [state, handleSubmit] = useForm("xpqvyqyd");

//   return (
//     <section id="contact" className="py-32 bg-[#F9F6F0]">
//       <div className="container mx-auto max-w-7xl px-6">
//         <div className="rounded-3xl overflow-hidden shadow-xl border border-[#D4AF37]/30">
//           <div className="grid lg:grid-cols-5 gap-0">
            
//             {/* Left Column - Slate Gray Brand Block (40%) */}
//             <div className="lg:col-span-2 bg-[#626060] p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20">
//               {/* Soft Gold Glow */}
//               <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/15 blur-[100px] rounded-full -mr-32 -mt-32" />
              
//               <div className="relative z-10 space-y-8">
//                 <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 px-4 py-1.5 rounded-full border border-[#D4AF37]/40">
//                   <Globe size={13} className="text-[#D4AF37]" aria-hidden="true" />
//                   <span className="text-[#FAFAFA] text-[10px] font-bold uppercase tracking-widest">
//                     Global Concierge
//                   </span>
//                 </div>

//                 <h2 className="text-[#FAFAFA] text-4xl lg:text-5xl font-serif leading-[1.15] font-light">
//                   Acquire Zack <br />
//                   <span className="text-[#D4AF37] italic font-normal">Leather Creations</span>
//                 </h2>

//                 <p className="text-[#FAFAFA]/85 text-sm leading-relaxed font-normal">
//                   Connect with our personal concierge. We arrange bespoke leathercraft allocations, custom monogramming, and express international delivery for private clients and luxury retailers.
//                 </p>

//                 <div className="space-y-6 pt-6 border-t border-white/20">
//                   <div className="flex items-center space-x-4 group">
//                     <div className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-xl p-3 group-hover:bg-[#D4AF37] transition-colors duration-300">
//                       <Phone className="text-[#D4AF37] group-hover:text-[#111111] transition-colors duration-300" size={16} aria-hidden="true" />
//                     </div>
//                     <div>
//                       <p className="text-[#FAFAFA]/60 text-[9px] uppercase font-bold tracking-wider">Direct Maison Line</p>
//                       <a href="tel:+212 619-805905" className="text-[#FAFAFA] text-sm font-medium hover:text-[#D4AF37] transition-colors">
//                         +212 619-805905
//                       </a>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-4 group">
//                     <div className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-xl p-3 group-hover:bg-[#D4AF37] transition-colors duration-300">
//                       <Mail className="text-[#D4AF37] group-hover:text-[#111111] transition-colors duration-300" size={16} aria-hidden="true" />
//                     </div>
//                     <div>
//                       <p className="text-[#FAFAFA]/60 text-[9px] uppercase font-bold tracking-wider">Client Relations</p>
//                       <a href="mailto:contact.zackluxury@gmail.com" className="text-[#FAFAFA] text-sm font-medium hover:text-[#D4AF37] transition-colors">
//                         contact.zackluxury@gmail.com
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Minimal Text Footer Indicator */}
//               <div className="relative z-10 mt-16 pt-6 border-t border-white/20 flex items-center gap-2 text-[#D4AF37]">
//                 <Sparkles size={14} />
//                 <p className="text-[#FAFAFA]/90 text-[11px] font-medium tracking-wide">
//                   Zack Luxury Leathercraft Atelier
//                 </p>
//               </div>
//             </div>

//             {/* Right Column - Off-White Premium Form (60%) */}
//             <div className="lg:col-span-3 bg-[#F9F6F0]/95 p-12 lg:p-20 flex flex-col justify-center">
//               {state.succeeded ? (
//                 <div className="text-center space-y-6 py-12 animate-in fade-in zoom-in duration-500" role="alert">
//                   <div className="flex justify-center">
//                     <div className="bg-[#D4AF37]/20 p-5 rounded-full border border-[#D4AF37]/40">
//                       <CheckCircle size={64} className="text-[#D4AF37]" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <h3 className="text-2xl font-serif text-[#111111]">Inquiry Registered</h3>
//                     <p className="text-[#111111]/70 text-sm max-w-xs mx-auto">
//                       Our client advisor will compile your requested specifications and boutique collection catalog within one business day.
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => window.location.reload()}
//                     className="px-6 py-3 rounded-xl border border-[#D4AF37] text-[#111111] hover:bg-[#D4AF37] transition-all text-xs font-bold tracking-wide uppercase"
//                   >
//                     Submit Another Inquiry
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="mb-12">
//                     <h3 className="text-[#111111] text-2xl font-serif font-medium mb-2">Bespoke Inquiry</h3>
//                     <p className="text-[#111111]/70 text-xs font-medium tracking-wide">
//                       Provide your details below to request catalog access, private commissions, or volume pricing.
//                     </p>
//                   </div>

//                   <form onSubmit={handleSubmit} className="space-y-8">
//                     <div className="grid md:grid-cols-2 gap-8">
//                       <div className="space-y-1.5">
//                         <label htmlFor="company" className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70 ml-0.5">
//                           Company / Client Name
//                         </label>
//                         <input
//                           id="company"
//                           name="company"
//                           required
//                           type="text"
//                           autoComplete="organization"
//                           className="w-full py-3 bg-transparent border-b-2 border-[#111111]/20 focus:outline-none focus:border-[#D4AF37] transition-colors text-[#111111] placeholder:text-[#111111]/40 text-sm font-medium"
//                           placeholder="Boutique Luxury Ltd"
//                         />
//                       </div>
//                       <div className="space-y-1.5">
//                         <label htmlFor="full-name" className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70 ml-0.5">
//                           Representative Name
//                         </label>
//                         <input
//                           id="full-name"
//                           name="name"
//                           required
//                           type="text"
//                           autoComplete="name"
//                           className="w-full py-3 bg-transparent border-b-2 border-[#111111]/20 focus:outline-none focus:border-[#D4AF37] transition-colors text-[#111111] placeholder:text-[#111111]/40 text-sm font-medium"
//                           placeholder="Elena Rossi"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-8">
//                       <div className="space-y-1.5">
//                         <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70 ml-0.5">
//                           Direct Email
//                         </label>
//                         <input
//                           id="email"
//                           name="email"
//                           required
//                           type="email"
//                           autoComplete="email"
//                           className="w-full py-3 bg-transparent border-b-2 border-[#111111]/20 focus:outline-none focus:border-[#D4AF37] transition-colors text-[#111111] placeholder:text-[#111111]/40 text-sm font-medium"
//                           placeholder="elena@luxurybrand.com"
//                         />
//                         <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-600 text-[10px] mt-1 font-bold uppercase" />
//                       </div>
//                       <div className="space-y-1.5">
//                         <label htmlFor="country" className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70 ml-0.5">
//                           Destination Country
//                         </label>
//                         <input
//                           id="country"
//                           name="country"
//                           required
//                           type="text"
//                           className="w-full py-3 bg-transparent border-b-2 border-[#111111]/20 focus:outline-none focus:border-[#D4AF37] transition-colors text-[#111111] placeholder:text-[#111111]/40 text-sm font-medium"
//                           placeholder="France"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-1.5">
//                       <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70 ml-0.5">
//                         Bespoke Requirements & Notes
//                       </label>
//                       <textarea
//                         id="message"
//                         name="message"
//                         required
//                         rows={3}
//                         className="w-full py-3 bg-transparent border-b-2 border-[#111111]/20 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none text-[#111111] placeholder:text-[#111111]/40 text-sm font-medium"
//                         placeholder="Detail your request for leather finishes, custom monograms, or order allocations..."
//                       ></textarea>
//                       <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-600 text-[10px] mt-1 font-bold uppercase" />
//                     </div>

//                     {/* Button Design */}
//                     <button
//                       type="submit"
//                       disabled={state.submitting}
//                       className="w-full py-4 rounded-xl text-[#111111] font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#b8972e] active:scale-[0.99] shadow-md"
//                     >
//                       <span>
//                         {state.submitting ? "Processing Inquiry..." : "Request Private Catalog"}
//                       </span>
//                       {!state.submitting && <ArrowRight size={14} className="text-[#111111]" aria-hidden="true" />}
//                     </button>
//                   </form>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Phone, CheckCircle, Globe, Sparkles } from "lucide-react";

// Your real business number, formatted for wa.me (country code + number,
// no +, no spaces, no dashes)
const WHATSAPP_NUMBER = "212619805905";

export function CTA() {
  const [form, setForm] = useState({
    name: "",
    cityAddress: "",
    message: "",
  });
  const [succeeded, setSucceeded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `New inquiry from Zack Luxury website`,
      ``,
      `Name: ${form.name}`,
      form.cityAddress ? `City/Address: ${form.cityAddress}` : null,
      ``,
      `Message:`,
      form.message,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.message) {
      return;
    }

    const message = encodeURIComponent(buildWhatsAppMessage());
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    setSucceeded(true);
  };

  return (
    <section id="contact" className="py-32 bg-[#F9F6F0]">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-[#D4AF37]/30">
          <div className="grid lg:grid-cols-5 gap-0">
            
            {/* Left Column - Slate Gray Brand Block (40%) */}
            <div className="lg:col-span-2 bg-[#626060] p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20">
              {/* Soft Gold Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/15 blur-[100px] rounded-full -mr-32 -mt-32" />
              
              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 px-4 py-1.5 rounded-full border border-[#D4AF37]/40">
                  <Globe size={13} className="text-[#D4AF37]" aria-hidden="true" />
                  <span className="text-[#FAFAFA] text-[10px] font-bold uppercase tracking-widest">
                    Morocco Delivery
                  </span>
                </div>

                <h2 className="text-[#FAFAFA] text-4xl lg:text-5xl font-serif leading-[1.15] font-light">
                  Acquire Zack <br />
                  <span className="text-[#D4AF37] italic font-normal">Leather Creations</span>
                </h2>

                <p className="text-[#FAFAFA]/85 text-sm leading-relaxed font-normal">
                  Reach out directly for questions about our handbags, sizing, or delivery across Morocco. We're happy to help you find the right piece.
                </p>

                <div className="space-y-6 pt-6 border-t border-white/20">
                  <div className="flex items-center space-x-4 group">
                    <div className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-xl p-3 group-hover:bg-[#D4AF37] transition-colors duration-300">
                      <Phone className="text-[#D4AF37] group-hover:text-[#111111] transition-colors duration-300" size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[#FAFAFA]/60 text-[9px] uppercase font-bold tracking-wider">Direct Maison Line</p>
                      <a href="tel:+212 619-805905" className="text-[#FAFAFA] text-sm font-medium hover:text-[#D4AF37] transition-colors">
                        +212 619-805905
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group">
                    <div className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-xl p-3 group-hover:bg-[#D4AF37] transition-colors duration-300">
                      <Mail className="text-[#D4AF37] group-hover:text-[#111111] transition-colors duration-300" size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[#FAFAFA]/60 text-[9px] uppercase font-bold tracking-wider">Client Relations</p>
                      <a href="mailto:contact.zackluxury@gmail.com" className="text-[#FAFAFA] text-sm font-medium hover:text-[#D4AF37] transition-colors">
                        contact.zackluxury@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal Text Footer Indicator */}
              <div className="relative z-10 mt-16 pt-6 border-t border-white/20 flex items-center gap-2 text-[#D4AF37]">
                <Sparkles size={14} />
                <p className="text-[#FAFAFA]/90 text-[11px] font-medium tracking-wide">
                  Zack Luxury Leathercraft Atelier
                </p>
              </div>
            </div>

            {/* Right Column - Off-White Premium Form (60%) */}
            <div className="lg:col-span-3 bg-[#F9F6F0]/95 p-12 lg:p-20 flex flex-col justify-center">
              {succeeded ? (
                <div className="text-center space-y-6 py-12 animate-in fade-in zoom-in duration-500" role="alert">
                  <div className="flex justify-center">
                    <div className="bg-[#D4AF37]/20 p-5 rounded-full border border-[#D4AF37]/40">
                      <CheckCircle size={64} className="text-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-[#111111]">WhatsApp Opened</h3>
                    <p className="text-[#111111]/70 text-sm max-w-xs mx-auto">
                      Your inquiry is ready in WhatsApp — just hit send there to reach our client advisor directly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSucceeded(false);
                      setForm({ name: "", cityAddress: "", message: "" });
                    }}
                    className="px-6 py-3 rounded-xl border border-[#D4AF37] text-[#111111] hover:bg-[#D4AF37] transition-all text-xs font-bold tracking-wide uppercase"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-12">
                    <h3 className="text-[#111111] text-2xl font-serif font-medium mb-2">Bespoke Inquiry</h3>
                    <p className="text-[#111111]/70 text-xs font-medium tracking-wide">
                      Provide your details below — we'll open WhatsApp so you can send your inquiry directly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-1.5">
                        <label htmlFor="full-name" className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70 ml-0.5">
                          Full Name
                        </label>
                        <input
                          id="full-name"
                          name="name"
                          required
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full py-3 bg-transparent border-b-2 border-[#111111]/20 focus:outline-none focus:border-[#D4AF37] transition-colors text-[#111111] placeholder:text-[#111111]/40 text-sm font-medium"
                          placeholder="Sara Amrani"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="cityAddress" className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70 ml-0.5">
                          City / Address
                        </label>
                        <input
                          id="cityAddress"
                          name="cityAddress"
                          type="text"
                          value={form.cityAddress}
                          onChange={handleChange}
                          className="w-full py-3 bg-transparent border-b-2 border-[#111111]/20 focus:outline-none focus:border-[#D4AF37] transition-colors text-[#111111] placeholder:text-[#111111]/40 text-sm font-medium"
                          placeholder="Casablanca, Maarif"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-[#111111]/70 ml-0.5">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full py-3 bg-transparent border-b-2 border-[#111111]/20 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none text-[#111111] placeholder:text-[#111111]/40 text-sm font-medium"
                        placeholder="Tell us what you're looking for..."
                      ></textarea>
                    </div>

                    {/* Button Design */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-[#111111] font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#b8972e] active:scale-[0.99] shadow-md"
                    >
                      <span>Send via WhatsApp</span>
                      <ArrowRight size={14} className="text-[#111111]" aria-hidden="true" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}