import { render } from '/node_modules/lit-html/lit-html.js';
import customElements from './component/customElements.js';

function renderComponent(ele) {
    const tagName = ele.tagName.toLocaleLowerCase();
    const component = customElements.get(tagName);

    const instance = new component(ele);

    instance.requestUpdate = function() {
        render(instance.render(), ele);
    };

    render(instance.render(), ele);
}

function mapTree(node, filterFn, callBack) {
    const flag = filterFn(node);
    if (flag) {
        return callBack(node);
    }
    const childNodes = node.childNodes;
    childNodes.forEach((childNode) => {
        mapTree(childNode, filterFn, callBack);
    });
}

function addNodes(nodes) {
    const arr = Array.from(nodes);
    const elements = arr.filter((node) => node.nodeType === 1);
    // elements
    const tagNames = customElements.getAllTagName();

    elements.forEach((ele) => {
        mapTree(
            ele,
            function(ele) {
                const type = ele.nodeType;
                if (type !== 1) {
                    return false;
                }
                const tagName = ele.tagName.toLocaleLowerCase();
                return tagNames.includes(tagName);
            },
            function(ele) {
                renderComponent(ele);
            }
        );
    });
}

const observer = new MutationObserver(function(events) {
    const nodes = [];
    events.map((e) => {
        const { type } = e;
        if (type == 'childList') {
            const { addedNodes } = e;
            nodes.push(...addedNodes);
        }
    });
    if (nodes.length > 0) {
        addNodes(nodes);
    }
});

const defaultOption = {
    attributes: !0,
    childList: !0,
    subtree: !0
};

observer.observe(document.body, defaultOption);

export default render;
