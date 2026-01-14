import pluginVue from 'eslint-plugin-vue'
import eslint from '@eslint/js'
import oxlint from 'eslint-plugin-oxlint'
import prettier from 'eslint-config-prettier'

export default [
    // add more generic rulesets here, such as:
    // js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    eslint.configs.recommended,
    oxlint.configs.recommended,
    prettier,
    // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
    {
        rules: {
            "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
            "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        },
        languageOptions: {
            sourceType: 'module',
        },
        overrides: [
            {
                files: [
                    "**/__tests__/*.{j,t}s?(x)",
                    "**/tests/unit/**/*.spec.{j,t}s?(x)",
                ],
                env: {
                    jest: true,
                },
            },
        ],
    }
]
