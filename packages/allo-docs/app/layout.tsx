/* eslint-env node */
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import { PropsWithChildren } from "react";

export const metadata = {
  metadataBase: new URL(
    "https://github.com/allocapital/allo-kit-simple-grants"
  ),
  title: {
    template: "%s - AlloKit",
  },
  description: "AlloKit: tooling for allocation apps",
  applicationName: "AlloKit Documentation",
  generator: "Next.js",
  appleWebApp: {
    title: "Nextra",
  },
  other: {
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "msapplication-TileColor": "#fff",
  },
  twitter: {
    site: "https://github.com/allocapital/allo-kit-simple-grants",
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="✦" />
      <body>
        <Layout
          navbar={<Navbar logo={<div className="font-bold">AlloKit</div>} />}
          footer={<div />}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/allocapital/allo-kit-simple-grants/blob/main/packages/allo-docs"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={await getPageMap()}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
