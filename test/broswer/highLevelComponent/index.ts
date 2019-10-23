import { Component, html } from '../../../src/core/index';
import { ComponentClass } from '../../../src/core/component';

const fn = function(comp: ComponentClass) {
    return class extends Component {
        render() {
            return html`
                ${comp.for({
                    ...this.props,
                    key: 'add a key'
                })}
            `;
        }
    };
};

class Mes extends Component {
    render() {
        return html`
            <div>${JSON.stringify(this.props)}</div>
        `;
    }
}

export default fn(Mes);
