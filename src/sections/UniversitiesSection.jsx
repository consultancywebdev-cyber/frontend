import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Globe } from "lucide-react";
import { Card } from "../ui/card";

// ✅ Base API URL from environment (.env)
const API_BASE = import.meta.env.VITE_API_URL || "";

// ✅ Helper: absolute URL + credentials + readable errors
async function fetchJSON(path) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

export function UniversitiesSection() {
  const { data: universities = [], isLoading } = useQuery({
    queryKey: [API_BASE, "/api/universities"],
    queryFn: () => fetchJSON("/api/universities"),
    staleTime: 60_000,
  });

  const activeUniversities = (universities || [])
    .filter((uni) => uni && uni.isActive)
    .slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-20 bg-muted rounded-md mb-4" />
                <div className="h-6 bg-muted rounded-md mb-2" />
                <div className="h-4 bg-muted rounded-md" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (activeUniversities.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Partner Universities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We collaborate with prestigious institutions worldwide to bring you the best educational opportunities
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activeUniversities.map((university, idx) => {
            const key =
              university.id ||
              university._id ||
              university.slug ||
              university.name ||
              `university-${idx}`;

            const logoUrl = university.logoUrl || "";
            const name = university.name || "University";
            const country = university.country || "";
            const websiteUrl = university.websiteUrl || "";

            return (
              <Card
                key={key}
                className="p-6 hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-1"
                data-testid={`card-university-${key}`}
              >
                {/* University Logo */}
                {logoUrl ? (
                  <div className="flex items-center justify-center h-20 mb-4">
                    <img
                      src={logoUrl}
                      alt={name}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                      decoding="async"
                      data-testid={`img-university-logo-${key}`}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-20 mb-4 bg-primary/5 rounded-md">
                    <Globe className="w-10 h-10 text-primary" aria-hidden="true" />
                  </div>
                )}

                {/* University Info */}
                <h3
                  className="text-lg font-semibold text-foreground mb-2"
                  data-testid={`text-university-name-${key}`}
                >
                  {name}
                </h3>

                {country ? (
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">
                      {getCountryFlag(country)}
                    </span>
                    {country}
                  </p>
                ) : null}

                {university.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {university.description}
                  </p>
                )}

                {/* Website Link */}
                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    data-testid={`link-university-website-${key}`}
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 🔤 Case-insensitive country name → flag emoji
function getCountryFlag(countryRaw) {
  const country = String(countryRaw).trim().toLowerCase();
  const flags = {
    "united states": "🇺🇸",
    "united kingdom": "🇬🇧",
    canada: "🇨🇦",
    australia: "🇦🇺",
    germany: "🇩🇪",
    france: "🇫🇷",
    netherlands: "🇳🇱",
    switzerland: "🇨🇭",
    singapore: "🇸🇬",
    japan: "🇯🇵",
    "south korea": "🇰🇷",
    "new zealand": "🇳🇿",
    india: "🇮🇳",
    china: "🇨🇳",
    italy: "🇮🇹",
    spain: "🇪🇸",
    ireland: "🇮🇪",
    sweden: "🇸🇪",
    norway: "🇳🇴",
    finland: "🇫🇮",
    denmark: "🇩🇰",
    "united arab emirates": "🇦🇪",
    malaysia: "🇲🇾",
  };
  return flags[country] || "🌍";
}
