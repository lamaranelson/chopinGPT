/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

async function loadEnv() {
    await import("./src/env.js");
  }
  
  loadEnv();
  
  /** @type {import("next").NextConfig} */
  const config = {};
  
  export default config;