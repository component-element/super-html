import { Component, html } from '../../../src/core/index';

class Interval extends Component {
    data = 1;
    timer = null;
    d: any;
    constructor(props) {
        super(props);
        this.d = props;
    }
    render() {
        return html`
            <div>${this.d}</div>
            <div id="interval">this is use lifeCircle update ${this.data}</div>
        `;
    }
    propsChangedCallback(newProps) {
        this.d = newProps;
    }
    connectedCallback() {
        console.log('connectedCallback');
        this.timer = setInterval(() => {
            console.log('do setInterval');
            this.data++;
            this.requestUpdate();
        }, 1000);
    }
    disconnectedCallback() {
        clearTimeout(this.timer);
    }
}

export default class extends Component {
    flag = true;
    childProps = '第一次数据';
    render() {
        return html`
            <style>
                .interval_btn {
                    border: 1px solid blue;
                }
            </style>
            <div>
                <h3>Interval parent component</h3>
                <div
                    class="interval_btn"
                    @click="${() => {
                        this.flag = !this.flag;
                        this.requestUpdate();
                    }}"
                >
                    click this disconnect Interval
                </div>
                <div
                    @click="${() => {
                        this.childProps += 1;
                        this.requestUpdate();
                    }}"
                >
                    修改props
                </div>
                <p>
                    ${this.flag
                        ? Interval.for(this.childProps)
                        : html`
                              <div>Interval disconnect</div>
                          `}
                </p>
            </div>
        `;
    }
}
