import { TemplateTag, genarateComponetTemplateTag, ComponentTemplateTag } from '../templateTag/index';
import updateInstance from '../render/updateInstance';

const stateLessToken = Symbol('stateLessToken');

class BaseComponent {
    __injector: any;
    requestUpdate() {
        updateInstance(this.__injector, this);
    }
    connectedCallback() {}
    disconnectedCallback() {}
    propsChangedCallback(newProps?: any) {}
}

// export interface stateLessFunction {
//     (props?: any): TemplateTag;
// }

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
    new (): StateLessRenderComponent;
}

class Component extends BaseComponent {
    static for(props?) {
        return genarateComponetTemplateTag(this, props);
    }
    // static genarateFn(fn: stateLessFunction): StateLessComponentClass {
    //     return class extends Component {
    //         [stateLessToken] = true;
    //         render() {
    //             return fn(this.props);
    //         }
    //     };
    // }
}

export default Component;
