import { render, html } from '../../src/core/index';

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

const tag = Simple.for();

// const tag = html`
//     ${Simple.for()} ${timer.for()} ${updateChildProps.for()} ${Props.for({ message: 'props 传递成功' })} ${update.for()} ${ext.for()}
//     ${parentchild.for()} ${highLevel.for({ mes: 'highLevel' })} ${differentTag.for()} ${timeoutUpdate.for()} ${input.for()}
//     ${lifeCircle.for()}
// `;

render(tag, root);
// render(Simple.for('has props'), root);

window['fn'] = (str) => render(Simple.for(str), root);
