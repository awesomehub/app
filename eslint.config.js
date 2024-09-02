// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const ngrx = require("@ngrx/eslint-plugin/v9");

// @todo uncomment the recommended configs
module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      // eslint.configs.recommended,
      // ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      ...ngrx.configs.all,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "ah",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "ah",
          style: "kebab-case",
        },
      ],
      "@ngrx/use-consistent-global-store-name": ["warn", "store$"]
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      // ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
