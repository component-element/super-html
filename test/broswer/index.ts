import { render, html } from '../../src/core/index';

import Simple from './simple/index';
import Props from './props/index';
import update from './update/index';
import ext from './extends/index';
import timer from './demo/timer';
import parentchild from './installAndUninstalChildComponent/index';

const root = document.getElementById('root');

render(
    html`
        ${Simple.for()} ${Props.for({ message: 'props 传递成功' })} ${update.for()} ${ext.for()} ${parentchild.for()} ${timer.for()}
    `,
    root
);
