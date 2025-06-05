// eslint.config.js
import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"

export default tseslint.config(
  { ignores: ["dist"] },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
      react: react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended[0].rules,
      ...reactHooks.configs.recommended.rules,

      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "jsx-a11y/anchor-is-valid": "warn",
      "react/react-in-jsx-scope": "off", // If you're using React 17+ or Next.js
      "react/prop-types": "off", // Using TypeScript
    },
  },
)
