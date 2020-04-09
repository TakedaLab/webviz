(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[39],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/razor/razor.js":
/*!**************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/razor/razor.js ***!
  \**************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\n// Allow for running under nodejs/requirejs in tests\nvar _monaco = (typeof monaco === 'undefined' ? self.monaco : monaco);\nvar EMPTY_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];\nvar conf = {\n    wordPattern: /(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\$\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\/\\s]+)/g,\n    comments: {\n        blockComment: ['<!--', '-->']\n    },\n    brackets: [\n        ['<!--', '-->'],\n        ['<', '>'],\n        ['{', '}'],\n        ['(', ')']\n    ],\n    autoClosingPairs: [\n        { open: '{', close: '}' },\n        { open: '[', close: ']' },\n        { open: '(', close: ')' },\n        { open: '\"', close: '\"' },\n        { open: '\\'', close: '\\'' }\n    ],\n    surroundingPairs: [\n        { open: '\"', close: '\"' },\n        { open: '\\'', close: '\\'' },\n        { open: '<', close: '>' }\n    ],\n    onEnterRules: [\n        {\n            beforeText: new RegExp(\"<(?!(?:\" + EMPTY_ELEMENTS.join('|') + \"))(\\\\w[\\\\w\\\\d]*)([^/>]*(?!/)>)[^<]*$\", 'i'),\n            afterText: /^<\\/(\\w[\\w\\d]*)\\s*>$/i,\n            action: { indentAction: _monaco.languages.IndentAction.IndentOutdent }\n        },\n        {\n            beforeText: new RegExp(\"<(?!(?:\" + EMPTY_ELEMENTS.join('|') + \"))(\\\\w[\\\\w\\\\d]*)([^/>]*(?!/)>)[^<]*$\", 'i'),\n            action: { indentAction: _monaco.languages.IndentAction.Indent }\n        }\n    ],\n};\nvar language = {\n    defaultToken: '',\n    tokenPostfix: '',\n    // ignoreCase: true,\n    // The main tokenizer for our languages\n    tokenizer: {\n        root: [\n            [/@@/],\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.root' }],\n            [/<!DOCTYPE/, 'metatag.html', '@doctype'],\n            [/<!--/, 'comment.html', '@comment'],\n            [/(<)(\\w+)(\\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\n            [/(<)(script)/, ['delimiter.html', { token: 'tag.html', next: '@script' }]],\n            [/(<)(style)/, ['delimiter.html', { token: 'tag.html', next: '@style' }]],\n            [/(<)([:\\w]+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],\n            [/(<\\/)(\\w+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],\n            [/</, 'delimiter.html'],\n            [/[ \\t\\r\\n]+/],\n            [/[^<@]+/],\n        ],\n        doctype: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.comment' }],\n            [/[^>]+/, 'metatag.content.html'],\n            [/>/, 'metatag.html', '@pop'],\n        ],\n        comment: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.comment' }],\n            [/-->/, 'comment.html', '@pop'],\n            [/[^-]+/, 'comment.content.html'],\n            [/./, 'comment.content.html']\n        ],\n        otherTag: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.otherTag' }],\n            [/\\/?>/, 'delimiter.html', '@pop'],\n            [/\"([^\"]*)\"/, 'attribute.value'],\n            [/'([^']*)'/, 'attribute.value'],\n            [/[\\w\\-]+/, 'attribute.name'],\n            [/=/, 'delimiter'],\n            [/[ \\t\\r\\n]+/],\n        ],\n        // -- BEGIN <script> tags handling\n        // After <script\n        script: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.script' }],\n            [/type/, 'attribute.name', '@scriptAfterType'],\n            [/\"([^\"]*)\"/, 'attribute.value'],\n            [/'([^']*)'/, 'attribute.value'],\n            [/[\\w\\-]+/, 'attribute.name'],\n            [/=/, 'delimiter'],\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\n            [/[ \\t\\r\\n]+/],\n            [/(<\\/)(script\\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]\n        ],\n        // After <script ... type\n        scriptAfterType: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.scriptAfterType' }],\n            [/=/, 'delimiter', '@scriptAfterTypeEquals'],\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        // After <script ... type =\n        scriptAfterTypeEquals: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.scriptAfterTypeEquals' }],\n            [/\"([^\"]*)\"/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],\n            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        // After <script ... type = $S2\n        scriptWithCustomType: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.scriptWithCustomType.$S2' }],\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.$S2', nextEmbedded: '$S2' }],\n            [/\"([^\"]*)\"/, 'attribute.value'],\n            [/'([^']*)'/, 'attribute.value'],\n            [/[\\w\\-]+/, 'attribute.name'],\n            [/=/, 'delimiter'],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        scriptEmbedded: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInEmbeddedState.scriptEmbedded.$S2', nextEmbedded: '@pop' }],\n            [/<\\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]\n        ],\n        // -- END <script> tags handling\n        // -- BEGIN <style> tags handling\n        // After <style\n        style: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.style' }],\n            [/type/, 'attribute.name', '@styleAfterType'],\n            [/\"([^\"]*)\"/, 'attribute.value'],\n            [/'([^']*)'/, 'attribute.value'],\n            [/[\\w\\-]+/, 'attribute.name'],\n            [/=/, 'delimiter'],\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\n            [/[ \\t\\r\\n]+/],\n            [/(<\\/)(style\\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]\n        ],\n        // After <style ... type\n        styleAfterType: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.styleAfterType' }],\n            [/=/, 'delimiter', '@styleAfterTypeEquals'],\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        // After <style ... type =\n        styleAfterTypeEquals: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.styleAfterTypeEquals' }],\n            [/\"([^\"]*)\"/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],\n            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        // After <style ... type = $S2\n        styleWithCustomType: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.styleWithCustomType.$S2' }],\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.$S2', nextEmbedded: '$S2' }],\n            [/\"([^\"]*)\"/, 'attribute.value'],\n            [/'([^']*)'/, 'attribute.value'],\n            [/[\\w\\-]+/, 'attribute.name'],\n            [/=/, 'delimiter'],\n            [/[ \\t\\r\\n]+/],\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\n        ],\n        styleEmbedded: [\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInEmbeddedState.styleEmbedded.$S2', nextEmbedded: '@pop' }],\n            [/<\\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]\n        ],\n        // -- END <style> tags handling\n        razorInSimpleState: [\n            [/@\\*/, 'comment.cs', '@razorBlockCommentTopLevel'],\n            [/@[{(]/, 'metatag.cs', '@razorRootTopLevel'],\n            [/(@)(\\s*[\\w]+)/, ['metatag.cs', { token: 'identifier.cs', switchTo: '@$S2.$S3' }]],\n            [/[})]/, { token: 'metatag.cs', switchTo: '@$S2.$S3' }],\n            [/\\*@/, { token: 'comment.cs', switchTo: '@$S2.$S3' }],\n        ],\n        razorInEmbeddedState: [\n            [/@\\*/, 'comment.cs', '@razorBlockCommentTopLevel'],\n            [/@[{(]/, 'metatag.cs', '@razorRootTopLevel'],\n            [/(@)(\\s*[\\w]+)/, ['metatag.cs', { token: 'identifier.cs', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }]],\n            [/[})]/, { token: 'metatag.cs', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],\n            [/\\*@/, { token: 'comment.cs', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],\n        ],\n        razorBlockCommentTopLevel: [\n            [/\\*@/, '@rematch', '@pop'],\n            [/[^*]+/, 'comment.cs'],\n            [/./, 'comment.cs']\n        ],\n        razorBlockComment: [\n            [/\\*@/, 'comment.cs', '@pop'],\n            [/[^*]+/, 'comment.cs'],\n            [/./, 'comment.cs']\n        ],\n        razorRootTopLevel: [\n            [/\\{/, 'delimiter.bracket.cs', '@razorRoot'],\n            [/\\(/, 'delimiter.parenthesis.cs', '@razorRoot'],\n            [/[})]/, '@rematch', '@pop'],\n            { include: 'razorCommon' }\n        ],\n        razorRoot: [\n            [/\\{/, 'delimiter.bracket.cs', '@razorRoot'],\n            [/\\(/, 'delimiter.parenthesis.cs', '@razorRoot'],\n            [/\\}/, 'delimiter.bracket.cs', '@pop'],\n            [/\\)/, 'delimiter.parenthesis.cs', '@pop'],\n            { include: 'razorCommon' }\n        ],\n        razorCommon: [\n            [/[a-zA-Z_]\\w*/, {\n                    cases: {\n                        '@razorKeywords': { token: 'keyword.cs' },\n                        '@default': 'identifier.cs'\n                    }\n                }],\n            // brackets\n            [/[\\[\\]]/, 'delimiter.array.cs'],\n            // whitespace\n            [/[ \\t\\r\\n]+/],\n            // comments\n            [/\\/\\/.*$/, 'comment.cs'],\n            [/@\\*/, 'comment.cs', '@razorBlockComment'],\n            // strings\n            [/\"([^\"]*)\"/, 'string.cs'],\n            [/'([^']*)'/, 'string.cs'],\n            // simple html\n            [/(<)(\\w+)(\\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\n            [/(<)(\\w+)(>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\n            [/(<\\/)(\\w+)(>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\n            // delimiters\n            [/[\\+\\-\\*\\%\\&\\|\\^\\~\\!\\=\\<\\>\\/\\?\\;\\:\\.\\,]/, 'delimiter.cs'],\n            // numbers\n            [/\\d*\\d+[eE]([\\-+]?\\d+)?/, 'number.float.cs'],\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float.cs'],\n            [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, 'number.hex.cs'],\n            [/0[0-7']*[0-7]/, 'number.octal.cs'],\n            [/0[bB][0-1']*[0-1]/, 'number.binary.cs'],\n            [/\\d[\\d']*/, 'number.cs'],\n            [/\\d/, 'number.cs'],\n        ]\n    },\n    razorKeywords: [\n        'abstract', 'as', 'async', 'await', 'base', 'bool',\n        'break', 'by', 'byte', 'case',\n        'catch', 'char', 'checked', 'class',\n        'const', 'continue', 'decimal', 'default',\n        'delegate', 'do', 'double', 'descending',\n        'explicit', 'event', 'extern', 'else',\n        'enum', 'false', 'finally', 'fixed',\n        'float', 'for', 'foreach', 'from',\n        'goto', 'group', 'if', 'implicit',\n        'in', 'int', 'interface', 'internal',\n        'into', 'is', 'lock', 'long', 'nameof',\n        'new', 'null', 'namespace', 'object',\n        'operator', 'out', 'override', 'orderby',\n        'params', 'private', 'protected', 'public',\n        'readonly', 'ref', 'return', 'switch',\n        'struct', 'sbyte', 'sealed', 'short',\n        'sizeof', 'stackalloc', 'static', 'string',\n        'select', 'this', 'throw', 'true',\n        'try', 'typeof', 'uint', 'ulong',\n        'unchecked', 'unsafe', 'ushort', 'using',\n        'var', 'virtual', 'volatile', 'void', 'when',\n        'while', 'where', 'yield',\n        'model', 'inject' // Razor specific\n    ],\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3Jhem9yL3Jhem9yLmpzLmpzIiwic291cmNlcyI6WyIvZ2l0cy93ZWJ2aXovaGRsLWRldi93ZWJ2aXovbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9yYXpvci9yYXpvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0Jztcbi8vIEFsbG93IGZvciBydW5uaW5nIHVuZGVyIG5vZGVqcy9yZXF1aXJlanMgaW4gdGVzdHNcbnZhciBfbW9uYWNvID0gKHR5cGVvZiBtb25hY28gPT09ICd1bmRlZmluZWQnID8gc2VsZi5tb25hY28gOiBtb25hY28pO1xudmFyIEVNUFRZX0VMRU1FTlRTID0gWydhcmVhJywgJ2Jhc2UnLCAnYnInLCAnY29sJywgJ2VtYmVkJywgJ2hyJywgJ2ltZycsICdpbnB1dCcsICdrZXlnZW4nLCAnbGluaycsICdtZW51aXRlbScsICdtZXRhJywgJ3BhcmFtJywgJ3NvdXJjZScsICd0cmFjaycsICd3YnInXTtcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICB3b3JkUGF0dGVybjogLygtP1xcZCpcXC5cXGRcXHcqKXwoW15cXGBcXH5cXCFcXEBcXCRcXF5cXCZcXCpcXChcXClcXC1cXD1cXCtcXFtcXHtcXF1cXH1cXFxcXFx8XFw7XFw6XFwnXFxcIlxcLFxcLlxcPFxcPlxcL1xcc10rKS9nLFxuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGJsb2NrQ29tbWVudDogWyc8IS0tJywgJy0tPiddXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJzwhLS0nLCAnLS0+J10sXG4gICAgICAgIFsnPCcsICc+J10sXG4gICAgICAgIFsneycsICd9J10sXG4gICAgICAgIFsnKCcsICcpJ11cbiAgICBdLFxuICAgIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46ICdcXCcnLCBjbG9zZTogJ1xcJycgfVxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgICAgICB7IG9wZW46ICc8JywgY2xvc2U6ICc+JyB9XG4gICAgXSxcbiAgICBvbkVudGVyUnVsZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgYmVmb3JlVGV4dDogbmV3IFJlZ0V4cChcIjwoPyEoPzpcIiArIEVNUFRZX0VMRU1FTlRTLmpvaW4oJ3wnKSArIFwiKSkoXFxcXHdbXFxcXHdcXFxcZF0qKShbXi8+XSooPyEvKT4pW148XSokXCIsICdpJyksXG4gICAgICAgICAgICBhZnRlclRleHQ6IC9ePFxcLyhcXHdbXFx3XFxkXSopXFxzKj4kL2ksXG4gICAgICAgICAgICBhY3Rpb246IHsgaW5kZW50QWN0aW9uOiBfbW9uYWNvLmxhbmd1YWdlcy5JbmRlbnRBY3Rpb24uSW5kZW50T3V0ZGVudCB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJlZm9yZVRleHQ6IG5ldyBSZWdFeHAoXCI8KD8hKD86XCIgKyBFTVBUWV9FTEVNRU5UUy5qb2luKCd8JykgKyBcIikpKFxcXFx3W1xcXFx3XFxcXGRdKikoW14vPl0qKD8hLyk+KVtePF0qJFwiLCAnaScpLFxuICAgICAgICAgICAgYWN0aW9uOiB7IGluZGVudEFjdGlvbjogX21vbmFjby5sYW5ndWFnZXMuSW5kZW50QWN0aW9uLkluZGVudCB9XG4gICAgICAgIH1cbiAgICBdLFxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcnLFxuICAgIC8vIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgLy8gVGhlIG1haW4gdG9rZW5pemVyIGZvciBvdXIgbGFuZ3VhZ2VzXG4gICAgdG9rZW5pemVyOiB7XG4gICAgICAgIHJvb3Q6IFtcbiAgICAgICAgICAgIFsvQEAvXSxcbiAgICAgICAgICAgIFsvQFteQF0vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0ByYXpvckluU2ltcGxlU3RhdGUucm9vdCcgfV0sXG4gICAgICAgICAgICBbLzwhRE9DVFlQRS8sICdtZXRhdGFnLmh0bWwnLCAnQGRvY3R5cGUnXSxcbiAgICAgICAgICAgIFsvPCEtLS8sICdjb21tZW50Lmh0bWwnLCAnQGNvbW1lbnQnXSxcbiAgICAgICAgICAgIFsvKDwpKFxcdyspKFxcLz4pLywgWydkZWxpbWl0ZXIuaHRtbCcsICd0YWcuaHRtbCcsICdkZWxpbWl0ZXIuaHRtbCddXSxcbiAgICAgICAgICAgIFsvKDwpKHNjcmlwdCkvLCBbJ2RlbGltaXRlci5odG1sJywgeyB0b2tlbjogJ3RhZy5odG1sJywgbmV4dDogJ0BzY3JpcHQnIH1dXSxcbiAgICAgICAgICAgIFsvKDwpKHN0eWxlKS8sIFsnZGVsaW1pdGVyLmh0bWwnLCB7IHRva2VuOiAndGFnLmh0bWwnLCBuZXh0OiAnQHN0eWxlJyB9XV0sXG4gICAgICAgICAgICBbLyg8KShbOlxcd10rKS8sIFsnZGVsaW1pdGVyLmh0bWwnLCB7IHRva2VuOiAndGFnLmh0bWwnLCBuZXh0OiAnQG90aGVyVGFnJyB9XV0sXG4gICAgICAgICAgICBbLyg8XFwvKShcXHcrKS8sIFsnZGVsaW1pdGVyLmh0bWwnLCB7IHRva2VuOiAndGFnLmh0bWwnLCBuZXh0OiAnQG90aGVyVGFnJyB9XV0sXG4gICAgICAgICAgICBbLzwvLCAnZGVsaW1pdGVyLmh0bWwnXSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICAgICAgWy9bXjxAXSsvXSxcbiAgICAgICAgXSxcbiAgICAgICAgZG9jdHlwZTogW1xuICAgICAgICAgICAgWy9AW15AXS8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHJhem9ySW5TaW1wbGVTdGF0ZS5jb21tZW50JyB9XSxcbiAgICAgICAgICAgIFsvW14+XSsvLCAnbWV0YXRhZy5jb250ZW50Lmh0bWwnXSxcbiAgICAgICAgICAgIFsvPi8sICdtZXRhdGFnLmh0bWwnLCAnQHBvcCddLFxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJblNpbXBsZVN0YXRlLmNvbW1lbnQnIH1dLFxuICAgICAgICAgICAgWy8tLT4vLCAnY29tbWVudC5odG1sJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW14tXSsvLCAnY29tbWVudC5jb250ZW50Lmh0bWwnXSxcbiAgICAgICAgICAgIFsvLi8sICdjb21tZW50LmNvbnRlbnQuaHRtbCddXG4gICAgICAgIF0sXG4gICAgICAgIG90aGVyVGFnOiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJblNpbXBsZVN0YXRlLm90aGVyVGFnJyB9XSxcbiAgICAgICAgICAgIFsvXFwvPz4vLCAnZGVsaW1pdGVyLmh0bWwnLCAnQHBvcCddLFxuICAgICAgICAgICAgWy9cIihbXlwiXSopXCIvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbLycoW14nXSopJy8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvW1xcd1xcLV0rLywgJ2F0dHJpYnV0ZS5uYW1lJ10sXG4gICAgICAgICAgICBbLz0vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgXSxcbiAgICAgICAgLy8gLS0gQkVHSU4gPHNjcmlwdD4gdGFncyBoYW5kbGluZ1xuICAgICAgICAvLyBBZnRlciA8c2NyaXB0XG4gICAgICAgIHNjcmlwdDogW1xuICAgICAgICAgICAgWy9AW15AXS8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHJhem9ySW5TaW1wbGVTdGF0ZS5zY3JpcHQnIH1dLFxuICAgICAgICAgICAgWy90eXBlLywgJ2F0dHJpYnV0ZS5uYW1lJywgJ0BzY3JpcHRBZnRlclR5cGUnXSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCAnYXR0cmlidXRlLnZhbHVlJ10sXG4gICAgICAgICAgICBbL1tcXHdcXC1dKy8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy89LywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0BzY3JpcHRFbWJlZGRlZC50ZXh0L2phdmFzY3JpcHQnLCBuZXh0RW1iZWRkZWQ6ICd0ZXh0L2phdmFzY3JpcHQnIH1dLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLyg8XFwvKShzY3JpcHRcXHMqKSg+KS8sIFsnZGVsaW1pdGVyLmh0bWwnLCAndGFnLmh0bWwnLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHBvcCcgfV1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFmdGVyIDxzY3JpcHQgLi4uIHR5cGVcbiAgICAgICAgc2NyaXB0QWZ0ZXJUeXBlOiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJblNpbXBsZVN0YXRlLnNjcmlwdEFmdGVyVHlwZScgfV0sXG4gICAgICAgICAgICBbLz0vLCAnZGVsaW1pdGVyJywgJ0BzY3JpcHRBZnRlclR5cGVFcXVhbHMnXSxcbiAgICAgICAgICAgIFsvPi8sIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAc2NyaXB0RW1iZWRkZWQudGV4dC9qYXZhc2NyaXB0JywgbmV4dEVtYmVkZGVkOiAndGV4dC9qYXZhc2NyaXB0JyB9XSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICAgICAgWy88XFwvc2NyaXB0XFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHNjcmlwdCAuLi4gdHlwZSA9XG4gICAgICAgIHNjcmlwdEFmdGVyVHlwZUVxdWFsczogW1xuICAgICAgICAgICAgWy9AW15AXS8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHJhem9ySW5TaW1wbGVTdGF0ZS5zY3JpcHRBZnRlclR5cGVFcXVhbHMnIH1dLFxuICAgICAgICAgICAgWy9cIihbXlwiXSopXCIvLCB7IHRva2VuOiAnYXR0cmlidXRlLnZhbHVlJywgc3dpdGNoVG86ICdAc2NyaXB0V2l0aEN1c3RvbVR5cGUuJDEnIH1dLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCB7IHRva2VuOiAnYXR0cmlidXRlLnZhbHVlJywgc3dpdGNoVG86ICdAc2NyaXB0V2l0aEN1c3RvbVR5cGUuJDEnIH1dLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0BzY3JpcHRFbWJlZGRlZC50ZXh0L2phdmFzY3JpcHQnLCBuZXh0RW1iZWRkZWQ6ICd0ZXh0L2phdmFzY3JpcHQnIH1dLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLzxcXC9zY3JpcHRcXHMqPi8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyBBZnRlciA8c2NyaXB0IC4uLiB0eXBlID0gJFMyXG4gICAgICAgIHNjcmlwdFdpdGhDdXN0b21UeXBlOiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJblNpbXBsZVN0YXRlLnNjcmlwdFdpdGhDdXN0b21UeXBlLiRTMicgfV0sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHNjcmlwdEVtYmVkZGVkLiRTMicsIG5leHRFbWJlZGRlZDogJyRTMicgfV0sXG4gICAgICAgICAgICBbL1wiKFteXCJdKilcIi8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvJyhbXiddKiknLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy9bXFx3XFwtXSsvLCAnYXR0cmlidXRlLm5hbWUnXSxcbiAgICAgICAgICAgIFsvPS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICAgICAgWy88XFwvc2NyaXB0XFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgc2NyaXB0RW1iZWRkZWQ6IFtcbiAgICAgICAgICAgIFsvQFteQF0vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0ByYXpvckluRW1iZWRkZWRTdGF0ZS5zY3JpcHRFbWJlZGRlZC4kUzInLCBuZXh0RW1iZWRkZWQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvPFxcL3NjcmlwdC8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wJywgbmV4dEVtYmVkZGVkOiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gLS0gRU5EIDxzY3JpcHQ+IHRhZ3MgaGFuZGxpbmdcbiAgICAgICAgLy8gLS0gQkVHSU4gPHN0eWxlPiB0YWdzIGhhbmRsaW5nXG4gICAgICAgIC8vIEFmdGVyIDxzdHlsZVxuICAgICAgICBzdHlsZTogW1xuICAgICAgICAgICAgWy9AW15AXS8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHJhem9ySW5TaW1wbGVTdGF0ZS5zdHlsZScgfV0sXG4gICAgICAgICAgICBbL3R5cGUvLCAnYXR0cmlidXRlLm5hbWUnLCAnQHN0eWxlQWZ0ZXJUeXBlJ10sXG4gICAgICAgICAgICBbL1wiKFteXCJdKilcIi8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvJyhbXiddKiknLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy9bXFx3XFwtXSsvLCAnYXR0cmlidXRlLm5hbWUnXSxcbiAgICAgICAgICAgIFsvPS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsvPi8sIHsgdG9rZW46ICdkZWxpbWl0ZXIuaHRtbCcsIG5leHQ6ICdAc3R5bGVFbWJlZGRlZC50ZXh0L2NzcycsIG5leHRFbWJlZGRlZDogJ3RleHQvY3NzJyB9XSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICAgICAgWy8oPFxcLykoc3R5bGVcXHMqKSg+KS8sIFsnZGVsaW1pdGVyLmh0bWwnLCAndGFnLmh0bWwnLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHBvcCcgfV1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFmdGVyIDxzdHlsZSAuLi4gdHlwZVxuICAgICAgICBzdHlsZUFmdGVyVHlwZTogW1xuICAgICAgICAgICAgWy9AW15AXS8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIHN3aXRjaFRvOiAnQHJhem9ySW5TaW1wbGVTdGF0ZS5zdHlsZUFmdGVyVHlwZScgfV0sXG4gICAgICAgICAgICBbLz0vLCAnZGVsaW1pdGVyJywgJ0BzdHlsZUFmdGVyVHlwZUVxdWFscyddLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0BzdHlsZUVtYmVkZGVkLnRleHQvY3NzJywgbmV4dEVtYmVkZGVkOiAndGV4dC9jc3MnIH1dLFxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICBbLzxcXC9zdHlsZVxccyo+LywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFmdGVyIDxzdHlsZSAuLi4gdHlwZSA9XG4gICAgICAgIHN0eWxlQWZ0ZXJUeXBlRXF1YWxzOiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJblNpbXBsZVN0YXRlLnN0eWxlQWZ0ZXJUeXBlRXF1YWxzJyB9XSxcbiAgICAgICAgICAgIFsvXCIoW15cIl0qKVwiLywgeyB0b2tlbjogJ2F0dHJpYnV0ZS52YWx1ZScsIHN3aXRjaFRvOiAnQHN0eWxlV2l0aEN1c3RvbVR5cGUuJDEnIH1dLFxuICAgICAgICAgICAgWy8nKFteJ10qKScvLCB7IHRva2VuOiAnYXR0cmlidXRlLnZhbHVlJywgc3dpdGNoVG86ICdAc3R5bGVXaXRoQ3VzdG9tVHlwZS4kMScgfV0sXG4gICAgICAgICAgICBbLz4vLCB7IHRva2VuOiAnZGVsaW1pdGVyLmh0bWwnLCBuZXh0OiAnQHN0eWxlRW1iZWRkZWQudGV4dC9jc3MnLCBuZXh0RW1iZWRkZWQ6ICd0ZXh0L2NzcycgfV0sXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvXSxcbiAgICAgICAgICAgIFsvPFxcL3N0eWxlXFxzKj4vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQWZ0ZXIgPHN0eWxlIC4uLiB0eXBlID0gJFMyXG4gICAgICAgIHN0eWxlV2l0aEN1c3RvbVR5cGU6IFtcbiAgICAgICAgICAgIFsvQFteQF0vLCB7IHRva2VuOiAnQHJlbWF0Y2gnLCBzd2l0Y2hUbzogJ0ByYXpvckluU2ltcGxlU3RhdGUuc3R5bGVXaXRoQ3VzdG9tVHlwZS4kUzInIH1dLFxuICAgICAgICAgICAgWy8+LywgeyB0b2tlbjogJ2RlbGltaXRlci5odG1sJywgbmV4dDogJ0BzdHlsZUVtYmVkZGVkLiRTMicsIG5leHRFbWJlZGRlZDogJyRTMicgfV0sXG4gICAgICAgICAgICBbL1wiKFteXCJdKilcIi8sICdhdHRyaWJ1dGUudmFsdWUnXSxcbiAgICAgICAgICAgIFsvJyhbXiddKiknLywgJ2F0dHJpYnV0ZS52YWx1ZSddLFxuICAgICAgICAgICAgWy9bXFx3XFwtXSsvLCAnYXR0cmlidXRlLm5hbWUnXSxcbiAgICAgICAgICAgIFsvPS8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy9dLFxuICAgICAgICAgICAgWy88XFwvc3R5bGVcXHMqPi8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICBzdHlsZUVtYmVkZGVkOiBbXG4gICAgICAgICAgICBbL0BbXkBdLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgc3dpdGNoVG86ICdAcmF6b3JJbkVtYmVkZGVkU3RhdGUuc3R5bGVFbWJlZGRlZC4kUzInLCBuZXh0RW1iZWRkZWQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvPFxcL3N0eWxlLywgeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3AnLCBuZXh0RW1iZWRkZWQ6ICdAcG9wJyB9XVxuICAgICAgICBdLFxuICAgICAgICAvLyAtLSBFTkQgPHN0eWxlPiB0YWdzIGhhbmRsaW5nXG4gICAgICAgIHJhem9ySW5TaW1wbGVTdGF0ZTogW1xuICAgICAgICAgICAgWy9AXFwqLywgJ2NvbW1lbnQuY3MnLCAnQHJhem9yQmxvY2tDb21tZW50VG9wTGV2ZWwnXSxcbiAgICAgICAgICAgIFsvQFt7KF0vLCAnbWV0YXRhZy5jcycsICdAcmF6b3JSb290VG9wTGV2ZWwnXSxcbiAgICAgICAgICAgIFsvKEApKFxccypbXFx3XSspLywgWydtZXRhdGFnLmNzJywgeyB0b2tlbjogJ2lkZW50aWZpZXIuY3MnLCBzd2l0Y2hUbzogJ0AkUzIuJFMzJyB9XV0sXG4gICAgICAgICAgICBbL1t9KV0vLCB7IHRva2VuOiAnbWV0YXRhZy5jcycsIHN3aXRjaFRvOiAnQCRTMi4kUzMnIH1dLFxuICAgICAgICAgICAgWy9cXCpALywgeyB0b2tlbjogJ2NvbW1lbnQuY3MnLCBzd2l0Y2hUbzogJ0AkUzIuJFMzJyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgcmF6b3JJbkVtYmVkZGVkU3RhdGU6IFtcbiAgICAgICAgICAgIFsvQFxcKi8sICdjb21tZW50LmNzJywgJ0ByYXpvckJsb2NrQ29tbWVudFRvcExldmVsJ10sXG4gICAgICAgICAgICBbL0BbeyhdLywgJ21ldGF0YWcuY3MnLCAnQHJhem9yUm9vdFRvcExldmVsJ10sXG4gICAgICAgICAgICBbLyhAKShcXHMqW1xcd10rKS8sIFsnbWV0YXRhZy5jcycsIHsgdG9rZW46ICdpZGVudGlmaWVyLmNzJywgc3dpdGNoVG86ICdAJFMyLiRTMycsIG5leHRFbWJlZGRlZDogJyRTMycgfV1dLFxuICAgICAgICAgICAgWy9bfSldLywgeyB0b2tlbjogJ21ldGF0YWcuY3MnLCBzd2l0Y2hUbzogJ0AkUzIuJFMzJywgbmV4dEVtYmVkZGVkOiAnJFMzJyB9XSxcbiAgICAgICAgICAgIFsvXFwqQC8sIHsgdG9rZW46ICdjb21tZW50LmNzJywgc3dpdGNoVG86ICdAJFMyLiRTMycsIG5leHRFbWJlZGRlZDogJyRTMycgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIHJhem9yQmxvY2tDb21tZW50VG9wTGV2ZWw6IFtcbiAgICAgICAgICAgIFsvXFwqQC8sICdAcmVtYXRjaCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1teKl0rLywgJ2NvbW1lbnQuY3MnXSxcbiAgICAgICAgICAgIFsvLi8sICdjb21tZW50LmNzJ11cbiAgICAgICAgXSxcbiAgICAgICAgcmF6b3JCbG9ja0NvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvXFwqQC8sICdjb21tZW50LmNzJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW14qXSsvLCAnY29tbWVudC5jcyddLFxuICAgICAgICAgICAgWy8uLywgJ2NvbW1lbnQuY3MnXVxuICAgICAgICBdLFxuICAgICAgICByYXpvclJvb3RUb3BMZXZlbDogW1xuICAgICAgICAgICAgWy9cXHsvLCAnZGVsaW1pdGVyLmJyYWNrZXQuY3MnLCAnQHJhem9yUm9vdCddLFxuICAgICAgICAgICAgWy9cXCgvLCAnZGVsaW1pdGVyLnBhcmVudGhlc2lzLmNzJywgJ0ByYXpvclJvb3QnXSxcbiAgICAgICAgICAgIFsvW30pXS8sICdAcmVtYXRjaCcsICdAcG9wJ10sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdyYXpvckNvbW1vbicgfVxuICAgICAgICBdLFxuICAgICAgICByYXpvclJvb3Q6IFtcbiAgICAgICAgICAgIFsvXFx7LywgJ2RlbGltaXRlci5icmFja2V0LmNzJywgJ0ByYXpvclJvb3QnXSxcbiAgICAgICAgICAgIFsvXFwoLywgJ2RlbGltaXRlci5wYXJlbnRoZXNpcy5jcycsICdAcmF6b3JSb290J10sXG4gICAgICAgICAgICBbL1xcfS8sICdkZWxpbWl0ZXIuYnJhY2tldC5jcycsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1xcKS8sICdkZWxpbWl0ZXIucGFyZW50aGVzaXMuY3MnLCAnQHBvcCddLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAncmF6b3JDb21tb24nIH1cbiAgICAgICAgXSxcbiAgICAgICAgcmF6b3JDb21tb246IFtcbiAgICAgICAgICAgIFsvW2EtekEtWl9dXFx3Ki8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAcmF6b3JLZXl3b3Jkcyc6IHsgdG9rZW46ICdrZXl3b3JkLmNzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ2lkZW50aWZpZXIuY3MnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIC8vIGJyYWNrZXRzXG4gICAgICAgICAgICBbL1tcXFtcXF1dLywgJ2RlbGltaXRlci5hcnJheS5jcyddLFxuICAgICAgICAgICAgLy8gd2hpdGVzcGFjZVxuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rL10sXG4gICAgICAgICAgICAvLyBjb21tZW50c1xuICAgICAgICAgICAgWy9cXC9cXC8uKiQvLCAnY29tbWVudC5jcyddLFxuICAgICAgICAgICAgWy9AXFwqLywgJ2NvbW1lbnQuY3MnLCAnQHJhem9yQmxvY2tDb21tZW50J10sXG4gICAgICAgICAgICAvLyBzdHJpbmdzXG4gICAgICAgICAgICBbL1wiKFteXCJdKilcIi8sICdzdHJpbmcuY3MnXSxcbiAgICAgICAgICAgIFsvJyhbXiddKiknLywgJ3N0cmluZy5jcyddLFxuICAgICAgICAgICAgLy8gc2ltcGxlIGh0bWxcbiAgICAgICAgICAgIFsvKDwpKFxcdyspKFxcLz4pLywgWydkZWxpbWl0ZXIuaHRtbCcsICd0YWcuaHRtbCcsICdkZWxpbWl0ZXIuaHRtbCddXSxcbiAgICAgICAgICAgIFsvKDwpKFxcdyspKD4pLywgWydkZWxpbWl0ZXIuaHRtbCcsICd0YWcuaHRtbCcsICdkZWxpbWl0ZXIuaHRtbCddXSxcbiAgICAgICAgICAgIFsvKDxcXC8pKFxcdyspKD4pLywgWydkZWxpbWl0ZXIuaHRtbCcsICd0YWcuaHRtbCcsICdkZWxpbWl0ZXIuaHRtbCddXSxcbiAgICAgICAgICAgIC8vIGRlbGltaXRlcnNcbiAgICAgICAgICAgIFsvW1xcK1xcLVxcKlxcJVxcJlxcfFxcXlxcflxcIVxcPVxcPFxcPlxcL1xcP1xcO1xcOlxcLlxcLF0vLCAnZGVsaW1pdGVyLmNzJ10sXG4gICAgICAgICAgICAvLyBudW1iZXJzXG4gICAgICAgICAgICBbL1xcZCpcXGQrW2VFXShbXFwtK10/XFxkKyk/LywgJ251bWJlci5mbG9hdC5jcyddLFxuICAgICAgICAgICAgWy9cXGQqXFwuXFxkKyhbZUVdW1xcLStdP1xcZCspPy8sICdudW1iZXIuZmxvYXQuY3MnXSxcbiAgICAgICAgICAgIFsvMFt4WF1bMC05YS1mQS1GJ10qWzAtOWEtZkEtRl0vLCAnbnVtYmVyLmhleC5jcyddLFxuICAgICAgICAgICAgWy8wWzAtNyddKlswLTddLywgJ251bWJlci5vY3RhbC5jcyddLFxuICAgICAgICAgICAgWy8wW2JCXVswLTEnXSpbMC0xXS8sICdudW1iZXIuYmluYXJ5LmNzJ10sXG4gICAgICAgICAgICBbL1xcZFtcXGQnXSovLCAnbnVtYmVyLmNzJ10sXG4gICAgICAgICAgICBbL1xcZC8sICdudW1iZXIuY3MnXSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAgcmF6b3JLZXl3b3JkczogW1xuICAgICAgICAnYWJzdHJhY3QnLCAnYXMnLCAnYXN5bmMnLCAnYXdhaXQnLCAnYmFzZScsICdib29sJyxcbiAgICAgICAgJ2JyZWFrJywgJ2J5JywgJ2J5dGUnLCAnY2FzZScsXG4gICAgICAgICdjYXRjaCcsICdjaGFyJywgJ2NoZWNrZWQnLCAnY2xhc3MnLFxuICAgICAgICAnY29uc3QnLCAnY29udGludWUnLCAnZGVjaW1hbCcsICdkZWZhdWx0JyxcbiAgICAgICAgJ2RlbGVnYXRlJywgJ2RvJywgJ2RvdWJsZScsICdkZXNjZW5kaW5nJyxcbiAgICAgICAgJ2V4cGxpY2l0JywgJ2V2ZW50JywgJ2V4dGVybicsICdlbHNlJyxcbiAgICAgICAgJ2VudW0nLCAnZmFsc2UnLCAnZmluYWxseScsICdmaXhlZCcsXG4gICAgICAgICdmbG9hdCcsICdmb3InLCAnZm9yZWFjaCcsICdmcm9tJyxcbiAgICAgICAgJ2dvdG8nLCAnZ3JvdXAnLCAnaWYnLCAnaW1wbGljaXQnLFxuICAgICAgICAnaW4nLCAnaW50JywgJ2ludGVyZmFjZScsICdpbnRlcm5hbCcsXG4gICAgICAgICdpbnRvJywgJ2lzJywgJ2xvY2snLCAnbG9uZycsICduYW1lb2YnLFxuICAgICAgICAnbmV3JywgJ251bGwnLCAnbmFtZXNwYWNlJywgJ29iamVjdCcsXG4gICAgICAgICdvcGVyYXRvcicsICdvdXQnLCAnb3ZlcnJpZGUnLCAnb3JkZXJieScsXG4gICAgICAgICdwYXJhbXMnLCAncHJpdmF0ZScsICdwcm90ZWN0ZWQnLCAncHVibGljJyxcbiAgICAgICAgJ3JlYWRvbmx5JywgJ3JlZicsICdyZXR1cm4nLCAnc3dpdGNoJyxcbiAgICAgICAgJ3N0cnVjdCcsICdzYnl0ZScsICdzZWFsZWQnLCAnc2hvcnQnLFxuICAgICAgICAnc2l6ZW9mJywgJ3N0YWNrYWxsb2MnLCAnc3RhdGljJywgJ3N0cmluZycsXG4gICAgICAgICdzZWxlY3QnLCAndGhpcycsICd0aHJvdycsICd0cnVlJyxcbiAgICAgICAgJ3RyeScsICd0eXBlb2YnLCAndWludCcsICd1bG9uZycsXG4gICAgICAgICd1bmNoZWNrZWQnLCAndW5zYWZlJywgJ3VzaG9ydCcsICd1c2luZycsXG4gICAgICAgICd2YXInLCAndmlydHVhbCcsICd2b2xhdGlsZScsICd2b2lkJywgJ3doZW4nLFxuICAgICAgICAnd2hpbGUnLCAnd2hlcmUnLCAneWllbGQnLFxuICAgICAgICAnbW9kZWwnLCAnaW5qZWN0JyAvLyBSYXpvciBzcGVjaWZpY1xuICAgIF0sXG4gICAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/monaco-editor/esm/vs/basic-languages/razor/razor.js\n");

/***/ })

}]);