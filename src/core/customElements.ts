import Component, { stateLessFunction, ComponentClass } from './component';

const tagNameReg = /^[a-z]{1,}\-[a-z]{1,}[a-z\-]{0,}$/;

const isExtends = (ClassA, ClassB) => {
    let proto = ClassA && Object.getPrototypeOf(ClassA);
    while (proto != null) {
        if (proto === ClassB) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};

let customElements: CustomElementRegistry;

class CustomElementRegistry {
    static defineTagNameProperty(component, tagName) {
        Object.defineProperty(component.prototype, 'tagName', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: tagName.toUpperCase()
        });
        return component;
    }
    customElementsMap: Map<string, ComponentClass>;
    constructor() {
        if (customElements) {
            return customElements;
        }
        this.customElementsMap = new Map();
        customElements = this;
    }
    get(tagName) {
        return this.customElementsMap.get(tagName);
    }
    getAllTagName() {
        return [...this.customElementsMap.keys()];
    }
    define(tagName, component: ComponentClass | stateLessFunction) {
        if (!tagNameReg.test(tagName + '')) {
            throw new Error(`${tagName} is not a valid custom element name.`);
        }
        if (this.customElementsMap.has(tagName)) {
            throw new Error(`this tagName(${tagName}) has already been used with this registry`);
        }
        if (typeof component !== 'function') {
            throw new Error(`The callback provided as parameter 2 is not a function.`);
        }
        if (isExtends(component, Component)) {
            this.customElementsMap.set(`${tagName}`, component as ComponentClass);
            CustomElementRegistry.defineTagNameProperty(component, tagName);
            return component;
        }
        const ClassComponent = Component.genarateFn(component as stateLessFunction);
        this.customElementsMap.set(`${tagName}`, ClassComponent);
        CustomElementRegistry.defineTagNameProperty(ClassComponent, tagName);
        return ClassComponent;
    }
}

customElements = new CustomElementRegistry();

export default customElements;
