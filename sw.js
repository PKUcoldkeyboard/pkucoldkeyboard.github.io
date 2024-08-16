importScripts('https://cdn.bootcdn.net/ajax/libs/workbox-sw/6.5.1/workbox-sw.js');

// 缓存版本号
let cacheVersion = '-240817';
// 最大条目数
const maxEntries = 80;

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
    // Precache
    workbox.precaching.precacheAndRoute(
        [
            { url: '/manifest.json', revision: cacheVersion },
            { url: '/favicon.ico', revision: cacheVersion },
            { url: '/robots.txt', revision: cacheVersion },
            { url: '/404.html', revision: cacheVersion },
            { url: '/maskable_icon.png', revision: cacheVersion },
            { url: '/192.png', revision: cacheVersion },
            { url: '/512.png', revision: cacheVersion },
            { url: '/img/avatar_hue4d14694a57c01a222a16c47db12c89c_369633_300x0_resize_box_3.png', revision: cacheVersion },
        ]
    );
    // 评论缓存
    workbox.routing.registerRoute(
        new RegExp('^https://comment\.cuterwrite\.top'),
        new workbox.strategies.NetworkFirst({
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: maxEntries,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );
    // rss 、sitemap 不缓存
    workbox.routing.registerRoute(
        new RegExp('^https://cuterwrite\.top/(index|sitemap)\.xml'),
        new workbox.strategies.NetworkOnly()
    );
    // 缓存 HTML
    workbox.routing.registerRoute(
        new RegExp('.*\.html'),
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'html-cache' + cacheVersion,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: maxEntries,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );
    // 缓存 Google Fonts
    workbox.routing.registerRoute(
        new RegExp('.*\.(?:woff|woff2|ttf|otf|eot)'),
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'google-fonts' + cacheVersion,
            plugins: [
                // 使用 expiration 插件实现缓存条目数目和时间控制
                new workbox.expiration.ExpirationPlugin({
                    // 最大缓存条目数
                    maxEntries: maxEntries,
                    // 最长缓存时间 30 天
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                // 使用 cacheableResponse 插件缓存状态码为 0 的请求
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );
    // 缓存 bootcdn、unpkg、jsdelivr 等公共库，用正则匹配
    workbox.routing.registerRoute(
        new RegExp('^https://(?:cdn\.bootcdn\.net|unpkg\.com|cdn\.jsdelivr\.net)'),
        new workbox.strategies.CacheFirst({
            cacheName: 'cdn' + cacheVersion,
            fetchOptions: {
                mode: 'cors',
                credentials: 'omit',
            },
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: maxEntries,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        })
    );
    // 自建 UMA 统计脚本: https://analytics.cuterwrite.top/uma
    workbox.routing.registerRoute(
        new RegExp('^https://analytics\.cuterwrite\.top/uma'),
        new workbox.strategies.NetworkOnly({
            plugins: [
                // 使用 background sync 插件实现后台同步
                new workbox.backgroundSync.BackgroundSyncPlugin('uma-queue', {
                    maxRetentionTime: 12 * 60,
                }),
            ],
        })
    );
    // 缓存存储桶图片 https://cuterwrite-1302252842.file.myqcloud.com/
    workbox.routing.registerRoute(
        new RegExp('^(https://cuterwrite-1302252842\.file\.myqcloud\.com|https://s2\.loli\.net)'),
        new workbox.strategies.CacheFirst({
            cacheName: 'image-cache' + cacheVersion,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: maxEntries,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    // 后缀匹配，针对其余没有被域名匹配到的静态文件
    workbox.routing.registerRoute(
        new RegExp('.*\.(?:png|jpg|jpeg|svg|gif|webp|ico)'),
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        new RegExp('.*\.(css|js)'),
        new workbox.strategies.StaleWhileRevalidate()
    );

    // 默认匹配剩下的请求
    workbox.routing.setDefaultHandler(
        new workbox.strategies.NetworkFirst({
            networkTimeoutSeconds: 10,
        })
    );

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
