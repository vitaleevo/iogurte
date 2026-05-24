import type {Metadata} from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css'; // Global styles

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "L'Or Blanc | Iogurtes Artesanais Premium",
  description: "Descubra o luxo do verdadeiro iogurte artesanal. Produção delicada, ingredientes biológicos selecionados e sabores gourmet exclusivos.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="bg-cream-50 text-luxury-charcoal font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
