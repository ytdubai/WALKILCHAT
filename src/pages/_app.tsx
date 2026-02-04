import { AuthProvider } from '../lib/providers/AuthProvider';
import { ProtectionLayer } from '../components/ProtectionLayer';
// import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProtectionLayer />
      <Component {...pageProps} />
    </AuthProvider>
  );
}