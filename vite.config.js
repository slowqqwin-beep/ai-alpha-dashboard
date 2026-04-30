import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 部署在 https://用户名.github.io/仓库名/ 这种子路径下
// 仓库名通过环境变量 BASE_PATH 传入 (GitHub Action 会自动设置)
// 本地开发时 base 是 '/'
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
