import { Link } from "wouter";
import { Facebook, Instagram, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";

// Helper: fetch settings data
async function fetchJSON(url) {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

export default function Footer() {
  const { data: settings } = useQuery({
    queryKey: ["/api/settings"],
    queryFn: () => fetchJSON("/api/settings"),
  });

  const quickLinks = [
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/appointment" },
  ];

  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            {settings?.logoUrl && (
              <img
                src={settings.logoUrl}
                alt={settings?.companyName || "Logo"}
                className="h-12 w-auto object-contain"
              />
            )}
            <h3 className="font-semibold text-lg text-foreground">
              {settings?.companyName || "Everest Worldwide Consultancy Pvt. Ltd."}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {settings?.footerDescription ||
                "Your trusted partner for international education. We provide expert guidance to help you achieve your dreams of studying abroad."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <a className="text-sm text-muted-foreground hover:text-primary transition-colors hover-elevate inline-block px-2 py-1 rounded-md">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-foreground">Connect With Us</h4>
            <div className="flex flex-wrap gap-3">
              {settings?.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:text-primary hover-elevate transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings?.whatsappUrl && (
                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:text-primary hover-elevate transition"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
              {settings?.tiktokUrl && (
                <a
                  href={settings.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:text-primary hover-elevate transition"
                >
                  <SiTiktok className="w-4 h-4" />
                </a>
              )}
              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:text-primary hover-elevate transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-foreground">Contact Details</h4>
            <ul className="space-y-3">
              {settings?.email && (
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <a href={`mailto:${settings.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.mobile && (
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <a href={`tel:${settings.mobile}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {settings.mobile}
                  </a>
                </li>
              )}
              {settings?.telephone && (
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <a href={`tel:${settings.telephone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
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
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {settings?.companyName || "Everest Worldwide Consultancy Pvt. Ltd."}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
