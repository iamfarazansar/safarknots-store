import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST
const MEILISEARCH_ADMIN_KEY = process.env.MEILISEARCH_ADMIN_KEY

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  plugins: [
    ...(MEILISEARCH_HOST && MEILISEARCH_ADMIN_KEY ? [{
      resolve: '@rokmohar/medusa-plugin-meilisearch',
      options: {
        config: {
          host: MEILISEARCH_HOST,
          apiKey: MEILISEARCH_ADMIN_KEY,
        },
        settings: {
          products: {
            type: 'products',
            enabled: true,
            fields: ['id', 'title', 'description', 'handle', 'variant_sku', 'thumbnail'],
            indexSettings: {
              searchableAttributes: ['title', 'description', 'variant_sku'],
              displayedAttributes: ['id', 'handle', 'title', 'description', 'variant_sku', 'thumbnail'],
              filterableAttributes: ['id', 'handle'],
            },
            primaryKey: 'id',
          },
        },
      },
    }] : []),
  ],
})
