import { createFileRoute, Link } from "@tanstack/react-router";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpDown,
  Building2,
  ChevronDown,
  Gem,
  Hotel,
  LayoutGrid,
  MapPin,
  Settings2,
  Tent,
  Trees,
} from "lucide-react";
import { AppTopNav } from "@/components/AppTopNav";
import { PropertyGridCard } from "@/components/PropertyGridCard";
import {
  properties,
  type PropertyCategory,
  type PropertyTier,
} from "@/data/locations";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import { cn } from "@/lib/utils";

type PropertySearch = { location?: string | undefined };

export const Route = createFileRoute("/properties/")({
  validateSearch: (search: Record<string, unknown>): PropertySearch => ({
    location: typeof search["location"] === "string" ? (search["location"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Properties — Luxury Villas, Domes & Cottages | BookStayX" },
      {
        name: "description",
        content:
          "Browse luxury villas, glamping domes and beach cottages across Pawna, Lonavala and the Konkan coast.",
      },
      { property: "og:title", content: "Properties — Luxury Villas, Domes & Cottages" },
      {
        property: "og:description",
        content: "Handpicked premium stays across Maharashtra's lakes and Konkan beaches.",
      },
    ],
  }),
  component: PropertiesPage,
});

const categories: {
  id: "all" | PropertyCategory;
  label: string;
  Icon: typeof LayoutGrid;
}[] = [
  { id: "all", label: "All", Icon: LayoutGrid },
  { id: "villas", label: "Villas", Icon: Building2 },
  { id: "camping", label: "Camping & Cottages", Icon: Tent },
  { id: "hotel", label: "Hotel Rooms", Icon: Hotel },
  { id: "campings", label: "Campings", Icon: Trees },
];

const tiers: { id: PropertyTier; label: string }[] = [
  { id: "affordable", label: "Affordable" },
  { id: "premium", label: "Premium" },
  { id: "luxury", label: "Luxury" },
];

function PropertiesPage() {
  const { location } = Route.useSearch();

  const [category, setCategory] = useState<"all" | PropertyCategory>("all");
  const [tier, setTier] = useState<PropertyTier | null>("affordable");
  const [headerOffset, setHeaderOffset] = useState(64);
  const [chromeHeight, setChromeHeight] = useState(160);

  const filtersShellRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);

  useHideOnScroll([filtersShellRef], { lockMs: 750, threshold: 64 });

  useLayoutEffect(() => {
    const chrome = chromeRef.current;
    if (!chrome) return;
    const update = () => setChromeHeight(chrome.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(chrome);
    return () => ro.disconnect();
  }, []);

  const list = useMemo(() => {
    return properties.filter((p) => {
      if (location && p.locationSlug !== location) return false;
      if (category !== "all" && p.category !== category) return false;
      if (tier && p.tier !== tier) return false;
      return true;
    });
  }, [category, location, tier]);

  return (
    <div className="min-h-screen bg-[#0B0E11] pb-2">
      <AppTopNav onHeightChange={setHeaderOffset} />

      <div
        ref={chromeRef}
        style={{ top: headerOffset }}
        className="fixed inset-x-0 z-30 mx-auto w-full max-w-[480px] bg-[#0B0E11]"
      >
        <div
          ref={filtersShellRef}
          data-visible="true"
          className={cn(
            "group hide-on-scroll-panel grid",
            "data-[visible=true]:grid-rows-[1fr] data-[visible=true]:opacity-100",
            "data-[visible=false]:grid-rows-[0fr] data-[visible=false]:opacity-0",
            "data-[visible=false]:pointer-events-none",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="hide-on-scroll-inner bg-[#0B0E11] pt-3 pb-3 group-data-[visible=false]:-translate-y-2 group-data-[visible=false]:opacity-0">
              <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-0.5">
                {categories.map(({ id, label, Icon }) => {
                  const active = category === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setCategory(id)}
                      className={cn(
                        "press flex shrink-0 flex-col items-center justify-center gap-1 rounded-[12px] border px-3.5 py-2.5",
                        active
                          ? "border-[#E0B84A] bg-[#E0B84A]/[0.06] text-white"
                          : "border-white/12 bg-transparent text-[#9AA1AB]",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px]",
                          active ? "text-[#E0B84A]" : "text-[#C9CDD4]",
                        )}
                        strokeWidth={1.6}
                      />
                      <span
                        className={cn(
                          "whitespace-nowrap text-[10.5px] font-medium leading-none",
                          active ? "text-white" : "text-[#9AA1AB]",
                        )}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 px-4">
                <div className="grid grid-cols-3 gap-2">
                  {tiers.map(({ id, label }) => {
                    const active = tier === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setTier(active ? null : id)}
                        className={cn(
                          "press flex items-center justify-center gap-1.5 rounded-full border py-[8px] text-[11.5px] font-medium",
                          active
                            ? "border-[#E0B84A] bg-[#E0B84A]/[0.06] text-[#E0B84A]"
                            : "border-white/14 bg-transparent text-[#B0B6BF]",
                        )}
                      >
                        <Gem className="h-[12px] w-[12px]" strokeWidth={1.8} />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-white/[0.04] bg-[#0B0E11] px-4 py-2.5">
          <p className="flex items-center gap-1.5 text-[11.5px] text-[#8B93A0]">
            <Settings2 className="h-[13px] w-[13px]" strokeWidth={1.7} />
            <span>138 Properties Found</span>
          </p>
          <button
            type="button"
            className="press inline-flex items-center gap-1.5 rounded-full border border-white/14 px-2.5 py-[5px] text-[11px] font-medium text-[#C9CDD4]"
          >
            <ArrowUpDown className="h-[12px] w-[12px]" strokeWidth={1.8} />
            Recommended
            <ChevronDown className="h-[12px] w-[12px] text-[#9AA1AB]" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Live-tracked spacer so cards stay below chrome; lock prevents mid-scroll shake */}
      <div style={{ height: chromeHeight }} aria-hidden className="shrink-0" />

      <div className="mt-3.5 px-4">
        {list.length === 0 ? (
          <p className="py-12 text-center text-[13px] text-[#8B93A0]">
            No stays match these filters — try another category or budget.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-5">
              {list.map((p) => (
                <PropertyGridCard key={p.id} property={p} />
              ))}
            </div>

            <div className="mt-5 rounded-[16px] border border-white/[0.08] bg-[#14181F] px-3.5 py-3.5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#E0B84A]/45 bg-[#E0B84A]/10">
                  <MapPin className="h-[16px] w-[16px] text-[#E0B84A]" strokeWidth={1.7} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-snug text-white">
                    Can&apos;t find what you&apos;re looking for?
                  </p>
                  <p className="mt-1 text-[11.5px] leading-snug text-[#8B93A0]">
                    Explore more stays near Pawna Lake and Lonavala.
                  </p>
                  <Link
                    to="/locations"
                    className="press mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#E0B84A] px-3.5 py-2 text-[12px] font-semibold text-[#E0B84A]"
                  >
                    Explore All Locations
                    <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
