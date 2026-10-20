import { defineCloudflareConfig } from '@opennextjs/cloudflare';

const config = defineCloudflareConfig({});
// Set buildCommand to invoke Next.js directly to avoid recursion with npm run build
(config as any).buildCommand = 'npx next build';

export default config;
