import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.layer.css";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import type React from "react";

import LogtoErrorNotificator from "@/components/LogtoErrorNotificator";
import NavigationProgress from "@/components/NavigationProgress";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import NavBar from "@/components/navbar/NavBar";
import { META } from "@/utils/consts";
import theme from "@/utils/theme";

const raleway = Raleway({ subsets: ["cyrillic-ext", "latin-ext"] });

export const metadata: Metadata = {
  title: {
    default: META.title,
    template: META.title_template,
  },
  description: META.description,
  applicationName: META.title,
  authors: [{ name: "HighError", url: "https://github.com/higherror" }],
  generator: "Next.js",
  creator: "Eviloma",
  publisher: "Eviloma",
  robots: "/robot.txt",
  icons: [
    { rel: "apple-touch-icon", sizes: "180x180", url: "/icons/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/icons/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/icons/favicon-16x16.png" },
    { rel: "mask-icon", type: "image/png", color: "#594f6d", url: "/icons/safari-pinned-tab.svg" },
  ],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: META.title,
    title: {
      default: META.title,
      template: META.title_template,
    },
    description: META.description,
  },
  twitter: {
    card: "summary",
    title: {
      default: META.title,
      template: META.title_template,
    },
    description: META.description,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: META.title,
  },
};

export const viewport: Viewport = {
  themeColor: "#b09af8",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" forceColorScheme="dark" />
      </head>
      <body className={`${raleway.className} min-h-dvh px-4`}>
        <ReactQueryProvider>
          <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme="dark" withGlobalClasses>
            <Notifications position="top-right" />
            <NavigationProgress />
            <LogtoErrorNotificator />
            <NavBar />
            {children}
          </MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
