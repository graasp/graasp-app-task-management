import React, { FC } from 'react';
import { I18nextProvider } from 'react-i18next';

import { withContext, withToken } from '@graasp/apps-query-client';
import { PRIMARY_COLOR, theme as graaspTheme } from '@graasp/ui';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { grey, orange, pink } from '@mui/material/colors';
import { StyledEngineProvider } from '@mui/material/styles';

import i18nConfig from '../config/i18n';
import {
  CONTEXT_FETCHING_ERROR_MESSAGE,
  TOKEN_REQUEST_ERROR_MESSAGE,
} from '../config/messages';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  hooks,
  queryClient,
} from '../config/queryClient';
import { showErrorToast } from '../utils/toasts';
import App from './App';
import FullDiv from './common/FullDiv';
import Loader from './common/Loader';

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
  ...graaspTheme,
  palette: {
    primary: {
      light: '#7373db',
      main: PRIMARY_COLOR,
      dark: '#383893',
    },
    secondary: pink,
    default: grey['500'],
    background: {
      paper: '#fff',
    },
  },
  typography: {
    h2: {
      fontSize: '1.5rem',
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.2rem',
    },
  },
  status: {
    danger: {
      background: orange['400'],
      color: '#fff',
    },
  },
});

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
    <FullDiv>
      {/* Used to define the order of injected properties between JSS and emotion */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <I18nextProvider i18n={i18nConfig}>
            <QueryClientProvider client={queryClient}>
              <AppWithContextAndToken />
              {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
            </QueryClientProvider>
          </I18nextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </FullDiv>
  );
};

export default Root;
