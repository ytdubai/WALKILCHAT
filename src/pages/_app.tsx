import { AuthProvider } from '../lib/providers/AuthProvider';
import { ProtectionLayer } from '../components/ProtectionLayer';
import { TrackingBeacon } from '../components/TrackingBeacon';
import { SecurityWarning, CopyrightWatermark } from '../components/SecurityWarning';
// import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProtectionLayer />
      <TrackingBeacon />
      <SecurityWarning />
      <CopyrightWatermark />
      <Component {...pageProps} />
    </AuthProvider>
  );
}