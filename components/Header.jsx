

// ─── Article Data ────────────────────────────────────────────────────────────
const featuredArticle = {
  title: "Pound falls sharply against dollar after Bank confirms bond-buying end date",
  excerpt:
    "The pound has fallen sharply against the dollar after Andrew Bailey warned the Bank of England would not extend its emergency intervention in financial markets beyond this week, after the turmoil sparked by the government's mini-budget.",
  image: "https://static.wixstatic.com/media/11062b_7fb998478c5340329ce12947e2674a31~mv2.jpg/v1/fill/w_980,h_883,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_7fb998478c5340329ce12947e2674a31~mv2.jpg",
  imageAlt: "Green Indoors",
  href: "https://www.mylondon.news/news/",
  category: "Business",
};

const articles = [
  {
    id: 1,
    title: "How MI5 caught UK embassy spy selling secrets to Russia",
    excerpt:
      "A spy at Berlin's British embassy, who sold secrets to Russia and was caught in an undercover MI5 sting, has been jailed for 13 years and two months.",
    image: "https://static.wixstatic.com/media/nsplsh_627052334c4f64684d6b30~mv2_d_8902_3591_s_4_2.jpg/v1/fill/w_980,h_1075,al_c,q_80,enc_avif,quality_auto/nsplsh_627052334c4f64684d6b30~mv2_d_8902_3591_s_4_2.jpg",
    imageAlt: "Image by Arkadiusz Radek",
    href: "#",
    category: "Culture",
  },
  {
    id: 2,
    title: "Wheat prices recover on US crop fears and Black Sea tensions",
    excerpt:
      "Poor crop conditions for US winter wheat, as well as building tensions surrounding the Black Sea grain deal for Ukraine have triggered a £20/t recovery in feed wheat prices in recent weeks.",
    image: "https://static.wixstatic.com/media/nsplsh_6561280396d54e718c5093c072d1c350~mv2.jpg/v1/fill/w_980,h_920,al_c,q_80,enc_avif,quality_auto/nsplsh_6561280396d54e718c5093c072d1c350~mv2.jpg",
    imageAlt: "Image by Mike Erskine",
    href: "#",
    category: "Business",
  },
  {
    id: 3,
    title: "City leaders call for urgent action on housing affordability",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    image: "https://static.wixstatic.com/media/nsplsh_08a3a4241908447a81c8cf41a995acb1~mv2.jpg/v1/fill/w_980,h_833,al_c,q_80,enc_avif,quality_auto/nsplsh_08a3a4241908447a81c8cf41a995acb1~mv2.jpg",
    imageAlt: "Image by Yaniv Cohen",
    href: "#",
    category: "Life",
  },
  {
    id: 4,
    title: "No one is remotely indispensable: Boris Johnson's resignation speech analysed",
    excerpt:
      '"As we\'ve seen at Westminster, the herd instinct is powerful. When the herd moves, it moves. And my friends, in politics, no one is remotely indispensable." began Boris Johnson, at the ominous Downing Street lectern.',
    image: "https://static.wixstatic.com/media/11062b_864c1ffc97034fc1a3c24f6f2a8d0a21~mv2.jpg/v1/fill/w_980,h_1019,al_c,q_80,enc_avif,quality_auto/11062b_864c1ffc97034fc1a3c24f6f2a8d0a21~mv2.jpg",
    imageAlt: "Spaceship",
    href: "#",
    category: "Culture",
  },
  {
    id: 5,
    title: "Winter weather disrupts commute across South East England",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: "https://static.wixstatic.com/media/11062b_032512d1d3674f5eae5a6f2bb293492a~mv2.jpeg/v1/fill/w_980,h_807,al_c,q_80,enc_avif,quality_auto/11062b_032512d1d3674f5eae5a6f2bb293492a~mv2.jpeg",
    imageAlt: "Winter Weather",
    href: "#",
    category: "Environment",
  },
  {
    id: 6,
    title: "New arts funding announced for East London creative districts",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    image: "https://static.wixstatic.com/media/nsplsh_4e49766f684c465a376e63~mv2_d_7360_4912_s_4_2.jpg/v1/fill/w_980,h_2115,al_c,q_80,enc_avif,quality_auto/nsplsh_4e49766f684c465a376e63~mv2_d_7360_4912_s_4_2.jpg",
    imageAlt: "Image by Erik Odiin",
    href: "#",
    category: "Art",
  },
];

