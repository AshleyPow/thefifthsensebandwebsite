import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Calendar, MapPin, Ticket } from "lucide-react";

export function Shows() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const upcomingShows = [
    {
      date: "Apr 15, 2026",
      venue: "The Grand Theatre",
      city: "New York, NY",
      status: "On Sale",
      ticketUrl: "#",
    },
    {
      date: "Apr 22, 2026",
      venue: "Sunset Music Festival",
      city: "Los Angeles, CA",
      status: "Sold Out",
      ticketUrl: "#",
    },
    {
      date: "May 5, 2026",
      venue: "Royal Arena",
      city: "Chicago, IL",
      status: "On Sale",
      ticketUrl: "#",
    },
    {
      date: "May 18, 2026",
      venue: "Electric Nights Club",
      city: "Miami, FL",
      status: "On Sale",
      ticketUrl: "#",
    },
    {
      date: "Jun 2, 2026",
      venue: "Summer Sound Festival",
      city: "Austin, TX",
      status: "Presale",
      ticketUrl: "#",
    },
    {
      date: "Jun 20, 2026",
      venue: "The Liberty Hall",
      city: "Seattle, WA",
      status: "On Sale",
      ticketUrl: "#",
    },
  ];

  return (
    <section id="shows" className="py-24 px-6 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#b5da26] text-sm uppercase tracking-[0.3em] font-semibold">
            Live Events
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Upcoming Shows
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#b5da26] to-[#FF4DA6] mx-auto" />
        </motion.div>

        <div className="space-y-4">
          {upcomingShows.map((show, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 hover:border-[#b5da26]/50 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
                  <div className="flex items-center gap-3 min-w-[140px]">
                    <Calendar className="text-[#b5da26]" size={20} />
                    <span className="font-semibold">{show.date}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#b5da26] transition-colors">
                      {show.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={16} />
                      <span>{show.city}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      show.status === "Sold Out"
                        ? "bg-red-500/20 text-red-400"
                        : show.status === "Presale"
                        ? "bg-[#FF4DA6]/20 text-[#FF4DA6]"
                        : "bg-[#b5da26]/20 text-[#b5da26]"
                    }`}
                  >
                    {show.status}
                  </span>
                  
                  {show.status !== "Sold Out" && (
                    <button className="bg-[#b5da26] text-[#0A0A0A] px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(181,218,38,0.5)] transition-shadow">
                      <Ticket size={18} />
                      Get Tickets
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            Want us to perform at your event? We're available for festivals, private events, and corporate functions.
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-2 border-[#FF4DA6] text-[#FF4DA6] px-8 py-4 rounded-full font-semibold hover:bg-[#FF4DA6]/10 transition-colors"
          >
            Book Private Event
          </button>
        </motion.div>
      </div>
    </section>
  );
}
