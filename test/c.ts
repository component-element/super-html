import { Component, html, Props } from '../src/core/index';

class CBase extends Component {
    @Props({
        type: 'number'
    })
    name = 'some value';
}

class C extends CBase {
    @Props({
        type: 'string'
    })
    name = 'some value';
    @Props({
        type: 'string'
    })
    name1 = 'some value';
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
            <div>this is ${this.name}</div>
            input:
            <input
                class="${'a'}"
                .value=${this.value}
                @input="${(e) => {
                    this.handleEvent(e);
                }}"
            />
            <my-a
                mes=${this.value}
                .d="${{ m: 'd' }}"
                @click="${() => {
                    console.log('click my -a');
                }}"
            ></my-a>
        `;
    }
}

export default C;
