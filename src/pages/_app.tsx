import { AuthProvider } from '../lib/providers/AuthProvider';
import { ProtectionLayer } from '../components/ProtectionLayer';
import { TrackingBeacon } from '../components/TrackingBeacon';
import { SecurityWarning, CopyrightWatermark } from '../components/SecurityWarning';
import { InstallPrompt } from '../components/InstallPrompt';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            background-color: #0A0A0F; 
            color: white; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .glass-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(12px);
            border-radius: 1rem;
            transition: all 0.3s;
          }
          .glass-card:hover {
            transform: translateY(-2px);
          }
          .status-tag {
            padding: 0.125rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
          }
          .status-tag.success {
            color: rgb(52, 211, 153);
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
          }
        `}</style>
      </Head>
      <AuthProvider>
        <ProtectionLayer />
        <TrackingBeacon />
        <SecurityWarning />
        <CopyrightWatermark />
        <InstallPrompt />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}