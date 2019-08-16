import { Component, html, Props } from '../src/core/index';

class A extends Component {
    @Props({
        attributeName: 'mes'
    })
    mmmm = 'hihihi';
    @Props({
        type: 'json'
    })
    d;
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
                this a ${this.mmmm} Class ${this.data.a}
            </div>
        `;
    }
}

export default A;
