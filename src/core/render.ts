import { render, TemplateResult, RenderOptions } from 'lit-html';

import customElements from './customElements';
import mutationObserverFactory from './mutationObserver';

function renderCompoentFormElement(ele: HTMLElement) {
    const tagName = ele.tagName.toLocaleLowerCase();
    const Component = customElements.get(tagName);
    const instance = new Component();

    // do lifecicle

    // set requestUpdate
    instance.requestUpdate = function() {
        // do update lifecicle
        render(instance.render(), ele);
    };

    // render 限制  render 方法 注册 element
    render(instance.render(), ele);
}

function isRegisterElement(ele: ChildNode) {
    const type = ele.nodeType;
    if (type !== 1) {
        return false;
    }
    const tagNames = customElements.getAllTagName();
    const tagName = (ele as HTMLElement).tagName.toLocaleLowerCase();
    return tagNames.includes(tagName);
}

function mapTree(node: ChildNode) {
    const flag = isRegisterElement(node);
    if (flag) {
        return renderCompoentFormElement(node as HTMLElement);
    }
    const childNodes = node.childNodes;
    childNodes.forEach((childNode) => {
        mapTree(childNode);
    });
}

function handleAddNodes(nodes: Array<Node>) {
    const elements: Array<HTMLElement> = nodes.filter((node) => node.nodeType === 1).map((ele) => ele as HTMLElement);
    // elements
    elements.forEach((ele) => {
        mapTree(ele);
    });
}

mutationObserverFactory(function(events) {
    const addNodes = events
        .map((e) => {
            const { type } = e;
            if (type == 'childList') {
                const { addedNodes } = e;
                return [...addedNodes];
            }
        })
        .flat(1);
    if (addNodes.length === 0) {
        return;
    }
    handleAddNodes(addNodes);
});

export default function(result: TemplateResult, container: Element | DocumentFragment, options?: Partial<RenderOptions>) {
    return render(result, container, options);
}
