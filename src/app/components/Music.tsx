import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Play, Music2, Download } from "lucide-react";

export function Music() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const tracks = [
    { title: "Electric Nights", duration: "3:45", album: "Live Sessions Vol. 1" },
    { title: "Midnight Drive", duration: "4:12", album: "Live Sessions Vol. 1" },
    { title: "Feel the Beat", duration: "3:28", album: "Studio Sessions" },
    { title: "Neon Dreams", duration: "5:03", album: "Studio Sessions" },
    { title: "Unity", duration: "4:35", album: "Live Sessions Vol. 2" },
    { title: "Forever Young", duration: "3:52", album: "Live Sessions Vol. 2" },
  ];

  return (
    <section id="music" className="py-24 px-6 bg-[#0f0f0f]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF4DA6] text-sm uppercase tracking-[0.3em] font-semibold">
            Our Music
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Listen to Our Sound
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF4DA6] to-[#b5da26] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Featured Album */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1a1a1a] rounded-lg p-8 border border-white/10 hover:border-[#b5da26]/50 transition-colors"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#b5da26] to-[#FF4DA6] rounded-lg flex items-center justify-center">
                <Music2 size={48} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Live Sessions Vol. 1</h3>
                <p className="text-gray-400">2024 • 8 tracks</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Our latest collection featuring high-energy live performances from our recent tour.
            </p>
            <button className="bg-[#b5da26] text-[#0A0A0A] px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(181,218,38,0.5)] transition-shadow">
              <Play size={18} />
              Play Album
            </button>
          </motion.div>

          {/* Spotify/Streaming Embed Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#1a1a1a] rounded-lg p-8 border border-white/10 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-[#FF4DA6]/20 rounded-full flex items-center justify-center mb-4">
              <Music2 size={40} className="text-[#FF4DA6]" />
            </div>
            <h3 className="text-xl font-bold mb-2">Stream on Your Favorite Platform</h3>
            <p className="text-gray-400 mb-6">
              Available on Spotify, Apple Music, YouTube Music, and more
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-[#b5da26] text-[#b5da26] rounded-full hover:bg-[#b5da26]/10 transition-colors">
                Spotify
              </button>
              <button className="px-6 py-2 border border-[#FF4DA6] text-[#FF4DA6] rounded-full hover:bg-[#FF4DA6]/10 transition-colors">
                Apple Music
              </button>
            </div>
          </motion.div>
        </div>

        {/* Track List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h3 className="text-2xl font-bold">Popular Tracks</h3>
          </div>
          <div className="divide-y divide-white/10">
            {tracks.map((track, index) => (
              <div
                key={index}
                className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-[#b5da26]/20 flex items-center justify-center group-hover:bg-[#b5da26] transition-colors">
                    <Play size={16} className="text-[#b5da26] group-hover:text-[#0A0A0A]" />
                  </button>
                  <div>
                    <div className="font-semibold mb-1">{track.title}</div>
                    <div className="text-sm text-gray-400">{track.album}</div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-gray-400">{track.duration}</span>
                  <button className="text-gray-400 hover:text-[#FF4DA6] transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
