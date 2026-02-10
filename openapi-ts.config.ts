import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'openapi-ts.json',
  output: {
    path: 'src/services',
    postProcess: ['eslint', 'prettier']
  },
  plugins: [
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: '../hey-api.ts'
    }
  ]
})
