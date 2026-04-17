
"use client";

import { useEffect, useState } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiDayCloudy,
  WiDayRain,
  WiThunderstorm,
  WiSnow,
} from "react-icons/wi";
import SocialIcons from "@/components/SocialIcons";

const weatherData = {
  forecast: { temp: 13, realFeel: 13, condition: "Mostly cloudy", icon: "cloudy" },
  today:    { temp: 13, realFeel: 13, condition: "Mostly cloudy", icon: "cloudy" },
  tomorrow: { temp: 16, realFeel: 15, condition: "Partly sunny",  icon: "partly" },
  weekend:  { temp: 14, realFeel: 13, condition: "Light rain",    icon: "rain"   },
};

function WeatherIcon({ type, size = 150 }) {
  const style = { fontSize: size, color: "#5a6a7a", lineHeight: 1, display: "block" };
  switch (type) {
    case "sunny":  return <WiDaySunny style={style} />;
    case "partly": return <WiDayCloudy style={style} />;
    case "rain":   return <WiDayRain style={style} />;
    case "storm":  return <WiThunderstorm style={style} />;
    case "snow":   return <WiSnow style={style} />;
    default:       return <WiCloudy style={style} />;
  }
}

const tabs = [
  { key: "forecast", label: "Forecast" },
  { key: "today",    label: "Today" },
  { key: "tomorrow", label: "Tomorrow" },
  { key: "weekend",  label: "This Weekend" },
];

