module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  plugins: [
    "react",
    "@typescript-eslint",
    "unused-imports",
    "no-autofix",
    "prettier",
  ],

  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
  ],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },

  settings: {
    react: {
      version: "17.0",
    },
  },

  overrides: [
    {
      files: ["careers/**/*"],
      rules: {
        "react/react-in-jsx-scope": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
      },
    },
    {
      files: ["dashboard/**/*", "packages/**/*", "team-portal/**/*"],
      rules: {
        "@next/next/no-img-element": 0,
      },
    },
  ],

  globals: {
    $TSFixMe: "readonly",
    $TSFixMeFunction: "readonly",
    $TSTrustMe: "readonly",
    JSX: "readonly",
    React: "readonly",
    UnknownObject: "readonly",
    ReactChild: "readonly",
    NodeJS: "readonly",
  },
  rules: {
    "prefer-destructuring": "off",
    // "spaced-comment": ["error", "always", { block: { exceptions: ["*"] } }],
    "no-undef": "error",
    "@next/next/no-html-link-for-pages": "off",
    "react/prop-types": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-key": "off",
    "react/no-unescaped-entities": "warn",
    "react-hooks/exhaustive-deps": "error",

    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-types": [
      "error",
      { extendDefaults: true, types: { "{}": false } },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "error",

    "unused-imports/no-unused-imports": "off",
    "no-autofix/unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
};
