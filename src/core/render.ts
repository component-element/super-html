import { render, TemplateResult, RenderOptions } from 'lit-html';

export default function(result: TemplateResult, container: Element | DocumentFragment, options?: Partial<RenderOptions>) {
    return render(result, container, options);
}
