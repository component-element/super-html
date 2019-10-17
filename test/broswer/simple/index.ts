// simple render

import { Component, html } from '../../../src/core/index';

export default class Simple extends Component {
    render() {
        const message = 'this is a simple test';
        return html`
            <div>${message}</div>
        `;
    }
}
