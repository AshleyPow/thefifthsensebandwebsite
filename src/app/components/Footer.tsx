import { Instagram, Youtube } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    // { label: "Music", id: "music" },
    // { label: "Shows", id: "shows" },
  ];

  const moreLinks = [
    { label: "Gallery", id: "gallery" },
    { label: "Videos", id: "videos" },
    { label: "Press Kit", id: "press-kit" },
    { label: "Contact", id: "contact" },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/thefifthsenseband/", color: "#FF4DA6" },
    { icon: Youtube, label: "YouTube", url: "https://www.youtube.com/channel/UCu8qm1imEgN0WYIfHBSDSXA", color: "#b5da26" },
    // { icon: Music2, label: "Spotify", url: "#", color: "#FF4DA6" },
    // { icon: Facebook, label: "Facebook", url: "#", color: "#b5da26" },
    // { icon: Twitter, label: "Twitter", url: "#", color: "#FF4DA6" },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">THE FIFTH SENSE</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Premium live band delivering unforgettable performances for concerts, 
              festivals, and private events worldwide.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#b5da26] hover:bg-[#b5da26]/10 transition-all group"
                >
                  <social.icon
                    size={18}
                    className="text-gray-400 group-hover:text-[#b5da26] transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-[#b5da26]">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-bold mb-4 text-[#FF4DA6]">More</h4>
            <ul className="space-y-3">
              {moreLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 The Fifth Sense. All rights reserved.</p>
          {/* <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
