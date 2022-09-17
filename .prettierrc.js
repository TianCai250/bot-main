/*
 * @file: 放到项目根目录，使用prettier进行格式化js文件
 * @Author: WangLuo
 * @Date: 2021-07-09 16:59:03
 * @LastEditTime: 2021-08-15 13:43:52
 */
module.exports = {
    "extends": [
        "airbnb",
        "prettier",
        "prettier/react"
    ],
    "singleQuote": true, // 使用单引号
    "printWidth": 200, // 超过最大值换行
    "tabWidth": 4, // 缩进字节数
    "useTabs": false, // 缩进不使用tab，使用空格
    "htmlWhitespaceSensitivity": "ignore",
    "semi": true, // 结尾用分号
    // "disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
    "trailingComma": "none", // 函数最后不需要逗号
    "bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }" 
    "ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中  
    // JSX标签闭合位置 默认false
    // false: <div
    //          className=""
    //          style={{}}
    //       >
    // true: <div
    //          className=""
    //          style={{}} >
    "jsxBracketSameLine": true,
    // 箭头函数参数括号 默认avoid 可选 avoid| always
    // avoid 能省略括号的时候就省略 例如x => x
    // always 总是有括号
    "arrowParens": "avoid",
    "trailingComma": 'all',  // 后置逗号，多行对象、数组在最后一行增加逗号
    "proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
};