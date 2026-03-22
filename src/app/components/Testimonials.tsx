import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const testimonials = [
    {
      quote: "The Fifth Sense performed at our wedding reception, and they were absolutely fantastic. They struck the perfect balance between elegance and energy, keeping the atmosphere lively without ever feeling overwhelming. Their song choices and transitions were seamless, and the entire band was extremely professional to work with. Easily one of the highlights of our evening.",
      author: "Dr. Azhar Zojwalla",
      role: "Groom",
      company: "Wedding",
      rating: 5,
    },
    {
      quote: "The Fifth Sense performed at our wedding reception, and they were absolutely fantastic. They struck the perfect balance between elegance and energy, keeping the atmosphere lively without ever feeling overwhelming. Their song choices and transitions were seamless, and the entire band was extremely professional to work with. Easily one of the highlights of our evening.",
      author: "Janavi Zojwalla",
      role: "Bride",
      company: "Wedding",
      rating: 5,
    },
    {
      quote: "The Fifth Sense didn’t just perform at my daughter’s wedding, they completely elevated the experience. From the first song to the last, they created an atmosphere that felt personal, energetic, and memorable. They were also incredibly easy to work with throughout, which made a big difference during the planning process. Highly recommended for anyone looking to add something special to their event.",
      author: "Mahesh Tapase",
      role: "Owner",
      company: "Private Event",
      rating: 5,
    },
    {
      quote: "The Fifth Sense was a great addition to our corporate event. They were punctual, well-prepared, and easy to coordinate with from a production standpoint. Their performance was engaging without being intrusive, which worked perfectly for our audience. We would definitely consider working with them again.",
      author: "Yashvardhan Sakhalkar",
      role: "Party Host",
      company: "Private Event",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#b5da26] text-sm uppercase tracking-[0.3em] font-semibold">
            What People Say
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Testimonials
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#b5da26] to-[#FF4DA6] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-lg p-8 hover:border-[#b5da26]/50 transition-all relative"
            >
              <div className="absolute top-8 right-8 opacity-10">
                <Quote size={80} className="text-[#b5da26]" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-[#FF4DA6] fill-[#FF4DA6]"
                  />
                ))}
              </div>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed relative z-10">
                "{testimonial.quote}"
              </p>

              <div className="relative z-10">
                <div className="font-bold text-lg">{testimonial.author}</div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
                <div className="text-sm text-[#b5da26]">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
