import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { RoleProvider } from '@/context/RoleContext';
import TopNav from '@/components/TopNav';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'DubbingRights — Global Film Rights Marketplace',
  description: 'Buy and sell dubbing, SVOD, and theatrical rights for films worldwide.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans bg-[#0A0A0A] text-[#E5E2E1] antialiased`}>
        <RoleProvider>
          <TopNav />
          <div style={{ paddingTop: '64px' }}>
            {children}
          </div>
        </RoleProvider>
      </body>
    </html>
  );
}
