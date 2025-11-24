
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'sonner@2.0.3': 'sonner',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'figma:asset/ec5fcf89fe0a77803b7cefd4250b03424564bb63.png': path.resolve(__dirname, './src/assets/ec5fcf89fe0a77803b7cefd4250b03424564bb63.png'),
        'figma:asset/a5c75a14f01268c2534d0dfb0a9182a2bf3629d2.png': path.resolve(__dirname, './src/assets/a5c75a14f01268c2534d0dfb0a9182a2bf3629d2.png'),
        'figma:asset/6d180ec5e608f311d21d72a46c32a5b15849c39d.png': path.resolve(__dirname, './src/assets/6d180ec5e608f311d21d72a46c32a5b15849c39d.png'),
        'figma:asset/5f1f04717ce88a1f8a9d6faeee898c4b88ef23f0.png': path.resolve(__dirname, './src/assets/5f1f04717ce88a1f8a9d6faeee898c4b88ef23f0.png'),
        'figma:asset/5da21813da6fa21128f400330102b56ec04a15f5.png': path.resolve(__dirname, './src/assets/5da21813da6fa21128f400330102b56ec04a15f5.png'),
        'figma:asset/5454374a39c6c82a13d2a4e8bc2ca0899c331fc5.png': path.resolve(__dirname, './src/assets/5454374a39c6c82a13d2a4e8bc2ca0899c331fc5.png'),
        'figma:asset/14e103bdb926a80d9f27d93b19086b97e7c47135.png': path.resolve(__dirname, './src/assets/14e103bdb926a80d9f27d93b19086b97e7c47135.png'),
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });