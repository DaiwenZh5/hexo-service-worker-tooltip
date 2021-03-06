/**
 * @file inject service worker to hexo page
 * @author mj(zoumiaojiang@gmail.com)
 */

import fs from 'fs';
import path from 'path';

let injectScript = `<script data-inject src="/register.js?v${Date.now()}"></script>`;

export default function inject(publicDir) {

    fs.readdirSync(publicDir).forEach(item => {
        let itemPath = path.resolve(publicDir, item);

        if (fs.statSync(itemPath).isFile()) {
            if (/\.html$/.test(item)) {
                let indexHTMLPath = path.join(publicDir, item);
                let fileContent = fs.readFileSync(indexHTMLPath, 'utf-8').toString();

                // if it has not been injected before
                if (!fileContent.includes(`${injectScript}\n</body></html>`)) {
                    let injectedContent
                        = fileContent.replace(/<\/body>\s*<\/html>\s*$/, `${injectScript}\n</body></html>`);
                        // todo: 取消写入 sw-register.js，hexo server 时不生效
                    // fs.writeFileSync(indexHTMLPath, injectedContent);
                }
            }
        }
        else if (fs.statSync(itemPath).isDirectory()) {
            inject(itemPath);
        }
    });
}
