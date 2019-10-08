import { render, RenderOptions, parts, templateResultNodePartMap } from '../../../../lit-html/src/lit-html';

import Component from '../component/index';
import { TemplateTag } from '../templateTag/index';

import updateInstance from './updateInstance';

import genarateTemplateTagToTemplateResult from './genarateTemplateTagToTemplateResult';

Component.registerUpdateCallback(updateInstance);

export { parts, templateResultNodePartMap };

export default function(t: TemplateTag, container: Element | DocumentFragment, options?: Partial<RenderOptions>) {
    const templateR = genarateTemplateTagToTemplateResult(t, container);
    return render(templateR, container, options);
}
