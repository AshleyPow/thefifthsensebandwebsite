import { motion } from "motion/react";
import { useInView } from "motion/react";
import React, { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;
const GOOGLE_FORM_SECRET = import.meta.env.VITE_GOOGLE_FORM_SECRET as string | undefined;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  message: "",
};

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const url = GOOGLE_SCRIPT_URL?.trim();
    if (!url) {
      setStatus("error");
      setErrorMessage(
        "Contact form is not configured yet. Add VITE_GOOGLE_SCRIPT_URL to your .env file. See docs/GOOGLE_SHEET_CONTACT_FORM.md."
      );
      return;
    }

    setStatus("submitting");

    const body = new URLSearchParams({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      eventDate: formData.eventDate.trim(),
      message: formData.message.trim(),
    });
    if (GOOGLE_FORM_SECRET?.trim()) {
      body.append("secret", GOOGLE_FORM_SECRET.trim());
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        body,
      });

      const text = await res.text();
      let data: { success?: boolean; error?: string } | null = null;
      try {
        data = JSON.parse(text) as { success?: boolean; error?: string };
      } catch {
        /* Non-JSON (e.g. HTML error page) */
      }

      if (data?.success === true) {
        setStatus("success");
        setFormData(emptyForm);
        return;
      }

      if (data?.success === false) {
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again or email us directly."
        );
        return;
      }

      setStatus("error");
      setErrorMessage(
        !res.ok
          ? `Request failed (${res.status}). Check your web app URL and deployment.`
          : "Unexpected response from the form server. If this persists, see docs/GOOGLE_SHEET_CONTACT_FORM.md (CORS / deployment)."
      );
    } catch {
      setStatus("error");
      setErrorMessage(
        "Could not send your message (network or browser blocked the request). Try again or email us at thefifthsenseband@gmail.com."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#0f0f0f]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF4DA6] text-sm uppercase tracking-[0.3em] font-semibold">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Book The Fifth Sense
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF4DA6] to-[#b5da26] mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ready to make your event unforgettable? Contact us to discuss availability, 
            pricing, and how we can customize our performance for your occasion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#b5da26]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#b5da26]" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <a
                      href="mailto:thefifthsenseband@gmail.com"
                      className="text-gray-400 hover:text-[#b5da26] transition-colors"
                    >
                      thefifthsenseband@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FF4DA6]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#FF4DA6]" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <a
                      href="tel:+918369321159"
                      className="text-gray-400 hover:text-[#FF4DA6] transition-colors"
                    >
                      +91 83693 21159
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#b5da26]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#b5da26]" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Location</div>
                    <p className="text-gray-400">
                      Mumbai
                      <br />
                      Available Worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="bg-gradient-to-br from-[#b5da26]/10 to-[#FF4DA6]/10 border border-white/10 rounded-lg p-6">
              <h4 className="font-bold mb-3">Business Hours</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div> */}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "success" ? (
                <div
                  className="rounded-lg border border-[#b5da26]/40 bg-[#b5da26]/10 px-4 py-3 text-sm text-[#b5da26]"
                  role="status"
                >
                  Thank you! Your message was sent—we&apos;ll get back to you soon.
                </div>
              ) : null}
              {status === "error" && errorMessage ? (
                <div
                  className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                  role="alert"
                >
                  {errorMessage}
                </div>
              ) : null}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 focus:border-[#b5da26] focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 focus:border-[#b5da26] focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 focus:border-[#b5da26] focus:outline-none transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="eventDate" className="block text-sm font-semibold mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 focus:border-[#b5da26] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 focus:border-[#b5da26] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-gradient-to-r from-[#b5da26] to-[#FF4DA6] text-[#0A0A0A] px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(181,218,38,0.5)] transition-shadow disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={20} className="animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={20} aria-hidden />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
