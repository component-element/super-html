import { html, TemplateResult, templateResultNodePartMap } from '../../../../lit-html/src/lit-html';
import ChildInstanceManager from './childInstanceManager';
import { ComponentTemplateToken, SimpleTemplateToken, SimpleTemplateTag, ComponentTemplateTag, TemplateTag } from '../templateTag/index';

export const instanceTemplateResultMap = new WeakMap();

function initParentChildren(parentComponent: any) {
    return ChildInstanceManager.create(parentComponent);
}

function genarateValueToTemplateResult(t, parent) {
    if (typeof t === 'object' && t !== null && (t.type === SimpleTemplateToken || t.type === ComponentTemplateToken)) {
        return genarateTemplateTagToTemplateResult(t, parent);
    }
    if (Array.isArray(t)) {
        return t.map((item) => genarateValueToTemplateResult(item, parent));
    }
    return t;
}

export function genarateTemplateTagToTemplateResult(t: TemplateTag | Array<TemplateTag>, parent): TemplateResult | Array<TemplateResult> {
    const childrenInstaneManager = initParentChildren(parent);
    if (typeof t === 'object' && !Array.isArray(t) && (t.type === SimpleTemplateToken || t.type === ComponentTemplateToken)) {
        if (t.type === ComponentTemplateToken) {
            const componentTemplateTag = t as ComponentTemplateTag;
            const { component, props } = componentTemplateTag;
            const childComponent = childrenInstaneManager.findCanReUseIntance(component); //  findIntanceFromChildrenComponentInfo(component, childrenInstaneManager);

            let renderResult;
            let instance;

            if (childComponent) {
                instance = childComponent.instance;
                childrenInstaneManager.clearMiddleNotUseChildInstance(childComponent.i);
            } else {
                instance = new component(props);
                childrenInstaneManager.addNewInstance(instance);
            }

            renderResult = instance.render();
            const templateR = wrapGenarateTemplateTagToTemplateResult(renderResult, instance);

            instanceTemplateResultMap.set(instance, templateR);

            return templateR;
        }
        if (t.type === SimpleTemplateToken) {
            const simpleTemplateTag = t as SimpleTemplateTag;
            const { strings, values } = simpleTemplateTag;
            const result = html(strings, ...values.map((item) => genarateValueToTemplateResult(item, parent)));
            return result;
        }
    } else if (Array.isArray(t)) {
        return t.map((item) => genarateTemplateTagToTemplateResult(item, parent)).flat();
    } else {
        console.warn(`must render return a template`);
        return html``;
    }
}

export default function wrapGenarateTemplateTagToTemplateResult(t: TemplateTag | TemplateTag[], parent: any) {
    const childrenInstanceManager = initParentChildren(parent);
    const result = genarateTemplateTagToTemplateResult(t, parent);
    childrenInstanceManager.clearLastNotUseChildInstance();
    return result;
}
