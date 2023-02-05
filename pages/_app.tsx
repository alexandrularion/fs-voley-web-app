import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import { AppContextProvider } from '../context/ContextProvider';
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AppContextProvider>
      <NextNProgress {...{ showOnShallow: true, color: 'var(--blue-600)', height: 3 }} />
      <SessionProvider {...{ session, refetchOnWindowFocus: true, refetchInterval: 3000 }}>
        <ChakraProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ChakraProvider>
      </SessionProvider>
    </AppContextProvider>
  );
}
