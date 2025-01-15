import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css';
import Footer from '@/components/Footer';
import { TooltipProvider } from '@/components/ui/tooltip';
import AnimatedSvg from '@/components/AnimatedSvg';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const Signika = localFont({
  src: './../../public/fonts/Signika-VariableFont_GRAD,wght.ttf',
  variable: '--font-signika',
});
const NotoSans = localFont({
  src: './../../public/fonts/NotoSansNagMundari-VariableFont_wght.ttf',
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: 'Corentin Minne',
  description: 'Site personnel de Corentin Minne',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <TooltipProvider delayDuration={200}>
        <body
          className={cn(
            'overscroll-none bg-background',
            Signika.className,
            NotoSans.className,
            geistSans.variable,
            geistMono.variable,
            'antialiased'
          )}>
          <AnimatedSvg />
          <div className="min-h-screen text-foreground flex flex-col relative">
            <Header />
            <main className="md:pt-20 pt-24 flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </TooltipProvider>
    </html>
  );
}
