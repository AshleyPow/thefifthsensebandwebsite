import { motion } from "motion/react";
import { useInView } from "motion/react";
import React, { useRef, useState, useCallback } from "react";
import { Play, Youtube, X } from "lucide-react";

/** Accepts an 11-char video ID or a full youtube.com / youtu.be URL */
function getYoutubeVideoId(input: string): string {
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  try {
    const u = new URL(trimmed);
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1).split("/")[0].slice(0, 11);
    }
    const v = u.searchParams.get("v");
    if (v && /^[\w-]{11}$/.test(v)) return v;
    const embed = u.pathname.match(/\/embed\/([\w-]{11})/);
    if (embed) return embed[1];
  } catch {
    /* not a URL */
  }
  return trimmed.slice(0, 11);
}

function youtubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function youtubeEmbedSrc(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
}

/** Replace with your real video links or IDs */
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/channel/UCu8qm1imEgN0WYIfHBSDSXA";

const videos = [
  {
    title: "The Fifth Sense - Uptown Funk (Cover)",
    youtube: "https://www.youtube.com/watch?v=tI6tFPHj-R8",
    duration: "00:28",
    views: "125K",
  },
  {
    title: "The Fifth Sense - Aunty Ji (Cover)",
    youtube: "https://www.youtube.com/watch?v=_0zSqK2cR5Q",
    duration: "4:12",
    views: "89K",
  },
  {
    title: "The Fifth Sense - Aa Zara (Cover)",
    youtube: "https://www.youtube.com/watch?v=t7OcAuuuR58",
    duration: "28:15",
    views: "56K",
  },
  {
    title: "The Fifth Sense - Om Shanti Om (Cover)",
    youtube: "https://www.youtube.com/watch?v=OVPEFa3Pjz0",
    duration: "5:03",
    views: "92K",
  },
].map((v) => {
  const id = getYoutubeVideoId(v.youtube);
  return { ...v, youtubeId: id, thumbnail: youtubeThumbnailUrl(id) };
});

export function Videos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const closePlayer = useCallback(() => setActiveVideoId(null), []);

  return (
    <section id="videos" className="py-24 px-6 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#b5da26] text-sm uppercase tracking-[0.3em] font-semibold">
            Watch Us
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Video Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#b5da26] to-[#FF4DA6] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={`${video.youtubeId}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => setActiveVideoId(video.youtubeId)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveVideoId(video.youtubeId);
                }
              }}
            >
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#b5da26] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(181,218,38,0.5)]">
                    <Play size={28} className="text-[#0A0A0A] ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded text-sm font-semibold">
                  {video.duration}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#b5da26] transition-colors">
                {video.title}
              </h3>
              <p className="text-gray-400 text-sm">{video.views} views</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border-2 border-[#FF4DA6] text-[#FF4DA6] px-8 py-4 rounded-full font-semibold items-center gap-2 hover:bg-[#FF4DA6]/10 transition-colors"
          >
            <Youtube size={20} />
            Visit Our YouTube Channel
          </a>
        </motion.div>
      </div>

      {/* In-site YouTube player */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="YouTube video player"
          onClick={closePlayer}
        >
          <button
            type="button"
            className="absolute top-4 right-4 md:top-8 md:right-8 z-10 text-white hover:text-[#b5da26] transition-colors p-2 rounded-full hover:bg-white/10"
            onClick={closePlayer}
            aria-label="Close video"
          >
            <X size={32} />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden shadow-[0_0_60px_rgba(181,218,38,0.15)] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              title="YouTube video player"
              src={youtubeEmbedSrc(activeVideoId)}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      )}
    </section>
  );
}
