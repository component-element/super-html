// 测试更新 render

import { Component, html } from '../../../src/core/index';

export default class extends Component {
    _number = 0;
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
        this.requestUpdate();
    }
    render() {
        return html`
            <div>
                <p>number: ${this.number}</p>
                <button
                    @click="${() => {
                        this.number++;
                    }}"
                >
                    点击我number++
                </button>
            </div>
        `;
    }
}
