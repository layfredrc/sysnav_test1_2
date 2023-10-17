import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from '@svgr/rollup'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
})
