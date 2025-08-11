import { defineConfig } from "drizzle-kit";
import { config as dotenvConfig } from "dotenv";
// Ensure CLI picks up env from .env.local when running drizzle-kit
dotenvConfig({ path: ".env.local" });

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Set in .env.local as: DRIZZLE_DB_URL=postgresql://... (include sslmode=require for Supabase)
    url: process.env.DRIZZLE_DB_URL!,
  },
  verbose: true,
  strict: true,
});
