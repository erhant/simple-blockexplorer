import type {AppProps} from 'next/app';
import Head from 'next/head';
import {ClientContextWrapper} from '../context/client.context';
import {useState, useEffect} from 'react';
import {MantineProvider, ColorScheme, ColorSchemeProvider} from '@mantine/core';
import {CookieValueTypes} from 'cookies-next/lib/types';
import {getCookie, setCookies} from 'cookies-next';

function App(props: AppProps & {colorScheme: ColorScheme}) {
  const {Component, pageProps} = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, {maxAge: 60 * 60 * 24 * 30});
  };

  // decide color scheme on mount
  useEffect(() => {
    const color: CookieValueTypes = getCookie('mantine-color-scheme');
    if (!color) {
      setColorScheme('light');
    } else setColorScheme(color.toString() as 'light' | 'dark');
  }, []);

  return (
    <>
      <Head>
        <title>Lite-Explorer</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="A generic & minimal block explorer for EVM-compatible chains." />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            globalStyles: theme => ({
              a: {
                color: 'inherit',
                textDecoration: 'none',
              },
              '*': {
                boxSizing: 'border-box',
              },
              html: {
                padding: 0,
                margin: 0,
              },
            }),
            colorScheme,
            primaryColor: 'indigo',
            loader: 'dots',
          }}
        >
          <ClientContextWrapper>
            <Component {...pageProps} />
          </ClientContextWrapper>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default App;
