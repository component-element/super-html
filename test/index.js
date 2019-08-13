import Component from '../src/component/index.js';
import html from '../src/htmlSimple.js';

import customElements from '../src/component/customElements.js';

import render from '../src/simpleRender.js';

import A from './a.js';
import B from './b.js';

customElements.define('my-a', A);
customElements.define('my-b', B);

class C extends Component {
    constructor(ele) {
        super(ele);
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

customElements.define('my-c', C);

const root = document.getElementById('root');

render(
    html`
        <my-c>
            ${html`
                <my-b>hhhh</my-b>
            `}
        </my-c>
    `,
    root
);
