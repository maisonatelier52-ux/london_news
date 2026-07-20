import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/classifieds/EnquiryForm";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getClassified(slug) {
  try {
    const res = await fetch(`${API_BASE}/classifieds/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching classified:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getClassified(slug);
  if (!item) return { title: `Not Found | ${SITE_NAME}`, robots: { index: false } };

  const title = `${item.title} | Classifieds | ${SITE_NAME}`;
  const description = item.description?.slice(0, 160) || `${item.title} — classifieds listing on ${SITE_NAME}.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/classifieds/${item.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/classifieds/${item.slug}`, siteName: SITE_NAME, type: "website" },
  };
}

export default async function ClassifiedDetailPage({ params }) {
  const { slug } = await params;
  const item = await getClassified(slug);
  if (!item) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={SITE_NAME} />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-20 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4a5a6a]">
            {item.category.replace("-", " ")}
          </span>
          <h1 className="mt-2 text-[28px] sm:text-[36px] font-semibold tracking-[-0.02em] text-[#1B2435] mb-4">
            {item.title}
          </h1>
          {item.price && <p className="text-[20px] font-semibold text-[#1B2435] mb-6">{item.price}</p>}

          {item.images?.length > 0 && (
            <div className="overflow-hidden h-[280px] sm:h-[360px] bg-black/5 relative rounded-lg mb-6">
              <Image src={item.images[0]} alt={item.title} fill sizes="100vw" className="object-cover" />
            </div>
          )}

          <p className="text-[15px] text-black/70 leading-relaxed whitespace-pre-line">{item.description}</p>
        </div>

        <div className="md:col-span-1">
          <EnquiryForm classifiedId={item._id} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
