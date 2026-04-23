// app/not-found.jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen w-full font-['Barlow',sans-serif] flex flex-col bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')" }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50 z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-500/20 to-transparent z-[1]" />

      {/* Header */}
      <header className="relative z-10 flex items-center px-4 sm:px-8 lg:px-12 py-4 lg:py-5">
        <div className="flex lg:hidden items-center justify-between w-full">
          <Link href="/" className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline">
            London News
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {["Beta Release", "Life", "Culture", "Environment", "Art", "Science", "Business"].map((n) => (
            <a key={n} href={`/${n.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55">
              {n}
            </a>
          ))}
        </nav>
        <Link href="/" className="hidden lg:block text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline whitespace-nowrap shrink-0">
          Back to Home
        </Link>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 pb-20">
        <p className="text-[10.5px] font-medium tracking-[0.10em] uppercase text-gray-800 mb-5">
          Page not found
        </p>

        {/* Big 404 in yellow like the London News title */}
        <h1
          className="font-['Poppins',sans-serif] font-semibold text-[clamp(100px,20vw,220px)] leading-[0.85] tracking-[-0.10em] text-[#F5C645] select-none mb-6"
          style={{
            textShadow: `
              0 3px 0 rgba(0,0,0,0.08),
              0 8px 12px rgba(0,0,0,0.14),
              0 18px 28px rgba(0,0,0,0.12)
            `,
          }}
        >
          404
        </h1>

        <div className="w-[80px] h-px bg-black/40 mb-6" />

        <p className="text-[15px] sm:text-[17px] text-[#2a3a4a] font-light max-w-[480px] leading-relaxed mb-10">
          The page you're looking for doesn't exist, has been moved, or is no longer available.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-[#F5C645] text-black text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-black hover:text-[#F5C645] transition-all duration-300 no-underline"
          >
            Go to Homepage
          </Link>
          <Link
            href="/business"
            className="px-8 py-3 border border-[#2a3a4a]/40 text-[#2a3a4a] text-[11px] font-bold uppercase tracking-[0.16em] hover:border-black hover:text-black transition-all duration-300 no-underline"
          >
            Browse News
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 pb-6 pt-4">
        <div className="flex items-center gap-4">
          <p className="text-[11px] font-bold uppercase text-black/50 whitespace-nowrap">
            London News · Est. 2024
          </p>
          <div className="flex-1 h-px bg-black/15" />
        </div>
      </div>
    </div>
  );
}