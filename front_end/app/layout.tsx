import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf2f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shahfahid.tech"),
  title: {
    default: "Shah Fahid | Full Stack & Frontend Developer",
    template: "%s | Shah Fahid",
  },
  description:
    "Shah Fahid is a Full Stack and Frontend Developer specializing in React, Next.js, TypeScript, Node.js, and Headless CMS architectures. View projects, skills, and portfolio.",
  keywords: [
    "Shah Fahid",
    "Full Stack Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Sanity CMS",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Shah Fahid", url: "https://shahfahid.tech" }],
  creator: "Shah Fahid",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shah Fahid | Full Stack & Frontend Developer",
    description:
      "Full Stack and Frontend Developer specializing in Next.js, React, TypeScript, and modern headless web applications.",
    url: "https://shahfahid.tech",
    siteName: "Shah Fahid Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shah Fahid | Full Stack & Frontend Developer",
    description:
      "Full Stack and Frontend Developer specializing in Next.js, React, TypeScript, and modern headless web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                  }
                  if (window.location.hash) {
                    history.replaceState(null, '', window.location.pathname);
                  }
                  window.scrollTo(0, 0);
                  window.addEventListener('beforeunload', function() {
                    if ('scrollRestoration' in history) {
                      history.scrollRestoration = 'manual';
                    }
                    if (window.location.hash) {
                      history.replaceState(null, '', window.location.pathname);
                    }
                    window.scrollTo(0, 0);
                  });
                  window.addEventListener('DOMContentLoaded', function() {
                    window.scrollTo(0, 0);
                  });
                  window.addEventListener('load', function() {
                    setTimeout(function() { window.scrollTo(0, 0); }, 0);
                    setTimeout(function() { window.scrollTo(0, 0); }, 60);
                  });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
