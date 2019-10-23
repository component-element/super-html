// simple render

import { Component, html } from '../../../src/core/index';

class Child extends Component {
    data: string;
    constructor() {
        super();
        console.log('child constructor');
        this.data = 'data';
    }
    render() {
        return [
            html`
                <div>this is child componet render${this.data}</div>
            `,
            html`
                <div>this is child componet render${this.data}</div>
            `
        ];
    }
}

class Child1 extends Component {
    data: string;
    constructor() {
        super();
    }
    render() {
        return html`
            <div>child1</div>
        `;
    }
}
export default class Parent extends Component {
    _flag = true;
    set flag(value) {
        this._flag = value;
        this.requestUpdate();
    }
    get flag() {
        return this._flag;
    }
    handleClick = () => {
        this.flag = !this.flag;
    };
    render() {
        return html`
            <div>
                <button @click="${this.handleClick}">${this._flag ? 'uninstall' : 'install'}</button>
                ${this._flag ? [Child.for(), Child1.for()] : Child1.for()}
            </div>
        `;
    }
}
