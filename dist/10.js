(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/coffee/coffee.js":
/*!****************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/coffee/coffee.js ***!
  \****************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\nvar conf = {\n    wordPattern: /(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\#%\\^\\&\\*\\(\\)\\=\\$\\-\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\/\\?\\s]+)/g,\n    comments: {\n        blockComment: ['###', '###'],\n        lineComment: '#'\n    },\n    brackets: [\n        ['{', '}'],\n        ['[', ']'],\n        ['(', ')']\n    ],\n    autoClosingPairs: [\n        { open: '{', close: '}' },\n        { open: '[', close: ']' },\n        { open: '(', close: ')' },\n        { open: '\"', close: '\"' },\n        { open: '\\'', close: '\\'' },\n    ],\n    surroundingPairs: [\n        { open: '{', close: '}' },\n        { open: '[', close: ']' },\n        { open: '(', close: ')' },\n        { open: '\"', close: '\"' },\n        { open: '\\'', close: '\\'' },\n    ],\n    folding: {\n        markers: {\n            start: new RegExp(\"^\\\\s*#region\\\\b\"),\n            end: new RegExp(\"^\\\\s*#endregion\\\\b\")\n        }\n    }\n};\nvar language = {\n    defaultToken: '',\n    ignoreCase: true,\n    tokenPostfix: '.coffee',\n    brackets: [\n        { open: '{', close: '}', token: 'delimiter.curly' },\n        { open: '[', close: ']', token: 'delimiter.square' },\n        { open: '(', close: ')', token: 'delimiter.parenthesis' }\n    ],\n    regEx: /\\/(?!\\/\\/)(?:[^\\/\\\\]|\\\\.)*\\/[igm]*/,\n    keywords: [\n        'and', 'or', 'is', 'isnt', 'not', 'on', 'yes', '@', 'no', 'off',\n        'true', 'false', 'null', 'this',\n        'new', 'delete', 'typeof', 'in', 'instanceof',\n        'return', 'throw', 'break', 'continue', 'debugger',\n        'if', 'else', 'switch', 'for', 'while', 'do', 'try', 'catch', 'finally',\n        'class', 'extends', 'super',\n        'undefined', 'then', 'unless', 'until', 'loop', 'of', 'by', 'when'\n    ],\n    // we include these common regular expressions\n    symbols: /[=><!~?&%|+\\-*\\/\\^\\.,\\:]+/,\n    escapes: /\\\\(?:[abfnrtv\\\\\"'$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n    // The main tokenizer for our languages\n    tokenizer: {\n        root: [\n            // identifiers and keywords\n            [/\\@[a-zA-Z_]\\w*/, 'variable.predefined'],\n            [/[a-zA-Z_]\\w*/, {\n                    cases: {\n                        'this': 'variable.predefined',\n                        '@keywords': { token: 'keyword.$0' },\n                        '@default': ''\n                    }\n                }],\n            // whitespace\n            [/[ \\t\\r\\n]+/, ''],\n            // Comments\n            [/###/, 'comment', '@comment'],\n            [/#.*$/, 'comment'],\n            // regular expressions\n            ['///', { token: 'regexp', next: '@hereregexp' }],\n            [/^(\\s*)(@regEx)/, ['', 'regexp']],\n            [/(\\()(\\s*)(@regEx)/, ['@brackets', '', 'regexp']],\n            [/(\\,)(\\s*)(@regEx)/, ['delimiter', '', 'regexp']],\n            [/(\\=)(\\s*)(@regEx)/, ['delimiter', '', 'regexp']],\n            [/(\\:)(\\s*)(@regEx)/, ['delimiter', '', 'regexp']],\n            [/(\\[)(\\s*)(@regEx)/, ['@brackets', '', 'regexp']],\n            [/(\\!)(\\s*)(@regEx)/, ['delimiter', '', 'regexp']],\n            [/(\\&)(\\s*)(@regEx)/, ['delimiter', '', 'regexp']],\n            [/(\\|)(\\s*)(@regEx)/, ['delimiter', '', 'regexp']],\n            [/(\\?)(\\s*)(@regEx)/, ['delimiter', '', 'regexp']],\n            [/(\\{)(\\s*)(@regEx)/, ['@brackets', '', 'regexp']],\n            [/(\\;)(\\s*)(@regEx)/, ['', '', 'regexp']],\n            // delimiters\n            [/}/, {\n                    cases: {\n                        '$S2==interpolatedstring': { token: 'string', next: '@pop' },\n                        '@default': '@brackets'\n                    }\n                }],\n            [/[{}()\\[\\]]/, '@brackets'],\n            [/@symbols/, 'delimiter'],\n            // numbers\n            [/\\d+[eE]([\\-+]?\\d+)?/, 'number.float'],\n            [/\\d+\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float'],\n            [/0[xX][0-9a-fA-F]+/, 'number.hex'],\n            [/0[0-7]+(?!\\d)/, 'number.octal'],\n            [/\\d+/, 'number'],\n            // delimiter: after number because of .\\d floats\n            [/[,.]/, 'delimiter'],\n            // strings:\n            [/\"\"\"/, 'string', '@herestring.\"\"\"'],\n            [/'''/, 'string', '@herestring.\\'\\'\\''],\n            [/\"/, {\n                    cases: {\n                        '@eos': 'string',\n                        '@default': { token: 'string', next: '@string.\"' }\n                    }\n                }],\n            [/'/, {\n                    cases: {\n                        '@eos': 'string',\n                        '@default': { token: 'string', next: '@string.\\'' }\n                    }\n                }],\n        ],\n        string: [\n            [/[^\"'\\#\\\\]+/, 'string'],\n            [/@escapes/, 'string.escape'],\n            [/\\./, 'string.escape.invalid'],\n            [/\\./, 'string.escape.invalid'],\n            [/#{/, {\n                    cases: {\n                        '$S2==\"': { token: 'string', next: 'root.interpolatedstring' },\n                        '@default': 'string'\n                    }\n                }],\n            [/[\"']/, {\n                    cases: {\n                        '$#==$S2': { token: 'string', next: '@pop' },\n                        '@default': 'string'\n                    }\n                }],\n            [/#/, 'string']\n        ],\n        herestring: [\n            [/(\"\"\"|''')/, {\n                    cases: {\n                        '$1==$S2': { token: 'string', next: '@pop' },\n                        '@default': 'string'\n                    }\n                }],\n            [/[^#\\\\'\"]+/, 'string'],\n            [/['\"]+/, 'string'],\n            [/@escapes/, 'string.escape'],\n            [/\\./, 'string.escape.invalid'],\n            [/#{/, { token: 'string.quote', next: 'root.interpolatedstring' }],\n            [/#/, 'string']\n        ],\n        comment: [\n            [/[^#]+/, 'comment',],\n            [/###/, 'comment', '@pop'],\n            [/#/, 'comment'],\n        ],\n        hereregexp: [\n            [/[^\\\\\\/#]+/, 'regexp'],\n            [/\\\\./, 'regexp'],\n            [/#.*$/, 'comment'],\n            ['///[igm]*', { token: 'regexp', next: '@pop' }],\n            [/\\//, 'regexp'],\n        ],\n    },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NvZmZlZS9jb2ZmZWUuanMuanMiLCJzb3VyY2VzIjpbIi9naXRzL3dlYnZpei9oZGwtZGV2L3dlYnZpei9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NvZmZlZS9jb2ZmZWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5leHBvcnQgdmFyIGNvbmYgPSB7XG4gICAgd29yZFBhdHRlcm46IC8oLT9cXGQqXFwuXFxkXFx3Kil8KFteXFxgXFx+XFwhXFxAXFwjJVxcXlxcJlxcKlxcKFxcKVxcPVxcJFxcLVxcK1xcW1xce1xcXVxcfVxcXFxcXHxcXDtcXDpcXCdcXFwiXFwsXFwuXFw8XFw+XFwvXFw/XFxzXSspL2csXG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJyMjIycsICcjIyMnXSxcbiAgICAgICAgbGluZUNvbW1lbnQ6ICcjJ1xuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWydbJywgJ10nXSxcbiAgICAgICAgWycoJywgJyknXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgIF0sXG4gICAgZm9sZGluZzoge1xuICAgICAgICBtYXJrZXJzOiB7XG4gICAgICAgICAgICBzdGFydDogbmV3IFJlZ0V4cChcIl5cXFxccyojcmVnaW9uXFxcXGJcIiksXG4gICAgICAgICAgICBlbmQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqI2VuZHJlZ2lvblxcXFxiXCIpXG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICBkZWZhdWx0VG9rZW46ICcnLFxuICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgdG9rZW5Qb3N0Zml4OiAnLmNvZmZlZScsXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScsIHRva2VuOiAnZGVsaW1pdGVyLmN1cmx5JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJywgdG9rZW46ICdkZWxpbWl0ZXIuc3F1YXJlJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJywgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH1cbiAgICBdLFxuICAgIHJlZ0V4OiAvXFwvKD8hXFwvXFwvKSg/OlteXFwvXFxcXF18XFxcXC4pKlxcL1tpZ21dKi8sXG4gICAga2V5d29yZHM6IFtcbiAgICAgICAgJ2FuZCcsICdvcicsICdpcycsICdpc250JywgJ25vdCcsICdvbicsICd5ZXMnLCAnQCcsICdubycsICdvZmYnLFxuICAgICAgICAndHJ1ZScsICdmYWxzZScsICdudWxsJywgJ3RoaXMnLFxuICAgICAgICAnbmV3JywgJ2RlbGV0ZScsICd0eXBlb2YnLCAnaW4nLCAnaW5zdGFuY2VvZicsXG4gICAgICAgICdyZXR1cm4nLCAndGhyb3cnLCAnYnJlYWsnLCAnY29udGludWUnLCAnZGVidWdnZXInLFxuICAgICAgICAnaWYnLCAnZWxzZScsICdzd2l0Y2gnLCAnZm9yJywgJ3doaWxlJywgJ2RvJywgJ3RyeScsICdjYXRjaCcsICdmaW5hbGx5JyxcbiAgICAgICAgJ2NsYXNzJywgJ2V4dGVuZHMnLCAnc3VwZXInLFxuICAgICAgICAndW5kZWZpbmVkJywgJ3RoZW4nLCAndW5sZXNzJywgJ3VudGlsJywgJ2xvb3AnLCAnb2YnLCAnYnknLCAnd2hlbidcbiAgICBdLFxuICAgIC8vIHdlIGluY2x1ZGUgdGhlc2UgY29tbW9uIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgICBzeW1ib2xzOiAvWz0+PCF+PyYlfCtcXC0qXFwvXFxeXFwuLFxcOl0rLyxcbiAgICBlc2NhcGVzOiAvXFxcXCg/OlthYmZucnR2XFxcXFwiJyRdfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgICAvLyBUaGUgbWFpbiB0b2tlbml6ZXIgZm9yIG91ciBsYW5ndWFnZXNcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgLy8gaWRlbnRpZmllcnMgYW5kIGtleXdvcmRzXG4gICAgICAgICAgICBbL1xcQFthLXpBLVpfXVxcdyovLCAndmFyaWFibGUucHJlZGVmaW5lZCddLFxuICAgICAgICAgICAgWy9bYS16QS1aX11cXHcqLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3RoaXMnOiAndmFyaWFibGUucHJlZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGtleXdvcmRzJzogeyB0b2tlbjogJ2tleXdvcmQuJDAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvLCAnJ10sXG4gICAgICAgICAgICAvLyBDb21tZW50c1xuICAgICAgICAgICAgWy8jIyMvLCAnY29tbWVudCcsICdAY29tbWVudCddLFxuICAgICAgICAgICAgWy8jLiokLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIC8vIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgICAgICAgICAgIFsnLy8vJywgeyB0b2tlbjogJ3JlZ2V4cCcsIG5leHQ6ICdAaGVyZXJlZ2V4cCcgfV0sXG4gICAgICAgICAgICBbL14oXFxzKikoQHJlZ0V4KS8sIFsnJywgJ3JlZ2V4cCddXSxcbiAgICAgICAgICAgIFsvKFxcKCkoXFxzKikoQHJlZ0V4KS8sIFsnQGJyYWNrZXRzJywgJycsICdyZWdleHAnXV0sXG4gICAgICAgICAgICBbLyhcXCwpKFxccyopKEByZWdFeCkvLCBbJ2RlbGltaXRlcicsICcnLCAncmVnZXhwJ11dLFxuICAgICAgICAgICAgWy8oXFw9KShcXHMqKShAcmVnRXgpLywgWydkZWxpbWl0ZXInLCAnJywgJ3JlZ2V4cCddXSxcbiAgICAgICAgICAgIFsvKFxcOikoXFxzKikoQHJlZ0V4KS8sIFsnZGVsaW1pdGVyJywgJycsICdyZWdleHAnXV0sXG4gICAgICAgICAgICBbLyhcXFspKFxccyopKEByZWdFeCkvLCBbJ0BicmFja2V0cycsICcnLCAncmVnZXhwJ11dLFxuICAgICAgICAgICAgWy8oXFwhKShcXHMqKShAcmVnRXgpLywgWydkZWxpbWl0ZXInLCAnJywgJ3JlZ2V4cCddXSxcbiAgICAgICAgICAgIFsvKFxcJikoXFxzKikoQHJlZ0V4KS8sIFsnZGVsaW1pdGVyJywgJycsICdyZWdleHAnXV0sXG4gICAgICAgICAgICBbLyhcXHwpKFxccyopKEByZWdFeCkvLCBbJ2RlbGltaXRlcicsICcnLCAncmVnZXhwJ11dLFxuICAgICAgICAgICAgWy8oXFw/KShcXHMqKShAcmVnRXgpLywgWydkZWxpbWl0ZXInLCAnJywgJ3JlZ2V4cCddXSxcbiAgICAgICAgICAgIFsvKFxceykoXFxzKikoQHJlZ0V4KS8sIFsnQGJyYWNrZXRzJywgJycsICdyZWdleHAnXV0sXG4gICAgICAgICAgICBbLyhcXDspKFxccyopKEByZWdFeCkvLCBbJycsICcnLCAncmVnZXhwJ11dLFxuICAgICAgICAgICAgLy8gZGVsaW1pdGVyc1xuICAgICAgICAgICAgWy99Lywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyRTMj09aW50ZXJwb2xhdGVkc3RyaW5nJzogeyB0b2tlbjogJ3N0cmluZycsIG5leHQ6ICdAcG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ0BicmFja2V0cydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy9be30oKVxcW1xcXV0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL0BzeW1ib2xzLywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgLy8gbnVtYmVyc1xuICAgICAgICAgICAgWy9cXGQrW2VFXShbXFwtK10/XFxkKyk/LywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy9cXGQrXFwuXFxkKyhbZUVdW1xcLStdP1xcZCspPy8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvMFt4WF1bMC05YS1mQS1GXSsvLCAnbnVtYmVyLmhleCddLFxuICAgICAgICAgICAgWy8wWzAtN10rKD8hXFxkKS8sICdudW1iZXIub2N0YWwnXSxcbiAgICAgICAgICAgIFsvXFxkKy8sICdudW1iZXInXSxcbiAgICAgICAgICAgIC8vIGRlbGltaXRlcjogYWZ0ZXIgbnVtYmVyIGJlY2F1c2Ugb2YgLlxcZCBmbG9hdHNcbiAgICAgICAgICAgIFsvWywuXS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIC8vIHN0cmluZ3M6XG4gICAgICAgICAgICBbL1wiXCJcIi8sICdzdHJpbmcnLCAnQGhlcmVzdHJpbmcuXCJcIlwiJ10sXG4gICAgICAgICAgICBbLycnJy8sICdzdHJpbmcnLCAnQGhlcmVzdHJpbmcuXFwnXFwnXFwnJ10sXG4gICAgICAgICAgICBbL1wiLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6IHsgdG9rZW46ICdzdHJpbmcnLCBuZXh0OiAnQHN0cmluZy5cIicgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbLycvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGVvcyc6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogeyB0b2tlbjogJ3N0cmluZycsIG5leHQ6ICdAc3RyaW5nLlxcJycgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZzogW1xuICAgICAgICAgICAgWy9bXlwiJ1xcI1xcXFxdKy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvQGVzY2FwZXMvLCAnc3RyaW5nLmVzY2FwZSddLFxuICAgICAgICAgICAgWy9cXC4vLCAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1xcLi8sICdzdHJpbmcuZXNjYXBlLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvI3svLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnJFMyPT1cIic6IHsgdG9rZW46ICdzdHJpbmcnLCBuZXh0OiAncm9vdC5pbnRlcnBvbGF0ZWRzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbL1tcIiddLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQjPT0kUzInOiB7IHRva2VuOiAnc3RyaW5nJywgbmV4dDogJ0Bwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbLyMvLCAnc3RyaW5nJ11cbiAgICAgICAgXSxcbiAgICAgICAgaGVyZXN0cmluZzogW1xuICAgICAgICAgICAgWy8oXCJcIlwifCcnJykvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnJDE9PSRTMic6IHsgdG9rZW46ICdzdHJpbmcnLCBuZXh0OiAnQHBvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFsvW14jXFxcXCdcIl0rLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9bJ1wiXSsvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZy5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvXFwuLywgJ3N0cmluZy5lc2NhcGUuaW52YWxpZCddLFxuICAgICAgICAgICAgWy8jey8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBuZXh0OiAncm9vdC5pbnRlcnBvbGF0ZWRzdHJpbmcnIH1dLFxuICAgICAgICAgICAgWy8jLywgJ3N0cmluZyddXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW14jXSsvLCAnY29tbWVudCcsXSxcbiAgICAgICAgICAgIFsvIyMjLywgJ2NvbW1lbnQnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy8jLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgXSxcbiAgICAgICAgaGVyZXJlZ2V4cDogW1xuICAgICAgICAgICAgWy9bXlxcXFxcXC8jXSsvLCAncmVnZXhwJ10sXG4gICAgICAgICAgICBbL1xcXFwuLywgJ3JlZ2V4cCddLFxuICAgICAgICAgICAgWy8jLiokLywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIFsnLy8vW2lnbV0qJywgeyB0b2tlbjogJ3JlZ2V4cCcsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvXFwvLywgJ3JlZ2V4cCddLFxuICAgICAgICBdLFxuICAgIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/monaco-editor/esm/vs/basic-languages/coffee/coffee.js\n");

/***/ })

}]);