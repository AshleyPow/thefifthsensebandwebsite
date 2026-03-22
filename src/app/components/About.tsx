import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-24 px-6 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#b5da26] text-sm uppercase tracking-[0.3em] font-semibold">
            About Us
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Meet The Fifth Sense
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#b5da26] to-[#FF4DA6] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#b5da26] to-[#FF4DA6] rounded-lg opacity-50 group-hover:opacity-75 blur transition duration-500" />
              <img
                src="/about_us.JPG"
                alt="The Fifth Sense band members"
                className="relative rounded-lg w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              The Fifth Sense is a Mumbai-based five-piece live band known for dynamic performances
              that fuse Bollywood, modern rock, and alternative influences.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Active in the city's live music and college festival circuit, the band is recognized for
              reimagining popular songs with a fresh live-band sound, tight musicianship, and
              high-energy stage presence.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#b5da26] mb-2">50+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Songs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF4DA6] mb-2">3+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#b5da26] mb-2">100%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Live</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
