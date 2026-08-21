import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Download,
  Heart,
  Home as HomeIcon,
  Leaf,
  Star,
} from "lucide-react";
import { AppTopNav } from "@/components/AppTopNav";
import { SectionLabel, SerifTitle } from "@/components/brand";
import { LocationCard } from "@/components/LocationCard";
import { PropertyCard } from "@/components/PropertyCard";
import { popularLocations, properties } from "@/data/locations";
import { IMG } from "@/lib/images";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BookStayX — Luxury Glamping & Konkan Villas" },
      {
        name: "description",
        content:
          "Handpicked luxury glamping domes, hillside villas and lakeside cottages near Pawna Lake, Lonavala and across the Konkan coast.",
      },
      { property: "og:title", content: "BookStayX — Luxury Glamping & Konkan Villas" },
      {
        property: "og:description",
        content: "Premium stays from Pawna Lake to Diveagar. Discover extraordinary Konkan escapes.",
      },
    ],
  }),
  component: HomePage,
});

const stats = [
  { Icon: HomeIcon, value: "50+", label: "Luxury\nProperties" },
  { Icon: Star, value: "4.6", label: "Guest\nRating" },
  { Icon: Heart, value: "10K+", label: "Happy\nGuests" },
  { Icon: Leaf, value: "100%", label: "Nature\nScenery" },
];

const tabs = [
  { id: "top", label: "Top Rated" },
  { id: "recommended", label: "Recommended" },
] as const;

function HomePage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("top");
  const shown = properties.filter((p) => p.tab === tab);

  return (
    <div className="pb-8">
      <AppTopNav scrollAware overlay />

      {/* HERO */}
      <section className="relative min-h-[560px] overflow-hidden">
        <img
          src={IMG.hero}
          alt="Sunset over Pawna Lake with a luxury glamping deck"
          width={1280}
          height={1280}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-shade absolute inset-0" />

        <div className="relative px-5 pt-[calc(max(10px,env(safe-area-inset-top))+58px)]">
          <div className="mt-1">
            <button
              type="button"
              className="press gold-gradient inline-flex items-center gap-2 rounded-[14px] px-5 py-3 text-[14px] font-semibold text-[#141007] shadow-[0_10px_28px_-12px_rgba(217,165,42,0.8)]"
            >
              <Download className="h-[17px] w-[17px]" strokeWidth={2} />
              Install App
            </button>
          </div>

          <div className="mt-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-black/40 px-3.5 py-1.5 backdrop-blur-md">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1.4} />
              <span className="text-[12px] font-medium text-gold-pale">Premium Luxury Stays</span>
            </div>
          </div>

          <h1 className="mt-5 font-display text-[34px] font-semibold leading-[1.14] text-ink">
            Experience Extraordinary Escapes —{" "}
            <span className="italic text-gold">Pawna to Konkan.</span>
          </h1>

          <p className="mt-3.5 max-w-[19rem] text-[13.5px] leading-[1.62] text-ink-soft">
            Discover handpicked luxury glamping domes, hillside villas, and lakeside cottages near Pawna
            Lake, Lonavala, and across the entire Konkan coast — from Alibagh to Diveagar. Your perfect
            escape awaits.
          </p>

          <Link
            to="/properties"
            className="press gold-gradient mt-6 inline-flex items-center gap-3 rounded-[14px] px-6 py-3.5 text-[15px] font-semibold text-[#141007] shadow-[0_14px_34px_-14px_rgba(217,165,42,0.85)]"
          >
            Explore Properties
            <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2} />
          </Link>
          <div className="h-10" />
        </div>
      </section>

      {/* STATS */}
      <section className="-mt-10 px-5">
        <div className="relative grid grid-cols-4 rounded-[18px] border border-hairline bg-[#0c1014]/95 px-2 py-4 backdrop-blur-xl">
          {stats.map(({ Icon, value, label }, i) => (
            <div
              key={value}
              className={cn(
                "flex items-start justify-center gap-2 px-1",
                i > 0 && "border-l border-hairline",
              )}
            >
              <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="text-[15px] font-bold leading-none text-ink">{value}</p>
                <p className="mt-1 whitespace-pre-line text-[9.5px] leading-[1.3] text-ink-muted">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR LOCATIONS */}
      <section className="mt-9 px-5">
        <SectionLabel>Popular Locations</SectionLabel>
        <div className="mt-2 text-center">
          <SerifTitle lead="Popular" accent="Locations" className="text-[32px]" />
        </div>
        <p className="mx-auto mt-2 max-w-[21rem] text-center text-[12.5px] leading-[1.6] text-ink-soft">
          Explore our curated destinations, offering unique experiences and breathtaking landscapes, from
          serene lakes to the Arabian Sea.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {popularLocations.map((l) => (
            <LocationCard
              key={l.slug}
              slug={l.slug}
              name={l.name}
              sub={l.label}
              image={l.image}
              className="aspect-[3/3.4]"
            />
          ))}
        </div>
      </section>

      {/* PROPERTIES — same content inset as locations; cards share that width */}
      <section className="mt-10">
        <div className="px-5 text-center">
          <SerifTitle lead="Explore Our" accent="Properties" />
        </div>

        <div className="mt-4 px-5">
          <div className="flex rounded-full border border-hairline bg-[#0c1014] p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "press flex-1 rounded-full py-2.5 text-[12.5px] font-medium transition-colors",
                  tab === t.id ? "gold-gradient text-[#141007]" : "text-ink-soft",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
          {shown.map((p) => (
            <div key={p.id} className="snap-start">
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
