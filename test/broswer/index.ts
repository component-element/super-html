import { render, boostrap, html } from '../../src/core/index';

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

class Service {
    method() {
        return 'this is a service';
    }
}

class App {
    static get __proto__module() {
        return {
            providers: [
                {
                    provide: HTMLElement,
                    useValue: root
                },
                {
                    provide: 'service',
                    useClass: Service
                }
            ]
        };
    }
    render() {
        return html`
            ${Simple.for()} ${timer.for()} ${updateChildProps.for()} ${Props.for({ message: 'props 传递成功' })} ${update.for()}
            ${ext.for()} ${parentchild.for()} ${highLevel.for({ mes: 'highLevel' })} ${differentTag.for()} ${timeoutUpdate.for()}
            ${input.for()} ${lifeCircle.for()}
        `;
        // return html`
        //     ${Simple.for({})} ${timer.for()}
        // `;
    }
}

boostrap(App);
