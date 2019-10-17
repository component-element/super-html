// simple render

import { Component, html } from '../../../src/core/index';

export default class Timer extends Component {
    get d() {
        requestAnimationFrame(() => {
            this.requestUpdate();
        });
        return new Date().toString();
    }
    render() {
        return html`
            <div>${this.d}</div>
        `;
    }
}
