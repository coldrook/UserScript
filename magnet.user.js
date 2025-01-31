// ==UserScript==
// @name         magnet
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  query the web pages all magnet link
// @author       You
// @match http://*/*
// @match https://*/*
// @license GPL
// @icon         https://raw.githubusercontent.com/linuxserver/docker-templates/master/linuxserver.io/img/qbittorrent-logo.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var links = document.querySelectorAll('a');
    for (var i = 0,
         l = links.length; i < l; i++) {
        links[i].href = links[i].href.replace("https://btsow.quest", "https://btsow.motorcycles")
    }
    if (self != top) {
        return
    }
    // qbittorrent 淡蓝色 (Light Sky Blue) RGB: 135, 206, 250,  RGBA: rgba(135, 206, 250, 0.5) 透明度 50%
    var qb_lightblue_rgba = 'rgba(135, 206, 250, 0.5)';
    // transmission 灰色 (Light Gray) RGB: 211, 211, 211, RGBA: rgba(211, 211, 211, 0.8) 透明度 40%  <--  修改为 40% 透明度 (这里其实可以保持 80%，直接修改下面 opacity 属性更清晰)
    var trans_gray_rgba = 'rgba(211, 211, 211, 0.8)';
    // transmission 红色 (Firebrick) RGB: 178, 34, 34, RGBA: rgba(178, 34, 34, 0.8) 透明度 80%
    var trans_red_rgba = 'rgba(178, 34, 34, 0.8)';


    var orstr = "<img src='data:image/gif;base64,R0lGODlhEgAQAOeiAFwVF2cWF2QYGYEdHYIeHnsmJ3ctOQpJggtRjC1LgQ5Uj0NHaj9HeQtVlC9Oew1Yl6EzNAddlQ9bnA1cn6w0NAtdoQtfl641NlBQUQtfpQxfpLM2NlJSU7g3N7Y4NxlgoYBISLo4OLs4OZpBVAVpo7s6OlhYWFpaWn9Ocb5BQbxDQoZTU2FhYaxMTKFQUGNjY8JJSWRkZKlRUpVXVgF8wcJLSsFMS2ZmZiR1s6ZVVatUVQN/wwN/xMROTktukIZgYDtzpWpqagCDywGDy0B0lwKDzHlnZq5YWL5UVV5uiZtgYGtucm5ubkl5nnJxcXNzcxWJzlJ8k7phYHZ2dhuLznd3d9BeXcFkZHl5eSKNzXp6ent6ent7eyaQ0H19fY94echoaDiOvX5+fiqU1IGBgYCCg4KCgoODg4SEhHmGmTmWyjCY1oWFhdZuboaGhtlycZCKioyMjJqKio+Pj5KSkoqUm4mWnMKHhpSVl5mUlNyBgNuCgpeXl5mZmZqampzcnZydoJ6enqCgoKKioqSkpKWkpKampuGXl6urq6ysrLCwsLGxsbW1tba2tre3t7i4uLm5ubu7u76+vr+/vsHBwcXFxcjIyMnKysrKys3Nzc/Pz9fX19nZ2dvb297e3uDg4OHh4ePj4////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAP8ALAAAAAASABAAAAj+AP8JHCjwSRk7ddBQIshwCZEwWdZ0ocJjARxMDP9FUTNmiJCPNFB42ACCEcEmUD6qxDEihMseKzwJ9FHk4w4SFhwY6OAyRAkkcf4R+pMGSAQEGjIwGFCgZwgrRv754aKIw4cKEzIkIBBAhEsYLb4kEiRoCgYNCiQ0OEBAgNcaKnTIGUSHTYwTD5LgieMEAIQQKWy4OESoTx8yN0wAEthoTh4lFyjI2HNHkaE4WF4E+kdHi6A4iRRtudJGzw+BN4JUEcjCTaJFfiJlAiMlhyWBoM5AQs1HzKBQnya9OVIoo0Avfvo84qTp0gxJxgUuYmLGUCdHbDZFJ4joDJ1KGQMBAgA7'>";
    var nrstr = "<img src='data:image/gif;base64,R0lGODlhEgAQAOekAAlGVghMXQdNYQZecABgegBhe19QECdebVpTRGBVLGNUNFtWPGhWFWtZF21bFFtbW3BdFnRgGDtqdnleIgR5kXZiFntgJHdjFGNjY3hkFHllE3llFGVlZXplIAKBnAKCnUVyfGpqagGGo4hnKwGIpQCJplpydQ6Ikzt7jQCLqW5ubiKDkRGIlQCMqTR/h29vbxCJmnBwcACPqgiOmROLmINuVgCQrHJycmh1eVd7f3ZzcXR0dHt0ZACVrnZ2dgCWrwKWqJFxVI5zS3Z3dwCYsZV0OgqZpZZ4W595MJd4ZX5+fl+GlROeqqN8MqN8M4GBgQCluQaksHSIi4OEhYSEhKiAMqiAM4WFhYeFhIeHhwCvvImJiYqKirCFPrGGQoyMjI2NjbWHSLWGWo6Ojg6ywJeOhJCQkLeKS42Rk5GRkZKTkpOTk72NT4mYmb+OXJeXl6CWkZiYmJmYl8KRVZmZmaSXkp2dnZ6enmWvs0K6xaKhoJ6io0m6xaSkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrLGxsbKysmvHzbOzs7W1tba2tri4uLm5ubq6ury8vL29vb6+vsHBwcTExMbGxsjIyMrKysrKy8zMzM/Q0NXV1dfX19vb29zc3OPj4+Tk5Obm5ujo6O3t7fDw8P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAP8ALAAAAAASABAAAAj+AP8JHChwCJY6cLhUIshQRxAxYeac8dIEAZpMDP8lccPGiscqSEyQECEBEsEjXTyqLIIihUsiIDwJrFHFo5MRFhQcKOEyRQsgav4NClRGyAQGGTQsIDCgZwooOP75ufLoQYcLFTQkKCCgZw8YUg4VKvTkwYYGERwYKBDA5Q8ZNNoIsmMmBgcIPOSs8QGAQgobPVYg+nPnz5cbGPQIdERnz5IPHljwwaOIUBwqL/r8u1zoDSNIU5hoyZNDoIodSgSGSNMokh9Km6IYOYFJIKgtkQTG6LOl0ChRl8jMCJRRIBVAfyZ94qTJhaTiAhftGGMolCQwnaATTJTljaWMAQEAOw=='>";
    var divObj = document.createElement("div");
    divObj.id = "magbtn";
    divObj.style.position = "fixed";
    divObj.style.right = "1%";
    divObj.style.top = "95%";
    divObj.style.width = "20px";
    divObj.style.height = "20px";
    divObj.style.lineHeight = "20px";
    divObj.style.margin = "auto";
    divObj.style.borderRadius = "8px";
    divObj.style.zIndex = "1888";
    divObj.style.boxShadow = "0px 0px 8px 8px " + qb_lightblue_rgba; // 修改为 qbittorrent 淡蓝色
    divObj.style.backgroundColor = qb_lightblue_rgba; // 修改为 qbittorrent 淡蓝色
    divObj.style.color = "#ffffff"; // 按钮文字颜色改为白色，更醒目
    document.body.appendChild(divObj);
    document.getElementById("magbtn").innerHTML = orstr;
    function getmag() {
        if (self != top) {
            return
        }
        if (document.getElementById("showmagnet")) {
            document.getElementById("showmagnet").remove(); // 如果已显示，则先移除
            document.getElementById("magbtn").innerHTML = orstr; // 按钮恢复初始状态
            return
        }
        var divObj = document.createElement("div");
        divObj.id = "showmagnet";
        divObj.style.position = "fixed";
        divObj.style.left = "25%";
        divObj.style.top = "75px";
        divObj.style.textAlign = "center";
        divObj.style.width = "50%";
        divObj.style.margin = "auto";
        divObj.style.zIndex = "999";
        divObj.style.background = trans_gray_rgba; // 修改为 transmission 灰色
        divObj.style.border = "2px solid " + trans_red_rgba; // 添加 transmission 红色边框
        divObj.style.opacity = "0.4";  //  <-----  修改为 40% 透明度
        divObj.style.display = "block";
        divObj.style.whiteSpace = "normal"; // 允许换行
        divObj.style.boxShadow = "0px 0px 8px 8px " + trans_gray_rgba; // 阴影颜色也改为 transmission 灰色，更协调
        divObj.style.borderRadius = "10px";
        divObj.addEventListener("dblclick",
                                function() {
            this.remove();
            document.getElementById("magbtn").innerHTML = orstr; // 双击关闭时按钮恢复初始状态
        });
        document.body.appendChild(divObj);
        let magnetLinks = []; // 用于存储磁力链接的数组
        try {
            var links = document.querySelector("body").innerHTML.match(/[0-9a-fA-F]{40}/g);
            links = links.sort();
            let uniqueLinks = [];
            if (links && links.length > 0) { // 确保 links 存在且有内容
                uniqueLinks.push(links[0].toUpperCase());
                for (var i = 1, l = links.length; i < l; i++) {
                    if (links[i].toUpperCase() !== links[i - 1].toUpperCase() && links[i].toUpperCase() !== "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") {
                        uniqueLinks.push(links[i].toUpperCase());
                    }
                }
                magnetLinks = uniqueLinks.map(link => "magnet:?xt=urn:btih:" + link); // 生成完整的磁力链接

                let magnetListHTML = "<div style='padding: 10px;'>"; // 添加 padding
                magnetLinks.forEach(magnet => {
                    magnetListHTML += `<div style='margin-bottom: 5px; display: flex; align-items: center; justify-content: space-between;'>
                                         <span style='word-wrap: break-word; word-break: break-all; margin-right: 10px; color: #333;'>${magnet}</span>  <!-- 磁力链接文字颜色改为深灰色 -->
                                         <button class='copy-btn' data-magnet='${magnet}' style='padding: 5px 10px; border-radius: 5px; background-color: #f0f0f0; border: 1px solid #ccc; cursor: pointer;'>复制</button>
                                      </div>`;
                });
                magnetListHTML += `<button id='copyAllButton' style='margin-top: 10px; padding: 8px 15px; border-radius: 5px; background-color: #e0e0e0; border: 1px solid #bbb; cursor: pointer;'>全部复制</button></div>`; // "全部复制" 按钮
                document.getElementById("showmagnet").innerHTML = magnetListHTML;
                document.getElementById("magbtn").innerHTML = nrstr;
            } else {
                document.getElementById("showmagnet").innerHTML = "<div style='padding: 20px; color: #333;'>没有找到磁力链</div>"; // 没有找到磁力链提示文字颜色改为深灰色
                document.getElementById("magbtn").innerHTML = nrstr;
            }


        } catch(e) {
            document.getElementById("showmagnet").innerHTML = "<div style='padding: 20px; color: #333;'>没有找到磁力链</div>"; // 没有找到磁力链提示文字颜色改为深灰色
            document.getElementById("magbtn").innerHTML = nrstr;
        }

        // 添加单个复制按钮的事件监听器
        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', function() {
                const magnetLink = this.dataset.magnet;
                copyToClipboard(magnetLink);
                // 可以添加一些复制成功的视觉反馈，例如按钮文字变化
                this.textContent = '已复制';
                setTimeout(() => { this.textContent = '复制'; }, 1500); // 1.5秒后恢复
            });
        });

        // 添加 "全部复制" 按钮的事件监听器
        document.getElementById('copyAllButton').addEventListener('click', function() {
            const allMagnetLinksText = magnetLinks.join('\n'); // 使用换行符分隔
            copyToClipboard(allMagnetLinksText);
            this.textContent = '全部已复制';
            setTimeout(() => { this.textContent = '全部复制'; }, 1500); // 1.5秒后恢复
        });
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                // console.log('Text copied to clipboard'); // 可选：复制成功后的提示
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                fallbackCopyTextToClipboard(text); // 备用复制方法
            });
        } else {
            fallbackCopyTextToClipboard(text); // 备用复制方法
        }
    }

    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";  // 确保不可见
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            // console.log('Fallback: Copying text command was ' + msg); // 可选：备用方法复制结果提示
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }


    document.getElementById("magbtn").addEventListener("mousedown",
                                                       function() {
        var Drag = document.getElementById(this.id);
        Drag.onmousedown = function(event) {
            Drag.style.userSelect = "none";
            var ev = event || window.event;
            event.stopPropagation();
            var disX = ev.clientX - Drag.offsetLeft;
            var disY = ev.clientY - Drag.offsetTop;
            document.onmousemove = function(event) {
                var ev = event || window.event;
                Drag.style.left = ev.clientX - disX + "px";
                Drag.style.top = ev.clientY - disY + "px";
                Drag.style.cursor = "move"
            }
        };
        Drag.onmouseup = function() {
            document.onmousemove = null;
            this.style.cursor = "default";
            Drag.style.userSelect = "";
            return false
        }
    });
    document.getElementById("magbtn").addEventListener("click",
                                                       function() {
        getmag()
    });
    document.getElementById("magbtn").addEventListener("mouseover",
                                                       function() {
        document.getElementById("magbtn").style.backgroundColor = "#ffffff"; // 鼠标悬停时按钮背景变为白色
        document.getElementById("magbtn").style.color = qb_lightblue_rgba; // 文字颜色变为淡蓝色
        document.getElementById("magbtn").style.boxShadow = "0px 0px 8px 8px " + qb_lightblue_rgba; // 阴影颜色保持淡蓝色
        document.getElementById("magbtn").style.fontWeight = "bold";
        document.getElementById("magbtn").style.cursor = "pointer"
    });
    document.getElementById("magbtn").addEventListener("mouseout",
                                                       function() {
        document.getElementById("magbtn").style.backgroundColor = qb_lightblue_rgba; // 鼠标移开时按钮恢复淡蓝色
        document.getElementById("magbtn").style.color = "#ffffff"; // 文字颜色恢复白色
        document.getElementById("magbtn").style.boxShadow = "0px 0px 8px 8px " + qb_lightblue_rgba; // 阴影颜色保持淡蓝色
        document.getElementById("magbtn").style.fontWeight = ""
    })
})();
