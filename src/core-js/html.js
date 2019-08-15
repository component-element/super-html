import { html } from '/node_modules/lit-html/lit-html.js';

import customElements from './component/customElements.js';

const token = Symbol('UnConnectCustomComponentTemplate');

class UnConnectCustomComponentTemplate {
    constructor(strings, values, t) {
        if (token !== t) {
            throw new Error('must call html');
        }
        this.strings = strings;
        this.values = values;
    }

    compileToHTMLTemplate(update, requestUpdate, componentInstanceObj, { isRoot = false, notInstance = false } = {}) {
        let strings = [...this.strings];
        let values = [...this.values];

        const { componentInstanceMap, target } = componentInstanceObj;

        const instanceArr = componentInstanceMap.get(target);

        const { oldInstanceArr, newInstanceArr } = instanceArr || {
            oldInstanceArr: [],
            newInstanceArr: []
        };

        if (!instanceArr) {
            componentInstanceMap.set(target, {
                oldInstanceArr,
                newInstanceArr
            });
        }

        values = values.map((item) => {
            if (item instanceof UnConnectCustomComponentTemplate) {
                return item.compileToHTMLTemplate(update, requestUpdate, componentInstanceObj, {
                    notInstance: true
                });
            }
            if (Array.isArray(item) && item.every((i) => i instanceof UnConnectCustomComponentTemplate)) {
                return item.map((i) => i.compileToHTMLTemplate(update, requestUpdate, componentInstanceObj, { notInstance: true }));
            }
            return item;
        });

        const names = [...customElements.customElementsMap.keys()];
        const startRegString = names.map((name) => `<${name}`).join('|');
        const endRegString = names.map((name) => `</${name}>`).join('|');

        let flag = true;

        while (flag) {
            //
            let startReg = new RegExp(startRegString, 'g');
            let endReg = new RegExp(endRegString, 'g');
            let startIndex = null;
            let endIndex;

            // 查找第一个节点

            for (let i = 0; i < strings.length; i++) {
                const str = strings[i];
                if (startReg.test(str)) {
                    startIndex = i;
                    break;
                }
            }

            if (startIndex == null) {
                // 没有找到 注册的 component
                flag = false;
                break;
            }

            for (let j = strings.length - 1; j > 0; j--) {
                const str = strings[j];
                if (endReg.test(str)) {
                    endIndex = j;
                    break;
                }
            }

            // name startIndex endIndex

            const startStrings = strings.slice(0, startIndex + 1);
            const endStrings = strings.slice(endIndex);

            startReg = new RegExp(startRegString, 'g');
            endReg = new RegExp(endRegString, 'g');

            // startString
            let startExecArr = startReg.exec(startStrings[startStrings.length - 1]);

            startStrings[startStrings.length - 1] = startStrings[startStrings.length - 1].slice(0, startExecArr.index);

            // endStrings
            let endExecArr;
            let crt;
            while ((crt = endReg.exec(endStrings[0])) !== null) {
                endExecArr = crt;
            }
            endStrings[0] = endStrings[0].slice(endExecArr.index + endExecArr[0].length);

            // name

            const name = startExecArr[0].replace(/(<|>)/g, '');

            strings = [...startStrings, ...endStrings];

            if (!update) {
                // 首次 全部创建实例
                const C = customElements.customElementsMap.get(name);
                const c = new C();

                newInstanceArr.push(c);

                c.requestUpdate = requestUpdate;

                // lifecycle

                const unConnectCustomComponentTemplate = c.render();

                const htmlTemplate = unConnectCustomComponentTemplate.compileToHTMLTemplate(update, requestUpdate, {
                    componentInstanceMap,
                    target: c
                });
                // 处理value
                values = [...values.slice(0, startIndex), htmlTemplate, ...values.slice(endIndex)];
            } else {
                // isRoot && console.log('update');
                let c = oldInstanceArr.shift();

                if (c && c.tagName == name.toUpperCase()) {
                    // 复用实例
                    newInstanceArr.push(c);
                } else {
                    // 销毁 新创建
                    c && componentInstanceMap.delete(c);
                    const C = customElements.customElementsMap.get(name);
                    c = new C();
                    newInstanceArr.push(c);

                    c.requestUpdate = requestUpdate;
                }

                const nConnectCustomComponentTemplate = c.render();
                values = [
                    ...values.slice(0, startIndex),
                    nConnectCustomComponentTemplate.compileToHTMLTemplate(update, requestUpdate, {
                        componentInstanceMap,
                        target: c
                    }),
                    ...values.slice(endIndex)
                ];
            }
        }

        if (!notInstance) {
            if (oldInstanceArr.length > 0) {
                oldInstanceArr.forEach((c) => {
                    componentInstanceMap.delete(c);
                });
                oldInstanceArr.length = 0;
            }
            componentInstanceMap.set(target, { oldInstanceArr: newInstanceArr, newInstanceArr: oldInstanceArr });
        }

        return html(strings, ...values);
    }
}

export default function(strings, ...values) {
    return new UnConnectCustomComponentTemplate(strings, values, token);
}
