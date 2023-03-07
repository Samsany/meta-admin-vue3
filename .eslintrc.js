module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        requireConfig: false,
        quoteProps: 'as-needed',
        proseWrap: 'preserve',
        endOfLine: 'auto',
        // 指定HTML文件的全局空格敏感度 css\strict\ignore
        htmlWhitespaceSensitivity: 'strict',
        printWidth: 120,
        // 使用默认的折行标准 always\never\preserve
        // proseWrap: 'never',
        // 在语句末尾是否需要分号
        semi: false,
        // 是否使用单引号
        singleQuote: true,
        tabWidth: 2,
        // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
        trailingComma: 'none',
        // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
        arrowParens: 'avoid',
        // 在对象文字中的括号之间打印空格
        bracketSpacing: true,
        // Vue文件脚本和样式标签缩进
        vueIndentScriptAndStyle: false,
        // 在JSX中使用单引号而不是双引号
        jsxSingleQuote: false,
        // jsx 标签的反尖括号需要换行
        jsxBracketSameLine: false
      }
    ],
    'vue/script-setup-uses-vars': 'error',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'space-before-function-paren': 'off',
    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/multi-word-component-names': 'off',
    'comma-dangle': ['error', 'never']
  }
}
