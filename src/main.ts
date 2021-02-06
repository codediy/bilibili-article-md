import {sleep, querySelectorBlock} from './utils';
import {markToBili} from './marked';

let editorDocument: Document;
let editorContentDocument: Document;

/**
 * 写入 markdown 内容
 * @param markdown markdown原始文本
 */
async function writeContent(markdown: string) {
    const result = await markToBili(markdown);
    editorContentDocument.body.innerHTML = result;
    // 触发事件以更新
    editorContentDocument.documentElement.dispatchEvent(new KeyboardEvent('keypress', {
        code: 'Space',
        key: ' '
    }))
}

/**
 * 插入工具栏图标
 */
async function insertToolbarItem() {
    const toolbar = await querySelectorBlock(editorDocument, '.editor-toolbar');
    // 加入分割线
    const cutOffLineElement = editorDocument.createElement('li');
    cutOffLineElement.className = 'toolbar-item cut-off left';
    toolbar?.appendChild(cutOffLineElement);

    // 加入item
    const item = editorDocument.createElement('li');
    item.className = 'toolbar-item left';
    item.id = 'bmd-toolbar-item';

    // img
    const img = document.createElement('img');
    img.src = GM_getResourceURL('icon');
    item.appendChild(img);

    // input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.txt';
    input.title = '点击上传 markdown 文件';
    input.onchange = async (ev) => {
        const input = <HTMLInputElement>ev.target;
        const files = input.files;
        if (files) {
            const file = files[0];
            if (!file.name.toLowerCase().endsWith('.md')) {
                alert('不是合法的 Markdown 文件！');
            } else {
                const content = await file.text();
                writeContent(content);
            }
        }
    }
    item.appendChild(input);
    toolbar.appendChild(item);
}

/**
 * 初始化拖动上传
 */
async function initDragBox() {
    const editorBox = await querySelectorBlock(editorDocument, '#editor-box');
    editorBox.style.position = 'relative';
    // 提示框
    const hintBox = document.createElement('div');
    hintBox.id = 'bmd-drag-hint';
    // 提示内容
    const hint = document.createElement('span');
    hintBox.appendChild(hint);
    editorBox.appendChild(hintBox);

    // 注册事件
    let lastTarget: Element | null;
    editorContentDocument.addEventListener('dragenter', (ev) => {
        lastTarget = <Element>ev.target;
        hintBox.className = 'show';
        ev.preventDefault();
        hint.innerText = '放开鼠标以插入 Markdown';
    });
    editorContentDocument.addEventListener('dragleave', (ev) => {
        if (ev.target === lastTarget) {
            hintBox.className = '';
            ev.preventDefault();
            hint.innerText = '拖动文件到此处以插入 Markdown';
        }
    });
    editorContentDocument.addEventListener('dragover', (ev) => {
        hint.innerText = '放开鼠标以插入 Markdown';
        ev.preventDefault();
    });
    editorContentDocument.addEventListener('drop', async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        hintBox.className = '';
        const dt = ev.dataTransfer;
        if (dt) {
            const file = dt.files[0];
            if (file) {
                if (file.name.toLowerCase().endsWith('.md')) {
                    const content = await file.text();
                    writeContent(content);
                } else {
                    alert('不是合法的 Markdown 文件！')
                }
            }
        }
    }, true);
}

/**
 * 加载样式
 */
function loadStyle() {
    const styleElement = editorDocument.createElement('style');
    const style = GM_getResourceText('style');
    styleElement.innerText = style;
    editorDocument.body.appendChild(styleElement);
}

/**
 * 初始化
 */
async function init() {
    const editor = <HTMLIFrameElement>await querySelectorBlock(document, '#edit-article-box iframe');
    editor.addEventListener('load', async () => {
        editorDocument = <Document>editor.contentDocument;
        const editorContent = <HTMLIFrameElement>await querySelectorBlock(editorDocument, '#ueditor_0');
        editorContent.onload = () => {
            editorContentDocument = <Document>editorContent.contentDocument;
            loadStyle();
            insertToolbarItem();
            initDragBox();
        };
    })
}

let prevPath: string = '';
window.addEventListener('load', () => {
    // 循环检测URL变化，如果变为专栏页面则初始化
    setInterval(() => {
        if (prevPath !== location.pathname) {
            prevPath = location.pathname;
            if (prevPath === '/platform/upload/text/edit') {
                init();
            }
        }
    }, 200)
});
