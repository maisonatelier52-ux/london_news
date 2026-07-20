// app/preview/homepage/[token]/page.jsx
//
// Renders the draft/scheduled homepage using the exact same component
// (HomeClient) as the live site, instead of a separate simplified layout —
// so what an editor sees here is what will actually go live once published.
// HomeClient accepts the pre-fetched draft via `previewData` and skips its
// own live-data fetch in that mode (see components/HomeClient.jsx).

import { notFound } from "next/navigation";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getPreviewHomepage(token) {
  try {
    const res = await fetch(`${API_BASE}/admin-homepage/preview/${token}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching preview homepage:", error);
    return null;
  }
}

export async function generateMetadata() {
  return { title: `Homepage Preview | ${SITE_NAME}`, robots: { index: false, follow: false } };
}

export default async function HomepagePreviewPage({ params }) {
  const { token } = await params;
  const homepage = await getPreviewHomepage(token);
  if (!homepage) notFound();

  return <HomeClient previewData={homepage} isPreview />;
}
