import { Component, html } from '../src/core/index';

class C extends Component {
    _value: string;
    constructor() {
        super();
        this._value = '';
    }

    set value(v) {
        this._value = v;
        this.requestUpdate();
    }

    get value() {
        return this._value;
    }

    handleEvent(e) {
        this.value = e.target.value;
    }

    render() {
        return html`
            <div>this is c</div>
            <input
                .value=${this.value}
                @input="${(e) => {
                    this.handleEvent(e);
                }}"
            />
            ${this.value == 'a'
                ? html`
                      <my-a></my-a>
                  `
                : null}
        `;
    }
}

export default C;
