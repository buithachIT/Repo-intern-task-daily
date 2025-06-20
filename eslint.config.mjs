import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import pluginPrettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      // Build outputs
      '**/node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'out/**',

      // Generated files
      '**/generated/**',
      'src/generated/**',
      'src/generated/prisma/wasm.js',
      'prisma/generated/**',

      // Config files
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',

      // Environment files
      '.env*',

      // Cache and temp files
      '.cache/**',
      '*.log',
      '*.tmp',

      // OS specific
      'C:/Users/*/Cookies/**',
      'C:/Users/*/Local Settings/**',
      '.DS_Store',
      'Thumbs.db',

      // Package files
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
    ],
  },
  {
    plugins: {
      prettier: pluginPrettier,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
];

export default config;
