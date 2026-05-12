import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  // Переопределяем стандартные игнорируемые директории
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      // 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/react-in-jsx-scope': 'off',
      'semi': ['error', 'always', { 'omitLastInOneLineBlock': false }],
      'quotes': ['error', 'single'],
      'react/prop-types': 'off',
      'react/no-unknown-property': ['error', {
        ignore: [
          'xmlns',
          'viewBox',
          'preserveAspectRatio',
          'xlink:href'
        ]
      }],
    },

  }
]);

export default eslintConfig;