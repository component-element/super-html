import render, { parts } from './render/index';
import html from './templateTag/index';
import Component from './component/index';

export * from './decorators/index';

export { render, html, Component, parts };

export default {
    render,
    html,
    Component,
    customElements
};
