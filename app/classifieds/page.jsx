import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "property", label: "Property" },
  { value: "jobs", label: "Jobs" },
  { value: "services", label: "Services" },
  { value: "for-sale", label: "For Sale" },
];

async function getClassifieds(category) {
  try {
    const url = new URL(`${API_BASE}/classifieds`);
    if (category) url.searchParams.set("category", category);
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return { items: [] };
    return res.json();
  } catch (error) {
    console.error("Error fetching classifieds:", error);
    return { items: [] };
  }
}

export async function generateMetadata() {
  const title = `Classifieds — Property, Jobs & More | ${SITE_NAME}`;
  const description = `Browse London property, jobs, services and for-sale listings from the ${SITE_NAME} classifieds marketplace.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/classifieds` },
    openGraph: { title, description, url: `${SITE_URL}/classifieds`, siteName: SITE_NAME, type: "website" },
  };
}

export default async function ClassifiedsPage({ searchParams }) {
  const { category = "" } = await searchParams;
  const data = await getClassifieds(category);
  const items = data.items || [];

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={SITE_NAME} />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.02em] text-[#1B2435] mb-2">
              Classifieds
            </h1>
            <p className="text-[15px] text-black/60">Property, jobs, services and for-sale listings from London.</p>
          </div>
          <Link
            href="/classifieds/submit"
            className="shrink-0 px-6 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#F5C645] hover:text-black transition-all duration-300"
          >
            Post a listing
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 border-b border-black/10 pb-6">
          {CATEGORIES.map((c) => {
            const isActive = c.value === category;
            const href = c.value ? `/classifieds?category=${c.value}` : "/classifieds";
            return (
              <Link
                key={c.value || "all"}
                href={href}
                className={`text-[12px] uppercase tracking-wide px-4 py-2 rounded-full border transition-colors ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "border-black/15 text-black/70 hover:border-[#F5C645] hover:text-[#1B2435]"
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>

        {items.length === 0 ? (
          <p className="text-black/50 text-sm">No listings in this category yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {items.map((item) => (
              <Link
                key={item._id}
                href={`/classifieds/${item.slug}`}
                className="group flex flex-col gap-0 no-underline"
              >
                <div className="overflow-hidden h-[180px] bg-black/5 relative rounded-lg">
                  {item.images?.[0] && (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  )}
                  {item.isFeatured && (
                    <span className="absolute top-2 left-2 bg-[#F5C645] text-black text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <span className="mt-4 text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
                  {item.category.replace("-", " ")}
                </span>
                <h3 className="mt-2 text-[18px] font-semibold leading-[1.2] text-black tracking-[-0.02em] group-hover:text-[#4a5a6a] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                {item.price && <p className="mt-1 text-[14px] font-semibold text-[#1B2435]">{item.price}</p>}
                <p className="mt-2 text-[13px] text-black/60 leading-relaxed line-clamp-2">{item.description}</p>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

