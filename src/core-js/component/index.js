class BaseComponent {
    requestUpdate() {
        console.log('do BaseComponent requestUpdate');
        return this;
    }
}

export default class Component extends BaseComponent {}
