import { DefaultTemplateProcessor } from '../../../../lit-html/src/lib/default-template-processor';
import { TemplateResult } from '../../../../lit-html/src/lib/template-result';
import ChildInstanceManager from './childInstanceManager';
import { ComponentTemplateToken, SimpleTemplateToken, SimpleTemplateTag, ComponentTemplateTag, TemplateTag } from '../templateTag/index';
import { RenderComponent } from '../component';
import { CONNECT_TYPE, DISCONNECT_TYPE } from './processorLifeCircle';
import { RenderOptions } from '../../../../lit-html/src/lib/render-options';
import { Part } from '../../../../lit-html/src/lib/part';
import { EventPart, EventHandlerWithOptions } from '../../../../lit-html/src/lib/parts';

export const instanceTemplateResultMap = new WeakMap();

class WithZoneEventPart extends EventPart {
    zone: any;
    constructor(zone: any, element: Element, eventName: string, eventContext?: EventTarget) {
        super(element, eventName, eventContext);
        this.zone = zone;
    }
    setValue(value: undefined | EventHandlerWithOptions): void {
        const eventZone = this.zone;
        if (typeof value === 'function') {
            let withZonevalue;
            if (value.constructor.name === 'AsyncFunction') {
                withZonevalue = function(...args) {
                    return eventZone.run(value, this, args).then((r) => r);
                };
            } else {
                withZonevalue = function(...args) {
                    return eventZone.run(value, this, args);
                };
            }
            return super.setValue(withZonevalue);
        }
        return super.setValue(value);
    }
}

class WithZoneDefaultTemplateProcessor extends DefaultTemplateProcessor {
    constructor(private zone) {
        super();
        this.zone = zone;
    }
    handleAttributeExpressions(element: Element, name: string, strings: string[], options: RenderOptions): ReadonlyArray<Part> {
        const prefix = name[0];
        if (prefix === '@') {
            return [new WithZoneEventPart(this.zone, element, name.slice(1), options.eventContext)];
        }
        return super.handleAttributeExpressions(element, name, strings, options);
    }
}

export class ProcessorTemplateTagToTemplateResult {
    zone: any;
    html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
    constructor(zone) {
        this.zone = zone;
        const zoneDefaultTemplateProcessor = new WithZoneDefaultTemplateProcessor(zone);
        this.html = (strings: TemplateStringsArray, ...values: unknown[]) =>
            new TemplateResult(strings, values, 'html', zoneDefaultTemplateProcessor);
    }
    instanceConnectAndDisConnectTask = [];
    initParentChildren(parentComponent: any) {
        return ChildInstanceManager.create(parentComponent);
    }
    addNewInstance(childrenInstanceManager: ChildInstanceManager, instance: RenderComponent) {
        childrenInstanceManager.addNewInstance(instance);
        this.instanceConnectAndDisConnectTask.push({
            instance,
            type: CONNECT_TYPE
        });
    }
    clearInstance(instances: RenderComponent[]) {
        instances.forEach((instance) => {
            this.instanceConnectAndDisConnectTask.push({
                instance,
                type: DISCONNECT_TYPE
            });
        });
    }
    instanceRender(instance) {
        const templateTag = instance.render();
        const templateResult = this.wrapGenarateTemplateTagToTemplateResult(templateTag, instance);
        instanceTemplateResultMap.set(instance, templateResult);
        return templateResult;
    }
    wrapGenarateTemplateTagToTemplateResult(t: TemplateTag | TemplateTag[], parent: any) {
        const childrenInstanceManager = this.initParentChildren(parent);
        const result = this.genarateTemplateTagToTemplateResult(t, parent);
        const clearChildren = childrenInstanceManager.clearLastNotUseChildInstance();
        this.clearInstance(clearChildren);
        return result;
    }
    genarateValueToTemplateResult(t, parent) {
        if (typeof t === 'object' && t !== null && (t.type === SimpleTemplateToken || t.type === ComponentTemplateToken)) {
            return this.genarateTemplateTagToTemplateResult(t, parent);
        }
        if (Array.isArray(t)) {
            return t.map((item) => this.genarateValueToTemplateResult(item, parent));
        }
        return t;
    }
    genarateTemplateTagToTemplateResult(t: TemplateTag | Array<TemplateTag>, parent): TemplateResult | Array<TemplateResult> {
        const { html } = this;
        const childrenInstanceManager = this.initParentChildren(parent);
        if (
            typeof t === 'object' &&
            t !== null &&
            !Array.isArray(t) &&
            (t.type === SimpleTemplateToken || t.type === ComponentTemplateToken)
        ) {
            if (t.type === ComponentTemplateToken) {
                const componentTemplateTag = t as ComponentTemplateTag;
                const { component, props } = componentTemplateTag;
                const childComponentInfo = childrenInstanceManager.findCanReUseIntance(component); //  findIntanceFromChildrenComponentInfo(component, childrenInstaneManager);

                let instance: RenderComponent;

                if (childComponentInfo) {
                    instance = childComponentInfo.instance;
                    // update child props
                    if (props != instance.props) {
                        instance.propsChangedCallback(props);
                    }
                    childComponentInfo.instance.props = props;
                    const clearChildren = childrenInstanceManager.clearMiddleNotUseChildInstance(childComponentInfo.i);
                    this.clearInstance(clearChildren);
                } else {
                    instance = new component(props);
                    this.addNewInstance(childrenInstanceManager, instance);
                }

                return this.instanceRender(instance);
            }
            if (t.type === SimpleTemplateToken) {
                const simpleTemplateTag = t as SimpleTemplateTag;
                const { strings, values } = simpleTemplateTag;
                const result = html(strings, ...values.map((item) => this.genarateValueToTemplateResult(item, parent)));
                return result;
            }
        } else if (Array.isArray(t)) {
            return t.map((item) => this.genarateTemplateTagToTemplateResult(item, parent)).flat();
        } else {
            return html`
                ${t ? String(t) : ''}
            `;
        }
    }
}
