module.exports = {
  requireConfig: false,
  // quoteProps: 'as-needed',
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
