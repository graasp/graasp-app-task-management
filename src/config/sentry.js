export const SENTRY_DSN =
  'https://4651bae3d7804c168aa2a05b67ab1d9b@o244065.ingest.sentry.io/6353193';

const generateSentryConfig = () => {
  let SENTRY_ENVIRONMENT = 'development';
  let SENTRY_TRACE_SAMPLE_RATE = 1.0;
  switch (process.env.NODE_ENV) {
    case 'production':
      SENTRY_ENVIRONMENT = 'production';
      SENTRY_TRACE_SAMPLE_RATE = 0.1;
      break;
    case 'test':
      SENTRY_TRACE_SAMPLE_RATE = 0.0;
      break;
    case 'development':
      SENTRY_TRACE_SAMPLE_RATE = 0.0;
      break;
    default:
  }

  return { SENTRY_ENVIRONMENT, SENTRY_TRACE_SAMPLE_RATE };
};

export const { SENTRY_ENVIRONMENT, SENTRY_TRACE_SAMPLE_RATE } =
  generateSentryConfig();
