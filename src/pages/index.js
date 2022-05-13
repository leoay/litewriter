import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './index.less';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import './custom_codemirror.less';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import juice from "juice";
_jsx("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Tangerine" });
export default function IndexPage() {
    const input = '# This is a header\n\nAnd this is a paragraph';
    const [mdtext, setMdTxt] = useState();
    //复制操作
    const copySafari = (text) => {
        // 获取 input
        let input = document.getElementById("copy-input");
        if (!input) {
            // input 不能用 CSS 隐藏，必须在页面内存在。
            input = document.createElement("input");
            input.id = "copy-input";
            input.style.position = "absolute";
            input.style.left = "-1000px";
            input.style.zIndex = "-1000";
            document.body.appendChild(input);
        }
        // 让 input 选中一个字符，无所谓那个字符
        input.value = "NOTHING";
        //input.setSelectionRange(0, 1);
        input.focus();
        // 复制触发
        document.addEventListener("copy", function copyCall(e) {
            e.preventDefault();
            e.clipboardData.setData("text/html", text);
            e.clipboardData.setData("text/plain", text);
            document.removeEventListener("copy", copyCall);
        });
        document.execCommand("copy");
    };
    //拼接样式
    const solveHtml = () => {
        const element = document.getElementById("richtext");
        const inner = element.children[0].children;
        for (const item of inner) {
            item.setAttribute("data-tool", "LiteWriter");
        }
        let html = element.innerHTML;
        // html = html.replace(/<mjx-container (class="inline.+?)<\/mjx-container>/g, "<span $1</span>");
        // html = html.replace(/\s<span class="inline/g, '&nbsp;<span class="inline');
        // html = html.replace(/svg><\/span>\s/g, "svg></span>&nbsp;");
        // html = html.replace(/mjx-container/g, "section");
        // html = html.replace(/class="mjx-solid"/g, 'fill="none" stroke-width="70"');
        // html = html.replace(/<mjx-assistive-mml.+?<\/mjx-assistive-mml>/g, "");
        // const basicStyle = document.getElementById(BASIC_THEME_ID).innerText;
        // const markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText;
        // const codeStyle = document.getElementById(CODE_THEME_ID).innerText;
        // const fontStyle = document.getElementById(FONT_THEME_ID).innerText;
        let res = "";
        try {
            res = juice.inlineContent(html, "<style>div{color:red;}</style><div/>", {
                inlinePseudoElements: true,
                preserveImportant: true,
            });
        }
        catch (e) {
            //message.error("请检查 CSS 文件是否编写正确！");
        }
        return res;
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: _jsx(CodeMirror, { className: styles.codemirror, value: '', options: {
                        mode: 'markdown',
                        theme: 'material',
                        keyMap: 'sublime',
                        lineWrapping: true,
                        lineNumbers: false,
                    }, onChange: (editor, data, value) => {
                        console.log(value);
                        setMdTxt(value);
                    } }) }), _jsx("div", { id: "richtext", className: styles.richtext, children: _jsx("section", { id: "lite", "data-tool": "LiteMd", "data-website": "https://leoay.com", children: _jsx(ReactMarkdown, { children: mdtext }) }) }), _jsx("button", { onClick: () => {
                    const layout = document.getElementById("richtext"); // 保护现场
                    const html = layout.innerHTML;
                    //拼接css样式
                    var htmltext = solveHtml();
                    copySafari(htmltext);
                }, children: "\u590D\u5236" })] }));
}
//# sourceMappingURL=index.js.map