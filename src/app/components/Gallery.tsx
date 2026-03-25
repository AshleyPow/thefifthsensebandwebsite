import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Mobile browsers sometimes fail to trigger IntersectionObserver reliably,
  // which can leave the gallery at `opacity: 0` forever.
  // Fallback: always show content on small screens.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1024px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1024px)");
    const handleChange = () => setIsMobile(mq.matches);

    handleChange();

    // Safari fallback for older versions
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handleChange);
      return () => mq.removeEventListener("change", handleChange);
    }
    mq.addListener(handleChange);
    return () => mq.removeListener(handleChange);
  }, []);

  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    // Safety net: if IntersectionObserver never flips `isInView` (seen on some mobiles),
    // don't let the section stay invisible forever.
    if (typeof window === "undefined") return;
    if (isInView) return;

    const t = window.setTimeout(() => setForceShow(true), 1500);
    return () => window.clearTimeout(t);
  }, [isInView]);

  const showContent = isMobile || isInView || forceShow;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      url: "/gallery_1.jpg",
      caption: "Vocal Performance",
    },
    {
      url: "/gallery_2.jpg",
      caption: "Bassist",
    },
    {
      url: "/gallery_3.jpg",
      caption: "Guitarist in action",
    },
    {
      url: "/gallery_4.jpg",
      caption: "TFS Band",
    },
    {
      url: "/gallery_5.jpg",
      caption: "Keyboardist",
    },
    {
      url: "/gallery_6.jpg",
      caption: "Vocalist",
    },
  ];

  return (
    <section id="gallery" className="py-24 px-6 bg-[#0f0f0f]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={false}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF4DA6] text-sm uppercase tracking-[0.3em] font-semibold">
            Gallery
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Live Moments
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF4DA6] to-[#b5da26] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={
                showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.4, delay: isMobile ? 0 : index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-semibold">{image.caption}</p>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#b5da26] transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#b5da26] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </section>
  );
}
