import 'zone.js';
import { render, parts } from '../../../../lit-html/src/lib/render';
import { templateResultNodePartMap } from '../../../../lit-html/src/lib/parts';
import { RenderOptions } from '../../../../lit-html/src/lib/render-options';

import Component from '../component/index';
import { TemplateTag } from '../templateTag/index';

import updateInstance from './updateInstance';

import { ProcessorTemplateTagToTemplateResult, instanceTemplateResultMap } from './genarateTemplateTagToTemplateResult';
import processorLifeCircle from './processorLifeCircle';
import { makeZone, zones } from './zone';

Component.registerUpdateCallback(updateInstance);

export { parts, templateResultNodePartMap };

export default function(t: TemplateTag, container: Element | DocumentFragment, options?: Partial<RenderOptions>) {
    let zone = zones.get(container);
    if (!zone) {
        zone = makeZone();
        zones.set(container, zone);
    }

    function rootRender() {
        const processor = new ProcessorTemplateTagToTemplateResult(zone);
        const templateR = processor.wrapGenarateTemplateTagToTemplateResult(t, container);
        const renderResult = render(templateR, container, options);
        if (processor.instanceConnectAndDisConnectTask.length) {
            zone.run(() => {
                processorLifeCircle(processor.instanceConnectAndDisConnectTask);
            });
        }
        return renderResult;
    }

    zone.setAfterTask(rootRender);

    const renderResult = rootRender();
    return renderResult;
}
