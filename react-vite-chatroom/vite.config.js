import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    // host: '0.0.0.0'
    proxy: {
      // vite 跨域 https://blog.csdn.net/weixin_44698285/article/details/116199292
      '/api': {
        target: 'http://localhost:8888/chat',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
