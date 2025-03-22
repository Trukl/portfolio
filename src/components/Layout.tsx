import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-black dark:text-white font-sans antialiased h-full">
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default Layout;
