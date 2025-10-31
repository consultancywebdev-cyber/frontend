import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { Facebook, Instagram, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_URL || "";

// Helper: fetch settings data
async function fetchJSON(path) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

export default function Footer() {
  const { data: settings } = useQuery({
    queryKey: [API_BASE, "/api/settings"],
    queryFn: () => fetchJSON("/api/settings"),
    staleTime: 60_000,
  });

  const fbRef = useRef(null);

  // Load Facebook SDK once
  useEffect(() => {
    if (window.FB) return; // already loaded
    const script = document.createElement("script");
    script.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v24.0&appId=1172993544730705";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  // Re-parse FB widget when URL available
  useEffect(() => {
    if (window.FB && fbRef.current) {
      window.FB.XFBML.parse(fbRef.current);
    }
  }, [settings?.facebookUrl]);

  const quickLinks = [
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/appointment" },
  ];

  return (
    <footer className="bg-card border-t mt-20">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand / Summary */}
          <div className="space-y-4">
            {settings?.logoUrl && (
              <img
                src={settings.logoUrl}
                alt={settings?.companyName || "Logo"}
                className="h-12 w-auto object-contain"
              />
            )}
            <h3 className="text-xl font-semibold text-foreground">
              {settings?.companyName || "Everest Worldwide Consultancy Pvt. Ltd."}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {settings?.footerDescription ||
                "Your trusted partner for international education. We provide expert guidance to help you achieve your dreams of studying abroad."}
            </p>

            {/* Social row (compact) */}
            <div className="flex gap-3 pt-2">
              {settings?.facebookUrl && (
                <a
                  aria-label="Facebook"
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:text-primary transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings?.instagramUrl && (
                <a
                  aria-label="Instagram"
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:text-primary transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings?.tiktokUrl && (
                <a
                  aria-label="TikTok"
                  href={settings.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:text-primary transition"
                >
                  <SiTiktok className="w-4 h-4" />
                </a>
              )}
              {settings?.whatsappUrl && (
                <a
                  aria-label="WhatsApp"
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:text-primary transition"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <a className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                      {/* small bullet decoration */}
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/70"></span>
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              {settings?.email && (
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.mobile && (
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <a
                    href={`tel:${settings.mobile}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {settings.mobile}
                  </a>
                </li>
              )}
              {settings?.telephone && (
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <a
                    href={`tel:${settings.telephone}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {settings.telephone}
                  </a>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{settings.address}</p>
                </li>
              )}
            </ul>
          </div>

          {/* Facebook Live Feed (responsive container) */}
          <div className="md:block">
            <h4 className="text-base font-semibold text-foreground mb-4">Latest from Facebook</h4>

            {/* On very small screens we hide the embed to avoid layout jump */}
            <div
              ref={fbRef}
              className="hidden md:flex justify-center md:justify-start"
            >
              {settings?.facebookUrl && (
                <div
                  className="fb-page w-full max-w-sm lg:max-w-xs"
                  data-href={settings.facebookUrl}
                  data-tabs="timeline"
                  data-width=""
                  data-height="420"
                  data-small-header="false"
                  data-adapt-container-width="true"
                  data-hide-cover="false"
                  data-show-facepile="true"
                ></div>
              )}
            </div>

            {/* Fallback link on mobile (where we hide the heavy iframe) */}
            {settings?.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden inline-flex items-center gap-2 text-sm text-primary mt-2"
              >
                <Facebook className="w-4 h-4" />
                View our latest updates
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} {settings?.companyName || "Everest Worldwide Consultancy Pvt. Ltd."} · All rights reserved.
          </p>

          {/* Optional policy links if you add them to settings later */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {settings?.termsUrl && (
              <a href={settings.termsUrl} className="hover:text-primary transition-colors">
                Terms
              </a>
            )}
            {settings?.privacyUrl && (
              <>
                <span className="opacity-40">•</span>
                <a href={settings.privacyUrl} className="hover:text-primary transition-colors">
                  Privacy
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
