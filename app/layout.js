


// // app/layout.js  — SERVER COMPONENT
// import "./globals.css";

// export const metadata = {
//   metadataBase: new URL("https://london-news-two.vercel.app"),
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/*
//           PERFORMANCE FIX: preconnect to the two origins flagged by Lighthouse
//           as saving 760 ms and 300 ms on LCP respectively.

//           - open-meteo: weather API fetched on every page load
//           - onrender backend: all article / homepage / mood API calls

//           preconnect establishes the TCP + TLS handshake ahead of the first
//           request, so the browser isn't waiting on it during the critical path.

//           dns-prefetch is the fallback for browsers that don't support preconnect.

//           PERFORMANCE FIX: preconnect to Google Fonts origins so the Manrope
//           font (used in SplashScreen) no longer blocks render for 750 ms.
//           fonts.googleapis.com serves the CSS; fonts.gstatic.com serves the woff2.
//         */}
//         <link rel="preconnect" href="https://api.open-meteo.com" />
//         <link rel="dns-prefetch" href="https://api.open-meteo.com" />

//         <link rel="preconnect" href="https://london-news-backend.onrender.com" />
//         <link rel="dns-prefetch" href="https://london-news-backend.onrender.com" />

//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

//         {/* Preconnect to ImageKit CDN used for article images */}
//         <link rel="preconnect" href="https://ik.imagekit.io" />
//         <link rel="dns-prefetch" href="https://ik.imagekit.io" />
//       </head>
//       <body>{children}</body>
//     </html>
//   );
// }

// app/layout.js

import "./globals.css";

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  || "https://london-news-two.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "London News";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Independent News for London`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Independent coverage of London politics, business, culture, lifestyle, technology and sport. Updated daily.",

  // ── Favicon via Next.js metadata API ─────────────────────────────────
  // This makes Next.js emit the <link> tags that SEO tools look for.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        {/* Explicit favicon link — satisfies SEO tools that scan raw HTML */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <link rel="preconnect" href="https://api.open-meteo.com" />
        <link rel="dns-prefetch" href="https://api.open-meteo.com" />
        <link rel="preconnect" href="https://london-news-backend.onrender.com" />
        <link rel="dns-prefetch" href="https://london-news-backend.onrender.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
      </head>
      <body>{children}</body>
    </html>
  );
}