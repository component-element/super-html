import { customElements, App } from '../src/core/index';

import A from './a';
import B from './b';
import C from './c';

customElements.define('my-a', A);
customElements.define('my-b', B);
customElements.define('app-root', C);

const app = new App();
window['app'] = app;
