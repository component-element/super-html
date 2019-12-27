import { TemplateTag, genarateComponetTemplateTag, ComponentTemplateTag } from '../templateTag/index';

const stateLessToken = Symbol('stateLessToken');

let updateInstance;

class BaseComponent {
    static registerUpdateCallback(fn) {
        updateInstance = fn;
    }
    props: any;
    constructor(props) {
        this.props = props;
    }
    requestUpdate() {
        // if (typeof updateInstance === 'function') {
        //     updateInstance(this);
        // }
    }
    connectedCallback() {}
    disconnectedCallback() {}
    propsChangedCallback(newProps?: any) {}
}

export interface StateLessFunction {
    (props?: any): TemplateTag;
}

export interface RenderComponent extends Component {
    render(): TemplateTag;
}

export interface StateLessRenderComponent extends Component {
    [stateLessToken]: boolean;
    render(): TemplateTag;
}

export interface RenderComponentClass {
    new (props?: any): RenderComponent;
}

export interface ComponentClass {
    for(props?): ComponentTemplateTag;
    new (props?: any): Component;
}

export interface StateLessComponentClass {
    for(props?): ComponentTemplateTag;
    new (props?: any): StateLessRenderComponent;
}

class Component extends BaseComponent {
    static for(props?) {
        return genarateComponetTemplateTag(this, props);
    }
    static genarateFn(fn: StateLessFunction): StateLessComponentClass {
        return class extends Component {
            [stateLessToken] = true;
            render() {
                return fn(this.props);
            }
        };
    }
}

export default Component;
