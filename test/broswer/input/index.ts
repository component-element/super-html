import { Component, html } from '../../../src/core/index';

export default class extends Component {
    private _mes = 'default value';
    set mes(v) {
        this._mes = v;
        this.requestUpdate();
    }
    get mes() {
        return this._mes;
    }
    render() {
        return html`
            <style>
                .input:focus {
                    position: fixed;
                    top: 10px;
                    right: 0px;
                    left: 0px;
                    border: 1px solid palegoldenrod;
                }
            </style>
            <div>${this.mes}</div>
            <input
                class="input"
                value="${this.mes}"
                @focus="${(e) => {
                    console.log('focus', e);
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            window.scrollTo(0, 0);
                        });
                    });
                }}"
                @blur="${(e) => {
                    console.log('blur', e);
                }}"
                @input="${(e) => {
                    this.mes = e.target.value;
                }}"
            />
        `;
    }
}
