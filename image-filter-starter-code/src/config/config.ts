const { JWT_SECRET, SENTRY_DSN } = process.env;

export const config = {
  jwt_secret: JWT_SECRET,
  sentry_dsn: SENTRY_DSN,
};
