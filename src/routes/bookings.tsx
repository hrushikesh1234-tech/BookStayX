import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Ban,
  CalendarCheck2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  History,
  Wallet,
} from "lucide-react";
import { AppTopNav } from "@/components/AppTopNav";
import { BookingCard } from "@/components/BookingCard";
import { bookingSummary, bookings } from "@/data/bookings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "My Bookings — BookStayX" },
      {
        name: "description",
        content: "Manage all your live stays, booking history and payments with BookStayX.",
      },
      { property: "og:title", content: "My Bookings — BookStayX" },
      {
        property: "og:description",
        content: "Manage all your stays and experiences.",
      },
    ],
  }),
  component: BookingsPage,
});

type BookingsTab = "live" | "history";

function BookingsPage() {
  const [tab, setTab] = useState<BookingsTab>("live");
  const [headerOffset, setHeaderOffset] = useState(64);

  const list = useMemo(() => bookings.filter((b) => b.tab === tab), [tab]);

  return (
    <div className="min-h-screen bg-[#0B0E11] pb-4">
      <AppTopNav onHeightChange={setHeaderOffset} />

      <div className="px-4 pt-4">
        <h1 className="text-[26px] font-bold leading-none tracking-[-0.02em] text-white">
          My Bookings
        </h1>
        <p className="mt-2 text-[12.5px] leading-snug text-[#8B93A0]">
          Manage all your stays and experiences
        </p>
      </div>

      {/* Scrolls with page, then sticks exactly under the fixed header */}
      <div
        style={{ top: headerOffset }}
        className="sticky z-30 bg-[#0B0E11] px-4 pb-3 pt-4"
      >
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setTab("live")}
            className={cn(
              "press flex items-center justify-center gap-2 rounded-[12px] border px-3 py-3 text-[12.5px] font-semibold",
              tab === "live"
                ? "border-[#E0B84A] bg-[#E0B84A]/[0.06] text-[#E0B84A]"
                : "border-transparent bg-transparent text-[#8B93A0]",
            )}
          >
            <CalendarClock className="h-[16px] w-[16px]" strokeWidth={1.7} />
            Live Bookings
          </button>
          <button
            type="button"
            onClick={() => setTab("history")}
            className={cn(
              "press flex items-center justify-center gap-2 rounded-[12px] border px-3 py-3 text-[12.5px] font-semibold",
              tab === "history"
                ? "border-[#E0B84A] bg-[#E0B84A]/[0.06] text-[#E0B84A]"
                : "border-transparent bg-transparent text-[#8B93A0]",
            )}
          >
            <History className="h-[16px] w-[16px]" strokeWidth={1.7} />
            Booking History
          </button>
        </div>
      </div>

      <div className="px-4">
        {/* Booking cards */}
        <div className="mt-1 space-y-3.5">
          {list.map((b) => (
            <BookingCard key={b.id} booking={b} />
          ))}
          {list.length === 0 ? (
            <p className="py-12 text-center text-[13px] text-[#8B93A0]">
              No bookings in this tab yet.
            </p>
          ) : null}
        </div>

        {/* Summary */}
        <section className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-[14px] font-semibold text-white">
              <CalendarCheck2 className="h-[16px] w-[16px] text-[#E0B84A]" strokeWidth={1.7} />
              Upcoming Bookings Summary
            </h2>
            <button
              type="button"
              className="press inline-flex items-center gap-0.5 text-[12px] font-semibold text-[#E0B84A]"
            >
              View All
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            <SummaryTile
              tone="green"
              Icon={CalendarCheck2}
              value={String(bookingSummary.upcoming)}
              label="Upcoming Stays"
            />
            <SummaryTile
              tone="blue"
              Icon={CheckCircle2}
              value={String(bookingSummary.completed)}
              label="Completed Stays"
            />
            <SummaryTile
              tone="purple"
              Icon={Ban}
              value={String(bookingSummary.cancelled)}
              label="Cancelled Stays"
            />
            <SummaryTile
              tone="gold"
              Icon={Wallet}
              value={`₹${bookingSummary.totalSpent.toLocaleString("en-IN")}`}
              label="Total Spent"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function SummaryTile({
  tone,
  Icon,
  value,
  label,
}: {
  tone: "green" | "blue" | "purple" | "gold";
  Icon: typeof CalendarCheck2;
  value: string;
  label: string;
}) {
  const tones = {
    green: {
      wrap: "border-[#24A148]/25 bg-[#143524]/55",
      icon: "text-[#3DDC84]",
      value: "text-[#3DDC84]",
    },
    blue: {
      wrap: "border-[#3B82F6]/25 bg-[#15233A]/70",
      icon: "text-[#60A5FA]",
      value: "text-[#60A5FA]",
    },
    purple: {
      wrap: "border-[#A855F7]/25 bg-[#2A1A3A]/70",
      icon: "text-[#C084FC]",
      value: "text-[#C084FC]",
    },
    gold: {
      wrap: "border-[#E0B84A]/30 bg-[#2A2314]/70",
      icon: "text-[#E0B84A]",
      value: "text-[#E0B84A]",
    },
  }[tone];

  return (
    <div className={cn("rounded-[12px] border px-1.5 py-2.5 text-center", tones.wrap)}>
      <Icon className={cn("mx-auto h-[15px] w-[15px]", tones.icon)} strokeWidth={1.7} />
      <p className={cn("mt-1.5 text-[12px] font-bold leading-none", tones.value)}>{value}</p>
      <p className="mt-1 text-[8.5px] leading-tight text-[#8B93A0]">{label}</p>
    </div>
  );
}
