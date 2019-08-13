import { TemplateResult } from 'lit-html';

const stateLessToken = Symbol('stateLessToken');

class BaseComponet {
    requestUpdate() {}
}

export interface stateLessFunction {
    (): TemplateResult;
}

export interface RenderComponent extends BaseComponet {
    render(): TemplateResult;
}

export interface stateLessRenderComponent extends BaseComponet {
    [stateLessToken]: boolean;
    render(): TemplateResult;
}

export interface ComponentClass {
    new (): RenderComponent;
}

export interface StateLessComponentClass {
    new (): stateLessRenderComponent;
}

class Component extends BaseComponet {
    static genarateFn(fn: stateLessFunction): StateLessComponentClass {
        return class extends Component {
            [stateLessToken] = true;
            render() {
                return fn();
            }
        };
    }
}

export default Component;
