// ==UserScript==
// @name         剪贴板磁链提取器
// @namespace    https://github.com/coldrook/UserScript
// @version      1.0
// @description  从剪贴板中提取磁力链接并在页面上显示，方便下载
// @author       Your Name
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // 添加样式
    GM_addStyle(`
        #magnet-extractor-container {
            position: fixed;
            top: 10px;
            left: 10px;
            background-color: white;
            border: 1px solid #ccc;
            padding: 10px;
            z-index: 1000;
            border-radius: 5px;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
        }
        #magnet-extractor-container button {
            margin-bottom: 10px;
            padding: 5px 10px;
            cursor: pointer;
        }
        #magnet-links-list {
            max-height: 300px;
            overflow-y: auto;
            margin-bottom: 10px;
        }
        .magnet-link-item {
            margin-bottom: 5px;
            word-wrap: break-word;
            display: flex;
            align-items: center;
        }
        .magnet-link-item a {
            margin-right: 5px;
            text-decoration: none;
        }
        .magnet-link-item button {
            padding: 2px 5px;
            font-size: 0.8em;
            margin-left: 5px;
        }
    `);

    // 创建容器
    let container = document.createElement('div');
    container.id = 'magnet-extractor-container';
    document.body.appendChild(container);

    // 创建提取按钮
    let extractButton = document.createElement('button');
    extractButton.textContent = '提取剪贴板磁链';
    container.appendChild(extractButton);

    // 创建复制全部按钮
    let copyAllButton = document.createElement('button');
    copyAllButton.textContent = '复制全部磁链';
    copyAllButton.style.display = 'none'; // 初始隐藏，提取到磁链后显示
    container.appendChild(copyAllButton);

    // 创建磁链列表
    let magnetLinksList = document.createElement('div');
    magnetLinksList.id = 'magnet-links-list';
    container.appendChild(magnetLinksList);

    // 提取磁链的函数
    async function extractMagnetLinks() {
        try {
            const clipboardText = await navigator.clipboard.readText();
            const magnetRegex = /magnet:\?xt=urn:btih:[0-9a-zA-Z]{32,40}(?:&.+)?/g;
            const magnetLinks = clipboardText.match(magnetRegex) || [];
            displayMagnetLinks(magnetLinks);
        } catch (err) {
            console.error('读取剪贴板失败:', err);
            magnetLinksList.textContent = '读取剪贴板失败，请检查权限或手动复制文本。';
        }
    }

    // 显示磁链的函数
    function displayMagnetLinks(links) {
        magnetLinksList.innerHTML = ''; // 清空之前的列表
        if (links.length > 0) {
            copyAllButton.style.display = 'block'; // 显示复制全部按钮
            links.forEach(link => {
                let linkItem = document.createElement('div');
                linkItem.className = 'magnet-link-item';

                let linkElement = document.createElement('a');
                linkElement.href = link;
                linkElement.textContent = decodeURIComponent(link).substring(0, 60) + '...'; // 截取显示，防止过长
                linkElement.title = link; // 完整磁链作为 title，鼠标悬停显示

                let copyButton = document.createElement('button');
                copyButton.textContent = '复制';
                copyButton.addEventListener('click', () => {
                    GM_setClipboard(link, 'text');
                    copyButton.textContent = '已复制';
                    setTimeout(() => {
                        copyButton.textContent = '复制';
                    }, 1500); // 短暂提示
                });

                linkItem.appendChild(linkElement);
                linkItem.appendChild(copyButton);
                magnetLinksList.appendChild(linkItem);
            });
        } else {
            magnetLinksList.textContent = '未在剪贴板中找到磁链。';
            copyAllButton.style.display = 'none'; // 没有磁链时隐藏复制全部按钮
        }
    }

    // 复制全部磁链的函数
    function copyAllMagnetLinks() {
        let magnetLinks = [];
        document.querySelectorAll('#magnet-links-list .magnet-link-item a').forEach(a => {
            magnetLinks.push(a.href);
        });
        if (magnetLinks.length > 0) {
            GM_setClipboard(magnetLinks.join('\n'), 'text');
            copyAllButton.textContent = '全部磁链已复制';
            setTimeout(() => {
                copyAllButton.textContent = '复制全部磁链';
            }, 1500); // 短暂提示
        }
    }

    // 绑定按钮点击事件
    extractButton.addEventListener('click', extractMagnetLinks);
    copyAllButton.addEventListener('click', copyAllMagnetLinks);

})();
