import React from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import {
  MuiThemeProvider,
  createTheme,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
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

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100%',
  },
});

/* const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
  },
}; */

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

const Root = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    </div>
  );
};

Root.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

const StyledComponent = withStyles(useStyles)(Root);

export default StyledComponent;
