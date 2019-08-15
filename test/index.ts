import { render, html, customElements } from '../src/core/index';

import A from './a';
import B from './b';
import C from './c';

customElements.define('my-a', A);
customElements.define('my-b', B);
customElements.define('my-c', C);

const root = document.getElementById('root');

render(
    html`
        <div>hello world</div>
        <my-c></my-c>
    `,
    root
);
