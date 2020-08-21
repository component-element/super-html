import { ReflectiveInjector } from 'injection-js';
import { render, RenderOptions, parts, templateResultNodePartMap } from '../../../../lit-html/src/lit-html';

import Component from '../component/index';
import { TemplateTag } from '../templateTag/index';

import updateInstance from './updateInstance';

import { ProcessorTemplateTagToTemplateResult } from './genarateTemplateTagToTemplateResult';
import processorLifeCircle from './processorLifeCircle';
import { ProcessProps } from '../decorators/Input';

// Component.registerUpdateCallback(updateInstance);

export { parts, templateResultNodePartMap };

export function boostrap(appModuleClasses) {
    const metaData = appModuleClasses['__proto__module'];
    const injector = ReflectiveInjector.resolveAndCreate([
        ProcessorTemplateTagToTemplateResult,
        ProcessProps,
        appModuleClasses,
        ...metaData.providers
    ]);
    const app = injector.get(appModuleClasses);
    const container = injector.get(HTMLElement);
    const t = app.render();
    const processor: ProcessorTemplateTagToTemplateResult = injector.get(ProcessorTemplateTagToTemplateResult);
    const templateR = processor.wrapGenarateTemplateTagToTemplateResult(t, container);
    const renderResult = render(templateR, container, {});
    processor.processorLifeCircle();
    // processorLifeCircle(processor.instanceConnectAndDisConnectTask);
    return renderResult;
}

export default function(t: TemplateTag, container: Element | DocumentFragment, options?: Partial<RenderOptions>) {
    const injector = ReflectiveInjector.resolveAndCreate([ProcessorTemplateTagToTemplateResult]);
    const processor: ProcessorTemplateTagToTemplateResult = injector.get(ProcessorTemplateTagToTemplateResult);
    const templateR = processor.wrapGenarateTemplateTagToTemplateResult(t, container);
    const renderResult = render(templateR, container, options);
    processorLifeCircle(processor.instanceConnectAndDisConnectTask);
    return renderResult;
}
