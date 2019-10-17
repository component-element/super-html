// simple render

import { Component, html } from '../../../src/core/index';

function fn(mes) {
    return html`
        <div>${mes}</div>
    `;
}

const f = Component.genarateFn(fn);

const message = 'this is function render';

export default class extends Component {
    render() {
        return html`
            <div>${fn(message)}</div>
            ${f.for(message)}
        `;
    }
}
