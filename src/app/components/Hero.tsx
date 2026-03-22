import { motion } from "motion/react";
import { Play, Music, Calendar } from "lucide-react";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/main_banner_hq.jpeg"
          alt="The Fifth Sense performing live"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/70 to-[#0A0A0A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <span className="text-[#b5da26] text-sm uppercase tracking-[0.3em] font-semibold">
              Live Band Experience
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
            THE FIFTH
            <br />
            <span className="text-[#FF4DA6]">SENSE</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Elevating every event with unforgettable performances. 
            Premium live music for concerts, festivals, and private events.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("music")}
              className="bg-[#b5da26] text-[#0A0A0A] px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(181,218,38,0.5)] transition-shadow"
            >
              <Music size={20} />
              Listen
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("videos")}
              className="bg-transparent border-2 border-[#FF4DA6] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-[#FF4DA6]/10 hover:shadow-[0_0_30px_rgba(255,77,166,0.3)] transition-all"
            >
              <Play size={20} />
              Watch
            </motion.button> */}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:border-[#b5da26] hover:text-[#b5da26] transition-colors"
            >
              <Calendar size={20} />
              Book Us
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-[#b5da26] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
