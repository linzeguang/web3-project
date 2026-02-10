import { lingui } from '@lingui/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig((env) => {
  const processEnv = loadEnv(env.mode, process.cwd())
  const __BUILD_TIME__ = JSON.stringify(Date.now())

  console.log('>>>>>> processEnv: ', processEnv)

  return {
    plugins: [
      react({
        babel: {
          plugins: ['@lingui/babel-plugin-lingui-macro']
        }
      }),
      tailwindcss(),
      lingui(),
      svgr()
    ],
    define: {
      __BUILD_TIME__
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: 8888,
      host: true,
      proxy: {
        '^/api': {
          changeOrigin: true,
          target: 'https://petstore.swagger.io/v2',
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
