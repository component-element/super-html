import { RenderComponentClass } from '../component/index';

export const ComponentTemplateToken = Symbol('component');
export const SimpleTemplateToken = Symbol('basic');

export interface SimpleTemplateTag {
    strings: TemplateStringsArray;
    values: Array<any>;
    type: Symbol;
}

export interface ComponentTemplateTag {
    component: RenderComponentClass;
    props: any;
    type: Symbol;
}

export type TemplateTag = SimpleTemplateTag | ComponentTemplateTag;

const genarateSimpleTemplateTag = function(strings: TemplateStringsArray, ...values): SimpleTemplateTag {
    return {
        strings,
        values,
        type: SimpleTemplateToken
    };
};

export const genarateComponetTemplateTag = function(f, props: any): ComponentTemplateTag {
    return {
        component: f,
        props,
        type: ComponentTemplateToken
    };
};

export default function(strings: TemplateStringsArray, ...values): TemplateTag {
    return genarateSimpleTemplateTag(strings, ...values);
}
