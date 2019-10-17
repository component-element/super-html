// 测试 props 传递

import { Component, html } from '../../../src/core/index';

export default class extends Component {
    render() {
        return html`
            <div>${this.props.message}</div>
        `;
    }
}
