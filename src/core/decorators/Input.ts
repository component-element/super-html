import { Injectable, Injector, ReflectiveInjector, Type } from 'injection-js';

const PROP_METADATA = '__prop__metadata__';

const props: (...args: any[]) => any = (bindingPropertyName) => ({ bindingPropertyName });

function isType(v: any): v is Type<any> {
    return typeof v === 'function';
}

function getParentCtor(ctor: Function): Type<any> {
    const parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
    const parentCtor = parentProto ? parentProto.constructor : null;
    return parentCtor || Object;
}

function convertTsickleDecoratorIntoMetadata(decoratorInvocations: any[]): any[] {
    if (!decoratorInvocations) {
        return [];
    }
    return decoratorInvocations.map((decoratorInvocation) => {
        const decoratorType = decoratorInvocation.type;
        const annotationCls = decoratorType.annotationCls;
        const annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        return new annotationCls(...annotationArgs);
    });
}

function ctor(this: any, ...args: any[]) {
    const values = props(...args);
    for (const propName in values) {
        this[propName] = values[propName];
    }
}

@Injectable()
export class ProcessProps {
    constructor(public rootInjector: Injector) {}
    createClass(classes) {
        const injector = ReflectiveInjector.resolveAndCreate([classes], this.rootInjector);
        const instance = injector.get(classes);
        instance.__injector = injector;
        return instance;
    }
    propMetadata(typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return {};
        }
        const parentCtor = getParentCtor(typeOrFunc);
        const propMetadata: { [key: string]: any[] } = {};
        if (parentCtor !== Object) {
            const parentPropMetadata = this.propMetadata(parentCtor);
            Object.keys(parentPropMetadata).forEach((propName) => {
                propMetadata[propName] = parentPropMetadata[propName];
            });
        }
        const ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
        if (ownPropMetadata) {
            Object.keys(ownPropMetadata).forEach((propName) => {
                const decorators: any[] = [];
                if (propMetadata.hasOwnProperty(propName)) {
                    decorators.push(...propMetadata[propName]);
                }
                decorators.push(...ownPropMetadata[propName]);
                propMetadata[propName] = decorators;
            });
        }
        return propMetadata;
    }
    private _ownPropMetadata(typeOrFunc: any, parentCtor: any): { [key: string]: any[] } | null {
        // Prefer the direct API.
        if ((<any>typeOrFunc).propMetadata && (<any>typeOrFunc).propMetadata !== parentCtor.propMetadata) {
            let propMetadata = (<any>typeOrFunc).propMetadata;
            if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }

        // API of tsickle for lowering decorators to properties on the class.
        if ((<any>typeOrFunc).propDecorators && (<any>typeOrFunc).propDecorators !== parentCtor.propDecorators) {
            const propDecorators = (<any>typeOrFunc).propDecorators;
            const propMetadata = <{ [key: string]: any[] }>{};
            Object.keys(propDecorators).forEach((prop) => {
                propMetadata[prop] = convertTsickleDecoratorIntoMetadata(propDecorators[prop]);
            });
            return propMetadata;
        }

        // API for metadata created by invoking the decorators.
        if (typeOrFunc.hasOwnProperty(PROP_METADATA)) {
            return (typeOrFunc as any)[PROP_METADATA];
        }
        return null;
    }
    updateProps(instance, props = {}, classes) {
        const propertyMetadata = this.propMetadata(classes);
        Object.keys(propertyMetadata).forEach((propName) => {
            const input = propertyMetadata[propName][propertyMetadata[propName].length - 1];
            if (input['bindingPropertyName'] === undefined) {
                instance[propName] = props;
                return;
            }
            instance[propName] = props[input['bindingPropertyName']];
        });
    }
}

export default function PropDecoratorFactory(this: unknown | typeof PropDecoratorFactory, ...args: any[]): any {
    if (this instanceof PropDecoratorFactory) {
        ctor.apply(this, args);
        return this;
    }
    const decoratorInstance = new (<any>PropDecoratorFactory)(...args);
    function PropDecorator(target: any, name: string): void {
        const constructor = target.constructor;
        const meta = constructor.hasOwnProperty(PROP_METADATA)
            ? constructor[PROP_METADATA]
            : Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
        meta[name] = (meta.hasOwnProperty(name) && meta[name]) || [];
        meta[name].unshift(decoratorInstance);
    }
    return PropDecorator;
}
