import React from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import {
  ThemeProvider,
  createTheme,
  styled,
} from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { pink, grey, orange } from '@mui/material/colors';
import 'react-toastify/dist/ReactToastify.css';
import i18nConfig from '../config/i18n';
import App from './App';

import { ContextProvider } from './context/ContextContext';
import { TokenProvider } from './context/TokenContext';
import {
  queryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from '../config/queryClient';

import { AppProvider } from './context/AppContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: pink,
    default: grey,
    background: {
      paper: '#fff',
    },
  },
  status: {
    danger: {
      background: orange,
      color: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const RootDiv = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
}));

const Root = () => (
    <RootDiv>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18nConfig}>
          <QueryClientProvider client={queryClient}>
            <ContextProvider>
              <TokenProvider>
                <AppProvider>
                  <App />
                </AppProvider>
              </TokenProvider>
            </ContextProvider>
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen />
            )}
          </QueryClientProvider>
          <ToastContainer />
        </I18nextProvider>
      </ThemeProvider>
    </RootDiv>
  );

Root.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default Root;
