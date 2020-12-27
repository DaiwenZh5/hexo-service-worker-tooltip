/**
 * @file serviceworker register template
 * @author mj(zoumiaojiang@gmail.com)
 */

/* global navigator, document */

// 注册的地址为 sw-precache-webpack-pulgin 生成的 service-worker.js 或者自己手动维护的 service worker 文件
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/__ServiceWorkerName__?v=__BuildVersion__').then(function () {
        navigator.serviceWorker.addEventListener('message', function (e) {

            // service-worker.js 如果更新成功会 postMessage 给页面，内容为 'sw.update'
            if (e.data === 'sw.update') {
                // 插入脚本
                __ToolTipFunction__
            }
        });
    });
}
