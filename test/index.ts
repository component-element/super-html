import { render, html } from '../src/core/index';

import A from './a';

const root = document.getElementById('root');

render(
    html`
        it is ok ! ${[A.for({ mes: 'world', json: { mes: 'this is a json!' } })]}
    `,
    root
);
