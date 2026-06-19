import type {Metadata} from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css'; // Global styles

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Sylwia Hairstylist — The No Mirror Experience | Cardiff',
  description: 'Sylwia Daria Łuszczyńska is an award-winning master colourist and educator in Cardiff, UK. Discover a transformative, trust-based self-care ritual.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="bg-[#0b0c10] text-[#f4f6f8] antialiased min-h-screen selection:bg-[#c9a063] selection:text-[#0b0c10]">
        {children}
      </body>
    </html>
  );
}
