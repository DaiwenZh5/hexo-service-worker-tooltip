/**
 * @file run sw-precache
 * @author mj(zoumiaojiang@gmail.com)
 */

/* global public_dir */
/* eslint-disable fecs-camelcase */
import fs from 'fs';
import path from 'path';
import {
    SW_FILE_NAME
} from './config';


/**
 * 对于小于 10 的数字向左补全0
 *
 * @param  {number} value 数字
 * @return {string}       补全后的字符串
 */
function padding(value) {
    return value < 10 ? `0${value}` : value;
}

/**
 * 获取时间戳版本号
 *
 * @return {string} 版本号
 */
function versionGenerator() {
    let d = new Date();

    return ''
        + d.getFullYear()
        + padding(d.getMonth() + 1)
        + padding(d.getDate())
        + padding(d.getHours())
        + padding(d.getMinutes())
        + padding(d.getSeconds());
}

export default function () {
    const withUpdate = this.config.service_worker.withUpdate;
    let tooltipContent;
    // 当配置更新脚本时， 且为 js 指令时
    if (withUpdate && /(^js\()/.test(withUpdate)) {
        
            tooltipContent = withUpdate.substring(3, withUpdate.length - 1);
    }
    // 脚本内容为空时，表示配置了路径
    if (!tooltipContent) {
        // 获取提示脚本路径
        let tooltipPath = withUpdate ?
            path.resolve(__dirname, "../../../", withUpdate) :
            path.resolve(__dirname, 'templates', 'tooltip.js');
        // 读取脚本内容
        tooltipContent = fs.readFileSync(tooltipPath, "utf-8");
        // 当脚本内容使用 `` 包围时，去除符号
        if (/(^"`)|(`"$)/.test) {
            tooltipContent = tooltipContent.substring(1, tooltipContent.length - 1);
        }
    }

    let swRegisterTemplatePath = path.resolve(__dirname, 'templates', 'sw-register.tpl.js');
    let swRegisterTempleteCon = fs.readFileSync(swRegisterTemplatePath, 'utf-8');
    let swRegisterCon = swRegisterTempleteCon
        .replace('__ServiceWorkerName__', SW_FILE_NAME)
        .replace('__BuildVersion__', versionGenerator())
        .replace('__ToolTipFunction__', tooltipContent);
    ;

    let swRegisterDistPath = path.resolve(this.public_dir, 'sw-register.js');

    fs.writeFileSync(swRegisterDistPath, swRegisterCon);

    return Promise.resolve();
}
