import { templateResultNodePartMap } from '../../../../lit-html/src/lit-html';
import { instanceTemplateResultMap, ProcessorTemplateTagToTemplateResult } from './genarateTemplateTagToTemplateResult';
import processorLifeCircle from './processorLifeCircle';

export function findTemplateResult(instance) {
    return instanceTemplateResultMap.get(instance);
}

export function findNodePart(instance) {
    const templateResult = instanceTemplateResultMap.get(instance);
    const nodePart = templateResultNodePartMap.get(templateResult);
    return nodePart;
}

export default function updateInstance(instance) {
    const nodePart = findNodePart(instance);
    const oldTemplateResult = findTemplateResult(instance);
    if (nodePart['__pendingValue'] !== oldTemplateResult) {
        return console.warn('disconnect instance cant update');
    }

    const processor = new ProcessorTemplateTagToTemplateResult();

    const newTemplateResult = processor.instanceRender(instance);
    nodePart.setValue(newTemplateResult);
    const updateResult = nodePart.commit();
    if (processor.instanceConnectAndDisConnectTask.length > 0) {
        processorLifeCircle(processor.instanceConnectAndDisConnectTask);
    }
    return updateResult;
}
