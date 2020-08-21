import { RenderComponent } from '../component';

export const CONNECT_TYPE: Symbol = Symbol('connect');
export const DISCONNECT_TYPE: Symbol = Symbol('disconnect');

type Task = {
    instance: RenderComponent;
    type: Symbol;
};

export default function(tasks: Task[]) {
    tasks.map(({ instance, type }) => {
        if (type === CONNECT_TYPE) {
            instance.connectedCallback();
            return;
        }
        if (type === DISCONNECT_TYPE) {
            instance.disconnectedCallback();
            return;
        }
    });
    tasks.length = 0;
}
