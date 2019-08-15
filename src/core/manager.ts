import { render } from 'lit-html';
import Component from './component';
import customElements from './customElements';

interface AttributeChangeMeta {
    target: Node;
    attributeName: string;
}

function isRegisterElement(ele: ChildNode | Element) {
    const type = ele.nodeType;
    if (type !== 1) {
        return false;
    }
    const tagNames = customElements.getAllTagName();
    const tagName = (ele as HTMLElement).tagName.toLocaleLowerCase();
    return tagNames.includes(tagName);
}

class Manager {
    elementComponentMap: WeakMap<Element, Component> = new WeakMap();
    observer: MutationObserver;
    constructor(root?: Element) {
        this.observer = new MutationObserver((e) => {
            this.mutationCallback(e);
        });
        this.observer.observe(root || document.body || document, {
            childList: true,
            subtree: true
        });
        this.init(root);
    }
    init(root?: Element) {
        const target = root || document.body;
        this.mapTree(target);
    }
    mutationCallback(events) {
        const addNodes: Array<Node> = [];
        const attNodes: Array<AttributeChangeMeta> = [];
        for (let i = 0; i < events.length; i++) {
            const e = events[i];
            const { type } = e;
            if (type == 'childList') {
                const { addedNodes } = e;
                addNodes.push(...addedNodes);
            }
            if (type == 'attributes') {
                const { target, attributeName } = e;
                attNodes.push({
                    target,
                    attributeName
                });
            }
        }
        if (addNodes.length > 0) {
            this.handleAddNodes(addNodes);
        }
        if (attNodes.length > 0) {
            this.handleAttributeChanged(attNodes);
        }
        // handleMoveNodes();
        // handleAttributeChanged();
    }
    handleAddNodes(nodes: Array<Node>) {
        const elements: Array<HTMLElement> = nodes.filter((node) => node.nodeType === 1).map((ele) => ele as HTMLElement);
        // elements
        elements.forEach((ele) => {
            this.mapTree(ele);
        });
    }
    handleAttributeChanged(attributeChangeMetas: Array<AttributeChangeMeta>) {
        const { elementComponentMap } = this;
        attributeChangeMetas
            .filter(({ target }) => !!elementComponentMap.get(target as Element))
            .forEach(({ target, attributeName }) => {
                const instance = elementComponentMap.get(target as Element) as Component;
                // console.log('handleAttributeChanged', instance, attributeName);
                window['i'] = instance;
                window['n'] = attributeName;
            });

        // const elements: Array<HTMLElement> = nodes.filter((node) => node.nodeType === 1).map((ele) => ele as HTMLElement);
        // elements.forEach((ele) => {});
    }
    mapTree(node: ChildNode | Element) {
        const flag = isRegisterElement(node);
        if (flag) {
            return this.renderCompoentFormElement(node as HTMLElement);
        }
        const childNodes = node.childNodes;
        childNodes.forEach((childNode) => {
            this.mapTree(childNode);
        });
    }
    renderCompoentFormElement(ele: HTMLElement) {
        const { elementComponentMap, observer } = this;
        const tagName = ele.tagName.toLocaleLowerCase();
        const Component = customElements.get(tagName);
        const instance = new Component();

        // do lifecicle

        elementComponentMap.set(ele, instance);
        observer.observe(ele, {
            attributes: true
        });
        // set requestUpdate
        instance.requestUpdate = function() {
            // do update lifecicle
            render(instance.render(), ele);
        };

        // render 限制  render 方法 注册 element
        render(instance.render(), ele);
    }

    destory() {
        this.observer.disconnect();
        return true;
    }
}

export default Manager;
