import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Legacy desks already have a dedicated top-level route (e.g. /business).
// Where one exists we link there instead of /category/[slug], so the older
// canonical URL keeps getting the traffic/SEO value.
const LEGACY_DESK_ROUTES = {
  politics: "/politics",
  business: "/business",
  entertainment: "/entertainment",
  culture: "/entertainment",
  "local-news": "/local-news",
  crime: "/crime",
  transport: "/transport",
  weather: "/weather",
  sports: "/sports",
};

async function getDeskTree() {
  try {
    const res = await fetch(`${API_BASE}/categories/tree`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching category tree:", error);
    return [];
  }
}

export async function generateMetadata() {
  const title = `Sections — Every Desk & Topic | ${SITE_NAME}`;
  const description = `Browse every ${SITE_NAME} desk and topic in one place — politics, business, culture and more, each broken down into the stories that matter.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/sections` },
    openGraph: { title, description, url: `${SITE_URL}/sections`, siteName: SITE_NAME, type: "website" },
  };
}

export default async function SectionsPage() {
  const desks = await getDeskTree();

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={SITE_NAME} />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <h1 className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.02em] text-[#1B2435] mb-3">
          All sections
        </h1>
        <p className="text-[15px] text-black/60 max-w-2xl mb-12">
          Every desk we cover, and the topics inside each one. Jump straight to what you're after.
        </p>

        {desks.length === 0 && (
          <p className="text-black/50 text-sm">Sections are being updated — check back shortly.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {desks.map((desk) => {
            const deskHref = LEGACY_DESK_ROUTES[desk.slug] || `/category/${desk.slug}`;
            return (
              <div key={desk.id || desk._id}>
                <Link
                  href={deskHref}
                  className="group inline-block text-[20px] font-semibold text-[#1B2435] tracking-[-0.01em] mb-1"
                >
                  {desk.name}
                  <span className="block h-px w-0 bg-[#F5C645] transition-all duration-300 group-hover:w-full" />
                </Link>
                {desk.description && (
                  <p className="text-[13px] text-black/50 mt-1 mb-3 line-clamp-2">{desk.description}</p>
                )}

                {Array.isArray(desk.topics) && desk.topics.length > 0 && (
                  <ul className="flex flex-col gap-2 mt-2">
                    {desk.topics.map((topic) => (
                      <li key={topic.id || topic._id}>
                        <Link
                          href={`/topics/${topic.slug}`}
                          className="text-[13px] text-black/70 hover:text-[#1B2435] uppercase tracking-wide"
                        >
                          {topic.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
