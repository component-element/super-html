// simple render

import { Component, html } from '../../../src/core/index';

export default class Simple extends Component {
    name: string = 'world';
    count: number = 0;
    propsChangedCallback(...args) {
        console.log('propsChangedCallback', args);
    }
    render() {
        const message = 'hello ';
        return html`
            <div
                data-i="${100}"
                @click="${() => {
                    setTimeout(() => {
                        this.count += 1;
                        this.name = 'zone is ok!';
                    }, 1000);
                }}"
            >
                <h3>${this.props}</h3>
                <div>count: ${this.count}</div>
                ${message}${this.name}
            </div>
        `;
    }
    connectedCallback() {
        console.log('simple connectedCallback');
        setInterval(() => {
            console.log('setInterval');
            this.count += 1;
        }, 1000);
    }
}
