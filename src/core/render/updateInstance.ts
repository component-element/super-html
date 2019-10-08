import { templateResultNodePartMap } from '../../../../lit-html/src/lit-html';
import genarateTemplateTagToTemplateResult, { instanceTemplateResultMap } from './genarateTemplateTagToTemplateResult';

export function findNodePart(instance) {
    const templateResult = instanceTemplateResultMap.get(instance);
    const nodePart = templateResultNodePartMap.get(templateResult);
    return nodePart;
}

export default function updateInstance(instance) {
    const nodePart = findNodePart(instance);
    const result = instance.render();
    const templateR = genarateTemplateTagToTemplateResult(result, instance);
    nodePart.setValue(templateR);
    return nodePart.commit();
}
