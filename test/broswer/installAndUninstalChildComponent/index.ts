// simple render

import { Component, html } from '../../../src/core/index';

class Child extends Component {
    constructor() {
        super();
        console.log('child constructor');
    }
    render() {
        return html`
            <div>this is child componet render</div>
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
                ${!this._flag ? null : Child.for()}
            </div>
        `;
    }
}
