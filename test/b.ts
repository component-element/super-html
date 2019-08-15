import { Component, html } from '../src/core/index';
class B extends Component {
    data: any;
    constructor() {
        super();
        this.data = 9;
    }
    handleClick() {
        this.data = this.data + 1;
        this.requestUpdate();
    }
    render() {
        return html`
            <style>
                .wrap {
                    color: #ff00ff;
                }
            </style>
            ${this.data > 10 && this.data < 15
                ? html`
                      <my-a></my-a>
                  `
                : ''}
            <div
                class="wrap"
                @click="${() => {
                    this.handleClick();
                }}"
            >
                this is b ${this.data}
            </div>
            ${this.data > 16
                ? html`
                      <my-a></my-a>
                  `
                : ''}
        `;
    }
}

export default B;
