import js from "@eslint/js"
import { includeIgnoreFile } from "@eslint/compat"
import svelte from "eslint-plugin-svelte"
import globals from "globals"
import { fileURLToPath } from "node:url"
import ts from "typescript-eslint"
import svelteConfig from "./svelte.config.js"
const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url))

export default ts.config([
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "indent": ["error", 2],
      "eqeqeq": ["error", "smart"],
      "linebreak-style": ["error", "unix"],
      "no-trailing-spaces": "error",
      "quotes": ["error", "double"],
      "semi": ["error", "never"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ]
      // "no-console": ["error", { allow: ["info"]}]
    }
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    ignores: ["eslint.config.js", "svelte.config.js"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig
      }
    }
  }
])
