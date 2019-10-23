import { Component, html } from '../../../src/core/index';

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (Math.random() * 2 > 1) {
            return html`
                <h1
                    @click="${() => {
                        this.requestUpdate();
                    }}"
                >
                    ${'>1'}
                </h1>
            `;
        }
        return html`
            <div
                @click="${() => {
                    this.requestUpdate();
                }}"
            >
                ${'<1'}
            </div>
        `;
    }
}
