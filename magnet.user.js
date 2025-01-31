// ==UserScript==
// @name         剪贴板磁链提取器
// @namespace    http://your-namespace.com
// @version      1.2
// @description  从剪贴板中提取磁力链接并在页面上显示，方便下载 (修复UI显示问题)
// @author       Your Name
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    let isUIInitialized = false; // 标志变量，记录 UI 是否已初始化

    // 提取磁链的函数
    async function extractMagnetLinks() {
        // 首次点击时初始化 UI
        if (!isUIInitialized) {
            isUIInitialized = true;
            initializeUI(); // 调用 UI 初始化函数
        }

        const magnetLinksList = document.getElementById('magnet-links-list');
        const copyAllButton = document.getElementById('copy-all-button');

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

    // 初始化 UI 的函数
    function initializeUI() {
        console.log("initializeUI() called"); // 添加日志：函数开始执行
        try {
            // 添加样式
            GM_addStyle(`
                #magnet-extractor-container { /* ... 样式保持不变 ... */ }
                #magnet-extractor-container button { /* ... 样式保持不变 ... */ }
                #magnet-links-list { /* ... 样式保持不变 ... */ }
                .magnet-link-item { /* ... 样式保持不变 ... */ }
                .magnet-link-item a { /* ... 样式保持不变 ... */ }
                .magnet-link-item button { /* ... 样式保持不变 ... */ }
            `);

            // 创建容器
            let container = document.createElement('div');
            container.id = 'magnet-extractor-container';
            document.body.appendChild(container);

            // 创建提取按钮
            let extractButton = document.createElement('button');
            extractButton.textContent = '提取剪贴板磁链';
            container.appendChild(extractButton);
            extractButton.addEventListener('click', extractMagnetLinks);

            // 创建复制全部按钮
            let copyAllButton = document.createElement('button');
            copyAllButton.textContent = '复制全部磁链';
            copyAllButton.id = 'copy-all-button';
            copyAllButton.style.display = 'none';
            container.appendChild(copyAllButton);
            copyAllButton.addEventListener('click', copyAllMagnetLinks);

            // 创建磁链列表
            let magnetLinksList = document.createElement('div');
            magnetLinksList.id = 'magnet-links-list';
            container.appendChild(magnetLinksList);

            console.log("initializeUI() finished successfully"); // 添加日志：函数成功执行完成

        } catch (error) {
            console.error("Error in initializeUI():", error); // 捕获并输出错误信息
            isUIInitialized = false; // 初始化失败，重置标志，允许下次点击重试 (可选)
            // 可以考虑添加错误提示 UI，例如在页面上显示一个错误信息
        }
    }


    // 显示磁链的函数 - 保持不变
    function displayMagnetLinks(links) { /* ... 函数内容保持不变 ... */
        const magnetLinksList = document.getElementById('magnet-links-list');
        const copyAllButton = document.getElementById('copy-all-button');
        magnetLinksList.innerHTML = '';
        if (links.length > 0) {
            copyAllButton.style.display = 'block';
            links.forEach(link => {
                let linkItem = document.createElement('div');
                linkItem.className = 'magnet-link-item';

                let linkElement = document.createElement('a');
                linkElement.href = link;
                linkElement.textContent = decodeURIComponent(link).substring(0, 60) + '...';
                linkElement.title = link;

                let copyButton = document.createElement('button');
                copyButton.textContent = '复制';
                copyButton.addEventListener('click', () => {
                    GM_setClipboard(link, 'text');
                    copyButton.textContent = '已复制';
                    setTimeout(() => {
                        copyButton.textContent = '复制';
                    }, 1500);
                });

                linkItem.appendChild(linkElement);
                linkItem.appendChild(copyButton);
                magnetLinksList.appendChild(linkItem);
            });
        } else {
            magnetLinksList.textContent = '未在剪贴板中找到磁链。';
            copyAllButton.style.display = 'none';
        }
    }

    // 复制全部磁链的函数 - 保持不变
    function copyAllMagnetLinks() { /* ... 函数内容保持不变 ... */
        const copyAllButton = document.getElementById('copy-all-button');
        let magnetLinks = [];
        document.querySelectorAll('#magnet-links-list .magnet-link-item a').forEach(a => {
            magnetLinks.push(a.href);
        });
        if (magnetLinks.length > 0) {
            GM_setClipboard(magnetLinks.join('\n'), 'text');
            copyAllButton.textContent = '全部磁链已复制';
            setTimeout(() => {
                copyAllButton.textContent = '复制全部磁链';
            }, 1500);
        }
    }

})();
