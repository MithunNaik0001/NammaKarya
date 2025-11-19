import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import SideNav from '@/components/app/side-nav';
import "./globals.css";

export const metadata: Metadata = {
  title: "NextGen App",
  description: "Built with Next.js and ShadCN UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: '100vh' }}>
          <aside style={{ background: 'var(--bg)', borderRight: '1px solid rgba(0,0,0,0.06)', padding: 20 }}>
            <SideNav />
          </aside>
          <main>
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
