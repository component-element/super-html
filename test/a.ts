import { Component, html } from '../src/core/index';

class A extends Component {
    data: any;
    constructor() {
        super();
        this.data = {
            a: 1
        };
    }
    set a(v) {
        this.data.a = v;
        this.requestUpdate();
    }
    get a() {
        return this.data.a;
    }
    render() {
        return html`
            <div
                @click="${() => {
                    this.a = this.a + 1;
                }}"
            >
                this a Class ${this.data.a}
            </div>
        `;
    }
}

export default A;
