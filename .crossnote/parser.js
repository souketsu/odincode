// ({
//   // Please visit the URL below for more information:
//   // https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser

//   onWillParseMarkdown: async function(markdown) {
//     return markdown;
//   },

//   onDidParseMarkdown: async function(html) {
//     return html;
//   },
// })

// markdown 解析器
// 1. 引入 KaTeX 库
// 2. 引入 pseudocode 库
// 3. 在 HTML 中添加 pseudocode 类名的元素
// 4. 在 JavaScript 中渲染 pseudocode 元素

module.exports = {
  onWillParseMarkdown: function (markdown) {
    return new Promise((resolve, reject) => {
      return resolve(markdown);
    });
  },
  onDidParseMarkdown: function (html, { cheerio }) {
    return new Promise((resolve, reject) => {
      return resolve(
        `
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.js"
    integrity="sha256-F/Xda58SPdcUCr+xhSGz9MA2zQBPb0ASEYKohl8UCHc=" crossorigin="anonymous">
</script> 
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pseudocode@latest/build/pseudocode.min.css">
<script src="https://cdn.jsdelivr.net/npm/pseudocode@latest/build/pseudocode.min.js">
</script>
` +
          html +
          `
<script>
elements = document.getElementsByClassName("pseudocode");
for (var i = 1; i <= elements.length; i++) {
    setTimeout(function() {
        var element = document.getElementsByClassName("pseudocode")[0];
        pseudocode.renderElement(element, { lineNumber: element.getAttribute("lineNumber") == "true" });
    }, i * 100);
}
</script>`
      );
    });
  },
  onWillTransformMarkdown: function (markdown) {
    return new Promise((resolve, reject) => {
      return resolve(markdown);
    });
  },
  onDidTransformMarkdown: function (markdown) {
    return new Promise((resolve, reject) => {
      return resolve(markdown);
    });
  },
};