const moodStats = [
  { pct: "82%", label: "HAPPY" },
  { pct: "6%", label: "SAD" },
  { pct: "12%", label: "CAN'T COMPLAIN" },
];

// ─── Social Share Icons ───────────────────────────────────────────────────────
function ArticleSocialIcons() {
  return (
    <div className="flex items-center gap-2 mt-2">
      {["Instagram", "Twitter", "LinkedIn", "Tumblr", "Facebook", "Pinterest"].map((sn) => (
        <a
          key={sn}
          href="#"
          aria-label={sn}
          className="w-[22px] h-[22px] opacity-60 hover:opacity-100 transition-opacity"
          target="_blank"
          rel="noreferrer noopener"
        >
          <SmallSocialDot name={sn} />
        </a>
      ))}
    </div>
  );
}

function SmallSocialDot({ name }) {
  return (
    <span className="block w-[22px] h-[22px] rounded-full bg-gray-300 flex items-center justify-center text-[8px] text-white font-bold select-none">
      {name[0]}
    </span>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article }) {
  return (
    <article className="border-b border-gray-200 pb-8 last:border-0">
      <div className="relative w-full aspect-[16/9] overflow-hidden mb-4 bg-gray-100">
        <img
          src={article.image}
          alt={article.imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-black text-white text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">
          {article.category}
        </span>
      </div>

      {/* Author icon + social share */}
      <div className="flex items-start justify-between mb-2">
        <img
          src="https://static.wixstatic.com/media/fac1d5_84677957fbf94d3b9c52a6ea89ba025a~mv2.png/v1/fill/w_27,h_27,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/52053.png"
          alt="Author"
          width={27}
          height={27}
          className="rounded-full object-cover mt-1"
        />
        <ArticleSocialIcons />
      </div>

      <h2
        className="font-black text-black leading-tight mb-3 hover:underline cursor-pointer"
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "clamp(26px, 3vw, 42px)",
          letterSpacing: "-0.04em",
          lineHeight: "1em",
        }}
      >
        <a href={article.href} target="_blank" rel="noreferrer noopener">
          {article.title}
        </a>
      </h2>

      <p
        className="text-[14px] text-gray-800 leading-relaxed"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        {article.excerpt}
      </p>
    </article>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* <Header /> */}

      <main>
        {/* ── Hero Section ─────────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden min-h-[720px] md:min-h-[860px]">
  {/* Background image */}
  <div className="absolute inset-0">
    <img
      src="https://static.wixstatic.com/media/nsplsh_4e49766f684c465a376e63~mv2_d_7360_4912_s_4_2.jpg/v1/fill/w_1920,h_700,al_c,q_80,enc_avif,quality_auto/nsplsh_4e49766f684c465a376e63~mv2_d_7360_4912_s_4_2.jpg"
      alt="London cityscape"
      className="w-full h-full object-cover object-center scale-105"
    />
    {/* Softer gradient overlay like design */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10" />
  </div>

  {/* Hero content */}
  <div className="relative max-w-[1100px] mx-auto px-4 pt-24 pb-16 flex flex-col md:flex-row items-start justify-between gap-10">

    {/* LEFT SIDE */}
    <div className="flex-1">
      {/* Tagline */}
      <p
        className="text-[12px] uppercase tracking-widest mb-6"
        style={{
          fontFamily: "Barlow, sans-serif",
          color: "#d4c5a0",
        }}
      >
        Keep calm. Here&apos;s the good news.
      </p>

      {/* BIG TITLE */}
      <h1
        className="text-white font-black leading-none"
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "clamp(100px, 14vw, 180px)",
          letterSpacing: "-0.09em",
          lineHeight: "0.85",
          textShadow: "0 8px 20px rgba(0,0,0,0.35)",
        }}
      >
        London
        <br />
        News
      </h1>

      {/* CTA */}
      <a
        href="#"
        className="inline-block mt-8 bg-white text-black text-[12px] uppercase tracking-widest px-6 py-3 font-semibold hover:bg-gray-100 transition"
      >
        Get Started
      </a>
    </div>

    {/* RIGHT SIDE (Weather + Mood) */}
    <div className="w-full md:w-[340px] bg-white/95 backdrop-blur-sm p-6 shadow-xl">

      {/* Weather */}
      <div className="mb-5">
        <img
          src="https://static.wixstatic.com/media/fac1d5_817b28702353495fabbcc7a7f24c55b7~mv2.png/v1/fill/w_358,h_310,al_c,q_85,enc_avif,quality_auto/Weather.png"
          alt="Weather forecast"
          className="w-full h-auto object-contain"
          style={{ maxHeight: "150px" }}
        />
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2">
          Forecast
        </p>
      </div>

      <div className="border-t border-gray-300 my-4" />

      {/* Mood */}
      <div>
        <p className="text-[14px] font-bold uppercase tracking-wide mb-1">
          London&apos;s mood right now
        </p>
        <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-4">
          Updated 32 minutes ago
        </p>

        <div className="border-t border-gray-300 mb-4" />

        <h3
          className="font-black mb-5"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: "clamp(40px, 5vw, 68px)",
            letterSpacing: "-0.05em",
            lineHeight: "1",
          }}
        >
          London is{" "}
          <em className="italic not-italic">okay</em> right now
        </h3>

        <div className="border-t border-gray-300 mb-4" />

        {/* Stats */}
        <div className="space-y-2">
          {moodStats.map(({ pct, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="text-[18px] font-light">{pct}</span>
              <span className="text-[11px] text-gray-600 uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p
          className="mt-5 text-[11px] uppercase tracking-widest"
          style={{
            fontFamily: "Barlow, sans-serif",
            color: "#b8860b",
          }}
        >
          Take part in our daily survey
        </p>
      </div>
    </div>
  </div>
</section>

        {/* ── Featured Article ─────────────────────────────────────────── */}
        <section className="max-w-[980px] mx-auto px-4 py-10">
          <article className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-b border-gray-200 pb-10">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.imageAlt}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-black text-white text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">
                {featuredArticle.category}
              </span>
            </div>
            <div>
              <div className="flex items-start justify-between mb-3">
                <img
                  src="https://static.wixstatic.com/media/fac1d5_84677957fbf94d3b9c52a6ea89ba025a~mv2.png/v1/fill/w_27,h_27,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/52053.png"
                  alt="Author"
                  width={27}
                  height={27}
                  className="rounded-full"
                />
                <ArticleSocialIcons />
              </div>
              <h2
                className="font-black text-black leading-tight mb-4"
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: "clamp(32px, 4vw, 56px)",
                  letterSpacing: "-0.05em",
                  lineHeight: "1em",
                }}
              >
                <a href={featuredArticle.href} target="_blank" rel="noreferrer noopener" className="hover:underline">
                  {featuredArticle.title}
                </a>
              </h2>
              <p className="text-[14px] text-gray-800 leading-relaxed mb-3">
                {featuredArticle.excerpt}
              </p>
            </div>
          </article>
        </section>

        {/* ── Article Grid ─────────────────────────────────────────────── */}
        <section className="max-w-[980px] mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* ── Subscribe Section ────────────────────────────────────────── */}
        <section className="bg-black text-white py-12 text-center">
          <div className="max-w-[980px] mx-auto px-4">
            <h2
              className="font-black uppercase mb-3"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.05em",
              }}
            >
              Stay in the know
            </h2>
            <p className="text-[14px] text-gray-400 mb-6 font-light">
              The best of London News, delivered to your inbox every morning.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-black text-[12px] uppercase tracking-widest px-8 py-3 font-semibold hover:bg-gray-200 transition-colors"
            >
              Subscribe Free
            </a>
          </div>
        </section>

        {/* ── Classifieds / Recent Items ───────────────────────────────── */}
        <section className="max-w-[980px] mx-auto px-4 py-10">
          <h3
            className="text-[11px] uppercase tracking-widest text-gray-400 mb-6 font-semibold border-b border-gray-200 pb-3"
          >
            Classifieds
          </h3>
          <p
            className="text-[12px] uppercase tracking-widest text-gray-600 hover:text-black cursor-pointer transition-colors font-light"
            style={{ fontFamily: "Avenir, sans-serif" }}
          >
            See all recent items listed for sale
          </p>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
}