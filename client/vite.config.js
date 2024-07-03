import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    rollupOptions:{
      external:['react-toastify','react-router-dom','react-icons', 'react-toastify/dist/ReactToastify.css']
    }
  }
})
