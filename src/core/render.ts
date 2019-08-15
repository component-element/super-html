import { render, TemplateResult, RenderOptions } from 'lit-html';
import Manager from './manager';

export default function(result: TemplateResult, container: Element | DocumentFragment, options?: Partial<RenderOptions>) {
    render(result, container, options);
    new Manager(container as Element);
}
