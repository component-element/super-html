// 测试 props 传递

import { Component, html, Input } from '../../../src/core/index';

export default class extends Component {
    @Input('message') message: string;
    render() {
        return html`
            <div>message: ${this.message}</div>
        `;
    }
}
