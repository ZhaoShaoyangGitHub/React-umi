/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-05 14:03:32
 * @LastEditTime: 2019-08-08 14:19:18
 */
module.exports = {
    extends: ['taro', 'prettier', 'prettier/@typescript-eslint', 'eslint-config-prettier'],
    rules: {
        'no-unused-vars': ['warn', { varsIgnorePattern: 'Taro' }],
        // "no-console": ["error", { "allow": ["warn", "error", "info"] }],
        'no-var': 'error',
        'import/first': 'off',
        'no-extra-semi': 'error',
        'no-extra-parens': 'warn',
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts', '.js'] }],
        'import/prefer-default-export': ['off'], //非 export default 报错
        'no-dupe-args': 'error', //禁止 function 定义中出现重名参数
        'no-dupe-keys': 'error', //禁止对象字面量中出现重复的 key
        'no-duplicate-case': 'error', //禁止出现重复的 case 标签
        'no-empty': 'error', //禁止出现空语句块
        'no-irregular-whitespace': 'error', //禁止不规则的空白
        'no-misleading-character-class': 'error', //不允许在字符类语法中出现由多个代码点组成的字符
        'no-obj-calls': 'error', //禁止把全局对象作为函数调用
        'no-regex-spaces': 'error', //禁止正则表达式字面量中出现多个空格
        'no-sparse-arrays': 'error', //禁用稀疏数组
        'no-unexpected-multiline': 'error', //禁止出现令人困惑的多行表达式
        'no-unreachable': 'error', //禁止在 return、throw、continue 和 break 语句之后出现不可达代码
        'use-isnan': 'error', //要求使用 isNaN() 检查 NaN
        // "class-methods-use-this": "error" //强制类方法使用 this
        'no-empty-function': 'warn', //禁止出现空函数
        'no-extra-label': 'error', //禁用不必要的标签
        'no-lone-blocks': 'error', //禁用不必要的嵌套块
        'no-redeclare': 'error', //禁止多次声明同一变量
        'no-label-var': 'error', //不允许标签与变量同名
        'no-shadow-restricted-names': 'error', //禁止将标识符定义为受限的名字
        'array-bracket-spacing': 'error', //强制数组方括号中使用一致的空格
        'block-spacing': 'error', //禁止或强制在代码块中开括号前和闭括号后有空格
        'brace-style': 'error', //强制在代码块中使用一致的大括号风格
        camelcase: 'error', //强制使用骆驼拼写法命名约定
        'comma-dangle': 'off', //要求或禁止末尾逗号
        'comma-spacing': 'error', //强制在逗号前后使用一致的空格
        'comma-style': 'error', //强制使用一致的逗号风格
        'react/jsx-indent-props': ['error', 4], //验证JSX中的props缩进
        'react/jsx-key': 'error', //在数组或迭代器中验证JSX具有key属性
        'computed-property-spacing': 'error', //强制在计算的属性的方括号中使用一致的空格
        'eol-last': 'off', //要求或禁止文件末尾存在空行
        'function-paren-newline': 'error', //强制在函数括号内使用一致的换行
        indent: 'warn', //强制使用一致的缩进
        'jsx-quotes': 'warn', //强制在 JSX 属性中一致地使用双引号或单引号
        'key-spacing': 'error', //强制在对象字面量的属性中键和值之间使用一致的间距
        'linebreak-style': 'error', //强制使用一致的换行风格
        // "new-cap":"error",//构造函数首字母大写
        'no-nested-ternary': 'error', //禁用嵌套的三元表达式
        'arrow-spacing': 'error', //强制箭头函数的箭头前后使用一致的空格
        'generator-star-spacing': 'error', //强制 generator 函数中 * 号周围使用一致的空格
        'prefer-arrow-callback': 'error', //要求回调函数使用箭头函数
        'prefer-const': 'warn', //要求使用 const 声明那些声明后不再被修改的变量
        'prefer-destructuring': 'off', //优先使用数组和对象解构
        // "react/no-array-index-key": "off", //react / no-array-index-key
        'react/no-array-index-key': 0, //防止在数组中遍历中使用数组key做索引
        'react/no-deprecated': 1, //不使用弃用的方法
        'yield-star-spacing': 'error', //强制在 yield* 表达式中 * 周围使用空格
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        useJSXTextNode: true,
        project: './tsconfig.json',
    },
}
