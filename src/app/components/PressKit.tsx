import { motion } from "motion/react";
import { useInView } from "motion/react";
import React, { useRef } from "react";
import { Download, FileText, Music, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Shared press folder: photos & videos */
const MEDIA_DRIVE_URL =
  "https://drive.google.com/drive/folders/1Li1wefwiC5igKk3KtWMrkV_V063OWrCn?usp=sharing";

/** Technical rider PDF on Google Drive */
const TECH_RIDER_URL =
  "https://drive.google.com/file/d/1dwA6gVKgs-BxsRn3-DFRsst6JXdK1okN/view?usp=sharing";

/** Full electronic press kit PDF on Google Drive */
const EPK_PDF_URL =
  "https://drive.google.com/file/d/116n--G0q1pYPiYut0Pg0n2qmoEIqXUjw/view?usp=sharing";

type PressKitItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  href: string;
  buttonLabel: string;
  size?: string;
  /** Use download icon on CTA; default is external-link icon */
  ctaIsDownload?: boolean;
};

export function PressKit() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const downloadItems: PressKitItem[] = [
    // {
    //   icon: FileText,
    //   title: "Band Biography",
    //   description: "Complete bio, fact sheet, and press release",
    //   size: "2.4 MB",
    //   color: "#b5da26",
    // },
    // {
    //   icon: Image,
    //   title: "High-Res Photos",
    //   description: "Professional band photos and performance shots",
    //   size: "45 MB",
    //   color: "#FF4DA6",
    // },
    {
      icon: Music,
      title: "Media (Photos / Videos)",
      description:
        "Press photos and performance videos in our shared Google Drive folder.",
      color: "#b5da26",
      href: MEDIA_DRIVE_URL,
      buttonLabel: "Open media drive",
    },
    {
      icon: FileText,
      title: "Technical Rider",
      description: "Stage plot, input list, and technical requirements",
      color: "#FF4DA6",
      href: TECH_RIDER_URL,
      buttonLabel: "Download",
      ctaIsDownload: true,
    },
  ];

  return (
    <section id="press-kit" className="py-24 px-6 bg-[#0f0f0f]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF4DA6] text-sm uppercase tracking-[0.3em] font-semibold">
            For Media & Organizers
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Press Kit & EPK
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF4DA6] to-[#b5da26] mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Download our electronic press kit PDF, open the shared media folder for photos and videos,
            and grab the technical rider—all in one place for organizers and press.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {downloadItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 hover:border-[#b5da26]/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon size={24} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#b5da26] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                    {"size" in item && item.size != null ? (
                      <span className="text-xs text-gray-500">{item.size}</span>
                    ) : null}
                  </div>
                </div>
              </div>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#b5da26]/10 border border-[#b5da26] text-[#b5da26] px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#b5da26] hover:text-[#0A0A0A] transition-colors"
              >
                {item.ctaIsDownload ? (
                  <Download size={18} aria-hidden />
                ) : (
                  <ExternalLink size={18} aria-hidden />
                )}
                {item.buttonLabel}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-[#b5da26]/10 to-[#FF4DA6]/10 border border-white/10 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Download Complete EPK</h3>
          <p className="text-gray-300 mb-6">
            Get everything in one convenient package - perfect for event organizers and media professionals.
          </p>
          <a
            href={EPK_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-gradient-to-r from-[#b5da26] to-[#FF4DA6] text-[#0A0A0A] px-8 py-4 rounded-full font-semibold items-center gap-2 hover:shadow-[0_0_30px_rgba(181,218,38,0.5)] transition-shadow mx-auto"
          >
            <Download size={20} aria-hidden />
            Download Full Press Kit
          </a>
        </motion.div>
      </div>
    </section>
  );
}
