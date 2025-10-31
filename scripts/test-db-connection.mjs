import path from 'path';
import { fileURLToPath } from 'url';

// Resolve project root reliably
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function tryLoadDotenv() {
  try {
    // Try to load dotenv if available (non-fatal)
    await import('dotenv/config');
    console.log('Loaded .env via dotenv');
  } catch (err) {
    console.log('dotenv not installed or .env not loaded; relying on process.env');
  }
}

(async () => {
  await tryLoadDotenv();

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('❌ Missing environment variable: MONGODB_URI');
    console.error('Put it in a .env file or set it in your shell before running this script.');
    process.exit(1);
  }

  try {
    console.log('Attempting to connect to MongoDB using mongoose...');
    const mongooseImport = await import('mongoose');
    const mongoose = mongooseImport.default ?? mongooseImport;

    // Use similar options as your project file
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log('✅ Database connection successful');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed');
    console.error(err && err.message ? err.message : err);
    process.exit(1);
  }
})();
