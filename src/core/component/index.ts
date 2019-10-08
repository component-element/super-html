import { TemplateTag, genarateComponetTemplateTag } from '../templateTag/index';

const stateLessToken = Symbol('stateLessToken');

let updateInstance;

class BaseComponent {
    static registerUpdateCallback(fn) {
        updateInstance = fn;
    }
    props: any;
    constructor(props = {}) {
        this.props = props;
    }
    requestUpdate() {
        if (typeof updateInstance === 'function') {
            updateInstance(this);
        }
    }
}

export interface stateLessFunction {
    (): TemplateTag;
}

export interface RenderComponent extends Component {
    render(): TemplateTag;
}

export interface stateLessRenderComponent extends Component {
    [stateLessToken]: boolean;
    render(): TemplateTag;
}

export interface RenderComponentClass {
    new (props?: any): RenderComponent;
}

export interface ComponentClass {
    new (props?: any): Component;
}

export interface StateLessComponentClass {
    new (props?: any): stateLessRenderComponent;
}

class Component extends BaseComponent {
    static for(props?) {
        return genarateComponetTemplateTag(this, props);
    }
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
