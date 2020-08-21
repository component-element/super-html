import { Component, html, Input } from '../../../src/core/index';
import Timer from '../demo/timer';

class Child extends Component {
    @Input() props: any;
    render() {
        return html`
            <div>${this.props}</div>
            ${Timer.for()}
        `;
    }
}

export default class extends Component {
    _number = 1;
    set number(v) {
        this._number = v;
        this.requestUpdate();
    }
    get number() {
        return this._number;
    }
    render() {
        return html`
            <style>
                .colorRed {
                    color: red;
                    font-size: ${this.number + 10}px;
                }
                .btn {
                    display: block;
                }
            </style>
            <div class="colorRed">
                <button
                    class="btn"
                    @click="${() => {
                        this.number++;
                    }}"
                >
                    number ++
                </button>
                ${Child.for(this.number)}
            </div>
        `;
    }
}
