// simple render

import { Inject, Component, html, Input } from '../../../src/core/index';

export default class Simple extends Component {
    @Input('k-name') name: string;
    constructor(@Inject('service') public service: any) {
        super();
        window['a'] = this;
    }
    render() {
        const message = 'this is a simple test';
        return html`
            <div>${message}</div>
            <div>${this.service.method()}</div>
        `;
    }
}
