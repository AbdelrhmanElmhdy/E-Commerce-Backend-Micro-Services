import dotenv from 'dotenv';

enum Env {
  dev = 'dev',
  production = 'production',
}

if (process.env.NODE_ENV == Env.production) {
  dotenv.config(); // Load environment variables from .env file
} else {
  const envFilePath = `./.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: envFilePath });
}
