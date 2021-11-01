import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import theme from '../theme'
import { ModalProvider } from '../contexts/ModalContext';

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ModalProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
