import { Inter } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { Toaster } from "../components/Toaster";
import CustomCursor from "../components/CustomCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | AICY – AI & Web Solutions",
    default:
      "AICY – AI & Web Solutions | Top Custom Website Development & AI Agents",
  },
  description:
    "AICY is an industry-leading agency specializing in high-performance web development, modern web design, and cutting-edge AI automations and agents. We build scalable, production-ready solutions for visionary businesses.",
  keywords: [
    "Web Development",
    "AI Agents",
    "Artificial Intelligence",
    "Website Designing",
    "Next.js Development",
    "React Agency",
    "AI Automation",
    "Custom Software",
    "Enterprise Web Apps",
  ],
  authors: [{ name: "Ahmed Yar" }],
  creator: "Ahmed Yar",
  publisher: "AICY Company",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aicy.company"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AICY – AI & Web Solutions",
    description:
      "Build the future with AICY. Expert web development, stunning design, and intelligent AI automation tailored for scaleable businesses.",
    url: "/",
    siteName: "AICY",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AICY – AI & Web Solutions",
    description:
      "Industry-leading agency for custom web development and AI agents.",
    creator: "@AiandCodewithYar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const revalidate = 86400; // Cache pages for 24 hours at the edge

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AICY",
    url: "https://aicy.company",
    logo: "https://aicy.company/logo.jpg",
    description:
      "Comprehensive product site showcasing web development, web design, and AI services.",
    sameAs: [
      "https://www.instagram.com/aiandcodewithyar/",
      "https://www.youtube.com/@AiandCodewithYar",
      "https://github.com/ahmedali839",
      "https://www.linkedin.com/in/ahmed-yar-rasheed/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+923715335433",
      email: "ahmedyarr1212@gmail.com",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };

  return (
    <html
      lang="en"
      className="dark scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {process.env.NEXT_PUBLIC_GTM_ID && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}
          <CustomCursor />
          <Navbar />
          <main className="flex-1 overflow-hidden">{children}</main>
          {/* <Footer /> */}
          <Toaster position="bottom-right" />
          <SpeedInsights />
          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}

// import { Inter } from "next/font/google";
// import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { ThemeProvider } from "../components/ThemeProvider";
// import { Toaster } from "../components/Toaster";
// import CustomCursor from "../components/CustomCursor";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: {
//     template: "%s | AICY – AI & Web Solutions",
//     default:
//       "AICY – AI & Web Solutions | Top Custom Website Development & AI Agents",
//   },
//   description:
//     "AICY is an industry-leading agency specializing in high-performance web development, modern web design, and cutting-edge AI automations and agents. We build scalable, production-ready solutions for visionary businesses.",
//   keywords: [
//     "Web Development",
//     "AI Agents",
//     "Artificial Intelligence",
//     "Website Designing",
//     "Next.js Development",
//     "React Agency",
//     "AI Automation",
//     "Custom Software",
//     "Enterprise Web Apps",
//   ],
//   authors: [{ name: "Ahmed Yar" }],
//   creator: "Ahmed Yar",
//   publisher: "AICY Company",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   metadataBase: new URL("https://aicy.company"),
//   alternates: {
//     canonical: "/",
//   },
//   openGraph: {
//     title: "AICY – AI & Web Solutions",
//     description:
//       "Build the future with AICY. Expert web development, stunning design, and intelligent AI automation tailored for scaleable businesses.",
//     url: "/",
//     siteName: "AICY",
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "AICY – AI & Web Solutions",
//     description:
//       "Industry-leading agency for custom web development and AI agents.",
//     creator: "@AiandCodewithYar",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
// };

// export const revalidate = 86400; // Cache pages for 24 hours at the edge

// export default function RootLayout({ children }) {
//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     name: "AICY",
//     url: "https://aicy.company",
//     logo: "https://aicy.company/logo.jpg",
//     description:
//       "Comprehensive product site showcasing web development, web design, and AI services.",
//     sameAs: [
//       "https://www.instagram.com/aiandcodewithyar/",
//       "https://www.youtube.com/@AiandCodewithYar",
//       "https://github.com/ahmedali839",
//       "https://www.linkedin.com/in/ahmed-yar-rasheed/",
//     ],
//     contactPoint: {
//       "@type": "ContactPoint",
//       telephone: "+923715335433",
//       email: "ahmedyarr1212@gmail.com",
//       contactType: "customer service",
//       availableLanguage: ["English"],
//     },
//   };

//   return (
//     <html
//       lang="en"
//       className="dark scroll-smooth"
//       data-scroll-behavior="smooth"
//       suppressHydrationWarning
//     >
//       <head>
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
//       </head>
//       <body
//         className={`${inter.className} bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 antialiased min-h-screen flex flex-col`}
//         suppressHydrationWarning
//       >
//         <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
//           {process.env.NEXT_PUBLIC_GTM_ID && (
//             <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
//           )}
//           <CustomCursor />
//           <Navbar />
//           <main className="flex-1 overflow-hidden">{children}</main>
//           <Footer />
//           <Toaster position="bottom-right" />
//           <SpeedInsights />
//           {process.env.NEXT_PUBLIC_GA_ID && (
//             <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
//           )}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
