import { Component, html } from '../../../src/core/index';

export default class extends Component {
    flag: boolean = false;
    constructor() {
        super();
        setTimeout(() => {
            this.flag = true;
            this.requestUpdate();
        }, 1000);
    }
    render() {
        if (this.flag) {
            return html`
                <style>
                    .s {
                        min-height: 1rem;
                        border: 1px solid red;
                    }
                </style>
                <div class="s">true</div>
            `;
        }
        return null;
    }
}