export default function Home() {
  const [time, setTime] = useState("");
  const [activeTab, setActiveTab] = useState("forecast");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(`${h}:${m} ${ampm}`);
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  const w = weatherData[activeTab];
  const headlineList = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg",
    title: "Top Headline of the day - 02",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    image: "https://t3.ftcdn.net/jpg/02/95/81/28/360_F_295812807_G3J8VXdgrMcACp74ISP6ev97F8IGQ2LX.jpg",
    title: "Global markets react to economic shifts",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    image: "https://t3.ftcdn.net/jpg/02/11/33/80/360_F_211338011_hPyFvrAOOBOyoYN4DqnpxwkqhBRXdyKB.jpg",
    title: "Technology trends shaping the future",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

  return (
    <div
      className="min-h-screen w-full font-['Barlow',sans-serif] relative overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image.webp')" }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 z-[1]" />
      {/* Blue tint from top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent z-[1]" />

      {/* ── HEADER ── */}
      <header className="relative z-10 flex items-center px-4 sm:px-8 lg:px-12 py-4 lg:py-5">
        {/* Mobile: logo left, subscribe right */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <span className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a]">
            London News
          </span>
          <a
            href="#"
            className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2a3a4a] no-underline"
          >
            Subscribe
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {["Beta Release","Life","Culture","Environment","Art","Science","Business","More"].map((n) => (
            <a
              key={n}
              href="#"
              className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#4a5a6a] no-underline transition-opacity hover:opacity-55"
            >
              {n}
            </a>
          ))}
        </nav>
        <a
          href="#"
          className="hidden lg:block text-[11px] font-bold tracking-[0.16em] uppercase text-[#2a3a4a] no-underline whitespace-nowrap shrink-0"
        >
          Customise / Subscribe
        </a>
      </header>

      {/* ── HERO ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-6 lg:pt-10 pb-0">

        {/* DESKTOP layout: side-by-side */}
        <div className="hidden lg:flex items-start justify-between w-full mt-30">
          {/* LEFT — title */}
          <div className="max-w-[58%]">
            <p className="text-[10.5px] font-medium tracking-[0.10em] uppercase text-gray-800 mb-5">
              Keep Calm. Here&rsquo;s the Good News.
            </p>
            <h1
              className="font-['Poppins',var(--font-poppins)] font-semibold text-[clamp(88px,12.5vw,175px)] leading-[0.85] tracking-[-0.10em] text-[#F5C645] select-none"
              style={{
                textShadow: `
                  0 3px 0 rgba(0,0,0,0.08),
                  0 8px 12px rgba(0,0,0,0.14),
                  0 18px 28px rgba(0,0,0,0.12)
                `,
              }}
            >
              London<br />News
            </h1>
          </div>

          {/* RIGHT — Weather */}
          <div className="flex flex-col items-start min-w-[280px] pt-1.5 pr-20">
            <p className="text-[20px] font-medium uppercase text-gray-500 mb-1.5">
              Current Weather
            </p>
            <p className="text-base font-light text-gray-500 mb-5">{time}</p>
            <div className="flex items-center gap-2 mb-1 pl-10">
              <WeatherIcon type={w.icon} />
              <div className="flex flex-col">
                <div className="flex items-start text-[94px] font-light text-[#4a5a6a] leading-none tracking-[-0.04em]">
                  {w.temp}
                  <span className="flex items-start text-[28px] leading-none ml-1">
                    <span className="text-[90px]">°</span>
                    <span className="font-['Poppins',var(--font-poppins)] text-[30px] mt-[50px] ml-[-25] text-gray-500">C</span>
                  </span>
                </div>
                <div className="text-[18px] text-[#4a5a6a]/80 leading-none mt-1 tracking-[-0.01em]">
                  RealFeel® {w.realFeel}°
                </div>
              </div>
            </div>
            <p className="text-[22px] font-light text-[#4a5a6a] mb-6">{w.condition}</p>
            <div className="flex items-center gap-6 mt-7">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  className={`font-['Barlow',sans-serif] text-[11px] font-normal tracking-[0.10em] uppercase bg-none border-none cursor-pointer transition-colors ${
                    activeTab === key
                      ? "text-[#2a3a4a] font-bold"
                      : "text-gray-500 hover:text-[#4a5a6a]"
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET layout: stacked */}
        <div className="flex lg:hidden flex-col w-full gap-6 mt-4">
          {/* Title */}
          <div>
            <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.10em] uppercase text-gray-800 mb-3">
              Keep Calm. Here&rsquo;s the Good News.
            </p>
            <h1
              className="font-['Poppins',var(--font-poppins)] font-semibold leading-[0.85] tracking-[-0.07em] text-[#F5C645] select-none text-[clamp(64px,18vw,110px)]"
              style={{
                textShadow: `
                  0 3px 0 rgba(0,0,0,0.08),
                  0 8px 12px rgba(0,0,0,0.14),
                  0 18px 28px rgba(0,0,0,0.12)
                `,
              }}
            >
              London<br />News
            </h1>
          </div>

          {/* Weather card */}
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] sm:text-[15px] font-medium uppercase text-gray-500">
                Current Weather
              </p>
              <p className="text-[13px] font-light text-gray-500">{time}</p>
            </div>

            {/* Icon + temp row */}
            <div className="flex items-center gap-3">
              <WeatherIcon type={w.icon} size={80} />
              <div className="flex flex-col">
                <div className="flex items-start text-[64px] sm:text-[72px] font-light text-[#4a5a6a] leading-none tracking-[-0.04em]">
                  {w.temp}
                  <span className="flex items-start text-[20px] leading-none ml-1">
                    <span className="text-[58px]">°</span>
                    <span className="font-['Poppins',var(--font-poppins)] text-[22px] mt-[34px] text-gray-500">C</span>
                  </span>
                </div>
                <div className="text-[13px] text-[#4a5a6a]/80 leading-none mt-1">
                  RealFeel® {w.realFeel}°
                </div>
              </div>
            </div>

            <p className="text-[16px] font-light text-[#4a5a6a] mt-1 mb-3">{w.condition}</p>

            {/* Tabs — scrollable on very small screens */}
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1 -mb-1 no-scrollbar">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  className={`font-['Barlow',sans-serif] text-[10px] sm:text-[11px] tracking-[0.10em] uppercase bg-none border-none cursor-pointer transition-colors whitespace-nowrap ${
                    activeTab === key
                      ? "text-[#2a3a4a] font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex items-center px-4 sm:px-8 lg:px-12 pb-6 pt-8 lg:pb-7 lg:pt-9 -mx-4 sm:-mx-8 lg:-mx-12">
          <div>
            <p className="text-[13px] sm:text-[15px] font-bold uppercase text-black whitespace-nowrap">
              London&rsquo;s Mood Right Now
            </p>
            <p className="text-[11px] sm:text-[12px] font-normal uppercase text-gray-700 mt-1">
              Updated 32 minutes ago
            </p>
          </div>
          <div className="hidden sm:block w-[80px] md:w-[360px] lg:w-[560px] h-px bg-[rgba(90,106,122,0.32)] mx-6 lg:mx-8" />
          <div className="hidden sm:block min-w-[60px]" />
        </div>
      </div>

      {/* ── NEWS SECTION ── */}
      <section className="relative w-full min-h-[700px] lg:h-[1050px] overflow-hidden flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/homepageimages/sky_bg_image2.webp')" }}
        />

        <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-[1100px] mx-auto w-full py-10 lg:py-0">

          {/* Top mood section */}
          <div className="text-left max-w-[700px] lg:ml-[-80px]">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-semibold leading-tight text-black tracking-[-0.02em]">
              London is <span className="italic">okay</span> right now
            </h2>
            <div className="w-[120px] lg:w-[160px] h-[1px] bg-black/60 mt-1 mb-4 lg:mb-6 sm:ml-[200px] lg:ml-[270px]" />
            <div className="flex gap-6 text-[12px] uppercase tracking-wide text-black/80">
              <p><span className="text-[18px]">82% </span>Happy</p>
              <p><span className="text-[18px]">6% </span>Sad</p>
            </div>
            <div className="flex gap-6 text-[12px] uppercase tracking-wide text-black/80">
              <p><span className="text-[18px]">12% </span>Can&rsquo;t complain</p>
            </div>
            <div className="flex gap-6 text-[12px] uppercase tracking-wide text-black/80 mt-5">
              <span>TAKE PART IN OUR DAILY SURVEY</span>
            </div>
          </div>

          {/* Main article */}
          <div className="text-start mt-10 lg:mt-70">
            {/* <SocialIcons className="lg:ml-30 max-w-[750px]"/> */}
            <h1 className="text-[32px] sm:text-[42px] lg:text-[55px] font-bold leading-[1.05] lg:leading-[1] text-black tracking-[-0.02em] lg:ml-30 max-w-[750px]">
              Pound falls sharply against dollar after Bank confirms bond-buying end date
            </h1>
            <p className="mt-4 lg:mt-6 text-[14px] sm:text-[15px] text-black/80 leading-relaxed max-w-[750px] lg:mx-auto">
              The pound has fallen sharply against the dollar after Andrew Bailey warned the Bank of England would not extend its emergency intervention in financial markets beyond this week, after the turmoil sparked by the government&rsquo;s mini-budget.
            </p>
            <p className="mt-4 lg:mt-6 text-[14px] sm:text-[15px] text-black/80 leading-relaxed max-w-[750px] lg:mx-auto">
              Sterling skidded by more than a cent against the dollar to below $1.10 after the Bank&rsquo;s governor insisted the £65bn scheme to purchase UK government bonds would not be continued beyond the deadline on Friday.
            </p>
            <p className="mt-4 lg:mt-6 text-[14px] sm:text-[15px] text-black/80 leading-relaxed max-w-[750px] lg:mx-auto">
              Pensions industry leaders and one of the Bank&rsquo;s former deputy governors had earlier called for an extension to mop up the ongoing bond market fallout triggered by Kwasi Kwarteng&rsquo;s ill-received mini-budget last month.
            </p>
            <p className="mt-4 lg:mt-6 text-[14px] sm:text-[15px] text-black/80 leading-relaxed max-w-[750px] lg:mx-auto">
              The central bank had started the day by saying it would revamp the scheme&rsquo;s bond-buying firepower – within the existing timeframe – for a second time in as many days, warning there were still &ldquo;material risks&rdquo; in government debt markets affecting UK pension funds.
            </p>
            <button className="mt-5 lg:mt-6 text-[14px] text-black uppercase tracking-wide font-semibold underline pb-1 lg:ml-33 cursor-pointer">
              Read more
            </button>
          </div>

        </div>
      </section>

      {/* ── IMAGE OVERLAY SECTION ── */}
      <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/homepageimages/11062b_7fb998478c5340329ce12947e2674a31~mv2 (1).AVIF')" }}
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex flex-col items-start text-start px-6 sm:px-10 lg:px-0 w-full lg:w-auto mt-40 sm:mt-60 lg:mt-100">
          <div className="flex gap-4 sm:gap-6 mb-4 lg:mb-6">
            < SocialIcons />
          </div>
          <h2 className="text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[65px] font-semibold leading-none max-w-[90vw] lg:max-w-[900px]">
            The interesting architecture trends this year: Indoor trees
          </h2>
        </div>
      </section>

       {/* ── IMAGE OVERLAY SECTION 2 ── */}
      <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[1000px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/homepageimages/home_img_4.AVIF')" }}
        />
        {/* <div className="absolute inset-0 bg-black/10" /> */}

        <div className="relative z-10 flex flex-col items-start text-start px-6 sm:px-10 lg:px-0 w-full lg:w-auto mt-40 sm:mt-60 lg:mt-160">
          <div className="flex gap-4 sm:gap-6 mb-4 lg:mb-6">
            < SocialIcons />
          </div>
          <h2 className="text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[58px] font-semibold leading-none max-w-[90vw] lg:max-w-[900px]">
            How MI5 caught UK embassy spy selling secrets to Russia
          </h2>
           <p className="mt-4 lg:mt-6 text-white/70 text-[13px] sm:text-[14px] lg:text-[14px] leading-relaxed max-w-[90vw] lg:max-w-[700px]">
              A spy at Berlin's British embassy, who sold secrets to Russia and was caught in an undercover MI5 sting, has been jailed for 13 years and two months. David Smith, 58, tried to damage Britain's interests by passing on details of the embassy and its staff for cash payments.
            </p>
        </div>
      </section>

        {/* ── IMAGE OVERLAY SECTION 3 ── */}
      <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[800px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/homepageimages/home_img_5.AVIF')" }}
        />
        {/* <div className="absolute inset-0 bg-black/10" /> */}

        <div className="relative z-10 flex flex-col items-start text-start px-6 sm:px-10 lg:px-0 w-full lg:w-auto mt-40 sm:mt-60 lg:mt-80">
          <div className="flex gap-4 sm:gap-6 mb-4 lg:mb-6">
            < SocialIcons />
          </div>
          <h2 className="text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[58px] font-semibold leading-none max-w-[90vw] lg:max-w-[900px]">
            Wheat markets recover with Black Sea grain deal under pressure
          </h2>
           <p className="mt-4 lg:mt-6 text-white/70 text-[13px] sm:text-[14px] lg:text-[14px] leading-relaxed max-w-[90vw] lg:max-w-[700px]">
             Poor crop conditions for US winter wheat, as well as building tensions surrounding the Black Sea grain deal for Ukraine have triggered a £20/t recovery in feed wheat prices in recent weeks.
            </p>

             <p className="mt-4 lg:mt-6 text-white/70 text-[13px] sm:text-[14px] lg:text-[14px] leading-relaxed max-w-[90vw] lg:max-w-[700px]">
              The current grain export deal between Russia, Ukraine and the United Nations is due to expire on 18 March, and while another extension is likely to be agreed, it is still to be signed.
            </p>
        </div>
      </section>

      {/* ── BLACK HEADLINE SECTION ── */}
      <section className="w-full bg-black flex items-center">
        
        <div className="w-full max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 py-20 lg:py-32 mt-20">

          {/* Blue line */}
          <div className="w-[350px] h-[30px] bg-blue-600 mb-6"></div>

          {/* Heading */}
          <h2 className="text-white text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.05] max-w-[900px]">
            Top Headline of the day, by Importance - 01
          </h2>

          {/* Paragraph */}
          <p className="mt-6 text-white/90 text-[14px] leading-normal max-w-[900px]">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          </p>

        </div>
      </section>

      {/* ── HEADLINE LIST SECTION ── */}
      <section className="w-full bg-black py-16 lg:py-24">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-12">

          {headlineList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10"
            >
              {/* LEFT — IMAGE */}
              <div className="w-full lg:w-[45%] h-[220px] sm:h-[260px] lg:h-[300px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* RIGHT — TEXT */}
              <div className="w-full lg:w-[55%] text-white pr:0 lg:pr-10">
                <h3 className="text-[26px] sm:text-[32px] lg:text-[55px] font-semibold leading-[1.1] mb-4">
                  {item.title}
                </h3>

                <p className="text-white/90 text-[14px] md:text-[13px] leading-relaxed mt-5 max-w-[600px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

       {/* ── IMAGE OVERLAY SECTION 4 ── */}
      <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[800px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/homepageimages/home_img_6.AVIF')" }}
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex flex-col items-start text-start px-6 sm:px-10 lg:px-0 w-full lg:w-auto mt-40 sm:mt-60 lg:mt-[-400]">
          <h2 className="text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[58px] font-semibold leading-none max-w-[90vw] lg:max-w-[900px]">
            Boris Johnson Forced to Resign. Bye Bye Boris.
          </h2>
           <p className="mt-4 lg:mt-6 text-white/90 text-[13px] sm:text-[14px] lg:text-[14px] leading-relaxed max-w-[90vw] lg:max-w-[700px]">
              “As we've seen at Westminster, the herd instinct is powerful. When the herd moves, it moves. And my friends, in politics, no one is remotely indispensable." began Boris Johnson, at the ominous downing street lectern at lunchtime. 
            </p>
        </div>
      </section>

        {/* ── IMAGE OVERLAY SECTION 5 ── */}
      <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[1000px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/homepageimages/home_img_7.AVIF')" }}
        />
        {/* <div className="absolute inset-0 bg-black/10" /> */}

        <div className="relative z-10 flex flex-col items-start text-start px-6 sm:px-10 lg:px-0 w-full lg:w-auto mt-40 sm:mt-60 lg:mt-160">
          <div className="flex gap-4 sm:gap-6 mb-4 lg:mb-6">
            < SocialIcons />
          </div>
          <h2 className="text-white text-[30px] sm:text-[40px] md:text-[48px] lg:text-[58px] font-bold leading-none max-w-[90vw] lg:max-w-[900px]">
            UK space launch: Does failure spell end of Britain’s ambitions?
          </h2>
           <p className="mt-4 lg:mt-6 text-white/90 text-[13px] sm:text-[14px] lg:text-[14px] leading-relaxed max-w-[90vw] lg:max-w-[700px]">
              “As we've seen at Westminster, the herd instinct is powerful. When the herd moves, it moves. And my friends, in politics, no one is remotely indispensable." began Boris Johnson, at the ominous downing street lectern at lunchtime.
            </p>
        </div>
      </section>

      {/* ── FOOTER SECTION ── */}
<section className="relative w-full h-[700px] lg:h-[700px] overflow-hidden">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/homepageimages/home_img_8.AVIF')" }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70" />

  {/* Content Wrapper */}
  <div className="relative z-10 max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 pt-20 lg:pt-28 text-white ">

    {/* 2 COLUMN GRID (6 ROWS) */}
    <div className="grid grid-cols-2 gap-y-6 gap-x-0 text-[13px] sm:text-[14px]">

      {/* ROW 1 */}
      <div className="text-[#F5C645] font-semibold tracking-wide text-[16px] md:text-[20px]">
        SOCIAL CALENDAR
      </div>
      <div className="text-start uppercase tracking-[0.25em] text-white text-[13px]">
        SUBSCRIBE
      </div>

      {/* ROW 2 */}
      <div className="font-semibold text-white/90 text-[12px]">
        EVENTS IN YOUR AREA
      </div>
      <div>
        <span className="text-[#F5C645] font-semibold">WEST LONDON</span>
        <span className="text-white/90 text-[10px] ml-3">
          Elsewhere? Change?
        </span>
      </div>

      {/* ROW 3 */}
      <div></div>
      <div className="space-y-2 text-white/90 text-[11px]">
        <p>
          BREAKFAST CLUB &nbsp; | &nbsp; 10 AM - INVESTMENT OPPORTUNITIES
        </p>
        <p>
          CHARITY &nbsp; | &nbsp; 3 PM - FUNDRAISER FOR CHILDREN'S HOSPITAL
        </p>
      </div>

      {/* ROW 4 */}
      <div className="font-semibold text-white/90 mt-10 md:mt-30 text-[12px]">
        CLASSIFIEDS
      </div>
      <div className="flex justify-between text-white/80 mt-10 md:mt-30">
         <div>
        <span className="text-[white/90 font-semibold">CARS</span>
        <span className="text-white/90 text-[11px] ml-15">
          2020 VOLKSWAGEN GOLF FOR SALE
        </span>
      </div>
      </div>

      {/* ROW 5 */}
      <div></div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-6 text-white/90 text-[11px]">
          <span>FOR SALE</span>
          <span>HOMES</span>
          <span>MOBILE PHONES</span>
          <span>LAPTOPS</span>
        </div>

        <p className="text-white/90 text-[11px]">
          SEE ALL RECENT ITEMS LISTED FOR SALE
        </p>
      </div>

    </div>

    {/* BIG TITLE */}
    <div className="mt-14 md:mt-24">
      <h1 className="text-[30px] md:text-[40px] font-light leading-[1.1]">
        LONDON <br /> NEWS
      </h1>
    </div>

  </div>
</section>

    </div>
  );
}