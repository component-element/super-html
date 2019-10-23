import { render, RenderOptions, parts, templateResultNodePartMap } from '../../../../lit-html/src/lit-html';

import Component from '../component/index';
import { TemplateTag } from '../templateTag/index';

import updateInstance from './updateInstance';

import { ProcessorTemplateTagToTemplateResult } from './genarateTemplateTagToTemplateResult';
import processorLifeCircle from './processorLifeCircle';

Component.registerUpdateCallback(updateInstance);

export { parts, templateResultNodePartMap };

export default function(t: TemplateTag, container: Element | DocumentFragment, options?: Partial<RenderOptions>) {
    const processor = new ProcessorTemplateTagToTemplateResult();
    const templateR = processor.wrapGenarateTemplateTagToTemplateResult(t, container);
    const renderResult = render(templateR, container, options);
    processorLifeCircle(processor.instanceConnectAndDisConnectTask);
    return renderResult;
}
