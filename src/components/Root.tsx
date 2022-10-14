import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { pink, grey, orange } from '@mui/material/colors';
import { Loader } from '@graasp/ui';
import { withContext, withToken } from '@graasp/apps-query-client';
import 'react-toastify/dist/ReactToastify.css';
import i18nConfig from '../config/i18n';
import App from './App';
import {
  hooks,
  queryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from '../config/queryClient';
import { showErrorToast } from '../utils/toasts';
import {
  CONTEXT_FETCHING_ERROR_MESSAGE,
  TOKEN_REQUEST_ERROR_MESSAGE,
} from '../config/messages';

// declare the module to enable theme modification
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: { background: string; color: string };
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: { background: string; color: string };
    };
  }

  interface PaletteOptions {
    default: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: pink,
    default: grey['500'],
    background: {
      paper: '#fff',
    },
  },
  status: {
    danger: {
      background: orange['400'],
      color: '#fff',
    },
  },
});

const RootDiv = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
}));

const Root: FC = () => {
  const AppWithContext = withToken(App, {
    LoadingComponent: <Loader />,
    useAuthToken: hooks.useAuthToken,
    onError:
      /* istanbul ignore next */
      () => {
        showErrorToast(TOKEN_REQUEST_ERROR_MESSAGE);
      },
  });
  const AppWithContextAndToken = withContext(AppWithContext, {
    LoadingComponent: <Loader />,
    useGetLocalContext: hooks.useGetLocalContext,
    onError:
      /* istanbul ignore next */
      () => {
        showErrorToast(CONTEXT_FETCHING_ERROR_MESSAGE);
      },
  });
  return (
    <RootDiv>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18nConfig}>
          <QueryClientProvider client={queryClient}>
            <App />
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen />
            )}
          </QueryClientProvider>
          <ToastContainer />
        </I18nextProvider>
      </ThemeProvider>
    </RootDiv>
  );
};

Root.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default Root;
