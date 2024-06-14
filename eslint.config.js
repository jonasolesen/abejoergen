import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import eslintPluginPrettier from 'eslint-plugin-prettier'

function prettier() {
  const options = {
    endOfLine: 'auto',
    plugins: ['prettier-plugin-tailwindcss'],
    printWidth: 120,
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
  }

  const prettierRules = {
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'prettier/prettier': ['error', options],
  }

  return {
    name: 'prettier',
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: prettierRules,
  }
}

export default createConfigForNuxt({ features: { typescript: true } })
  .append(prettier())
  .overrideRules({
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'separate-type-imports', prefer: 'type-imports' },
    ],
  })
