import { render } from '/node_modules/lit-html/lit-html.js';

export const renderComponet = function(C, container) {
    const c = new C();
    c.requestUpdate = () => {
        const html = c.render();
        render(html, container);
        return c;
    };
    const html = c.render();
    return render(html, container);
};

export default function(unConnectCustomComponentTemplate, container, updated = false) {
    // do lifecycle
    const componentInstanceMap = new Map();
    window.m = componentInstanceMap;
    // const componentInstance = new Set();
    const requestUpdate = () => {
        const html = unConnectCustomComponentTemplate.compileToHTMLTemplate(
            true,
            requestUpdate,
            { componentInstanceMap, target: 'root' },
            { isRoot: true }
        );
        return render(html, container);
    };

    const html = unConnectCustomComponentTemplate.compileToHTMLTemplate(
        updated,
        requestUpdate,
        { componentInstanceMap, target: 'root' },
        { isRoot: true }
    );

    return render(html, container);
}
