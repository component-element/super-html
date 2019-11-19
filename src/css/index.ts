import stylis from 'stylis';

const style = document.createElement('style');

document.head.appendChild(style);

const cssstringSet = new Set();

function inset(classname, csscontext) {
    const cssstring = stylis(`.${classname}`, csscontext); //;`.${classname}{${csscontext}}`;
    if (cssstringSet.has(cssstring)) {
        return;
    }
    cssstringSet.add(cssstring);
    const text = document.createTextNode(cssstring);
    style.appendChild(text);
}

function now() {
    return performance.now ? Math.floor(performance.now() * 100) : Date.now();
}

const classnameTagMap = new Map();

const PREFIX_NAME = `byte`;

function randomId() {
    return `${PREFIX_NAME}-${btoa(`${now()}`).replace(/=/g, '')}`;
}

function makeClassName(tag?) {
    if (tag) {
        let classname = classnameTagMap.get(tag);
        if (!classname) {
            classname = randomId();
            classnameTagMap.set(tag, classname);
        }
        return classname;
    }
    return randomId();
}

class CssResult {
    static cacheMap: WeakMap<Array<string> | TemplateStringsArray, CssResult> = new WeakMap();
    static create(strings: Array<string> | TemplateStringsArray, values: Array<any>) {
        let i = this.cacheMap.get(strings);
        if (!i) {
            i = new CssResult(strings, values);
            this.cacheMap.set(strings, i);
        } else {
            i.setValue(values);
        }
        return i;
    }
    strings: Array<string> | TemplateStringsArray;
    values: Array<any>;
    constructor(strings, values) {
        this.strings = strings;
        this.values = values;
    }
    setValue(v: Array<any>) {
        this.values = v;
    }
    toCssString() {
        let s = this.strings[0];
        for (let i = 1; i < this.strings.length; i++) {
            s += `${this.values[i - 1]}${this.strings[i]}`;
        }
        return s.trim().replace(/;\n\s{1,}/g, ';');
    }
    toString() {
        const csscontext = this.toCssString();
        const classname = makeClassName(csscontext);
        inset(classname, csscontext);
        return classname;
    }
}

export default function css(strings: TemplateStringsArray, ...values: Array<any>) {
    return CssResult.create(strings, values);
}
