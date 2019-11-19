import { render, hydrate, html, Component } from '../../src/core/index';

import Simple from './simple/index';
import Props from './props/index';
import update from './update/index';
import ext from './extends/index';
import timer from './demo/timer';
import parentchild from './installAndUninstalChildComponent/index';
import highLevel from './highLevelComponent/index';
import updateChildProps from './updateChildProps';
import differentTag from './differentTag/index';
import timeoutUpdate from './timeoutUpdate/index';
import input from './input/index';
import lifeCircle from './lifeCircle';

const root = document.getElementById('root');
const app = document.getElementById('app');

const tag = html`
    ${Simple.for()} ${timer.for()} ${updateChildProps.for()} ${Props.for({ message: 'props 传递成功' })} ${update.for()} ${ext.for()}
    ${parentchild.for()} ${highLevel.for({ mes: 'highLevel' })} ${differentTag.for()} ${timeoutUpdate.for()} ${input.for()}
    ${lifeCircle.for()}
`;

// render(tag, root);
// root.style.display = 'none';

import css from '../../src/css/index';

class A extends Component {
    styles: {
        [key: string]: any;
    } = {
        div: null,
        btn: null
    };
    _size = 12;
    get size() {
        return this._size;
    }
    set size(v) {
        this._size = v;
        this.requestUpdate();
    }
    makeStyles() {
        this.styles.div = css`
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: goldenrod;
            font-size: ${this.size}px;
            border: 1px solid blueviolet;
        `;
        this.styles.btn = css`
            padding: 8px;
            font-size: 16px;
            text-align: center;
            border-radius: 4px;
            border: 1px solid blue;
            background: rgba(28, 0, 255, 0.3);
            outline: none;
            user-select: none;
            cursor: pointer;
            &:hover {
                background: rgba(28, 0, 255, 0.5);
            }
        `;
    }
    render() {
        // this.makeStyles();
        // const { div, btn } = this.styles;
        return html`
            <div>
                <span>testcss</span>
                <button
                    @click="${() => {
                        this.size += 2;
                    }}"
                >
                    to big
                </button>
                <button
                    @click="${() => {
                        this.size -= 2;
                    }}"
                >
                    to small
                </button>
            </div>
        `;
    }
}

window['fn'] = () =>
    hydrate(
        html`
            <div>
                <span>testcss</span>
                <button>
                    to big
                </button>
                <button>
                    to small
                </button>
            </div>
        `,
        app
    );

window['fn1'] = () =>
    hydrate(
        html`
            <div>
                <span>testcss</span>
                <button>
                    to big
                </button>
                <button>
                    to small
                </button>
            </div>
        `,
        app
    );

// render(
//     html`
//         ${A.for()}
//     `,
//     app
// );
