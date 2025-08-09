import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import '@/styles/globals.css';
import { Analytics } from "@vercel/analytics/next";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showNavbar = router.pathname !== '/ChatPage';

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Analytics />
    </div>
  );
}
