require('dotenv').config({ path: './.env' });

const config = {
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  databasePort: process.env.DATABASE_PORT,
  databaseUsername: process.env.DATABASE_USERNAME,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseName: process.env.DATABASE_NAME,
  port: process.env.PORT,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebaseKey: process.env.FIREBASE_KEY,
  firebaseBucket: process.env.FIREBASE_BUCKET,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
