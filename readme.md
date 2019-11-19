# super-html
Efficient, Expressive, Extensible HTML templates in JavaScript

## Documentation

Full documentation is doing.

## Overview

`super-html` lets you write [HTML templates](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) in JavaScript with [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

super-html templates are plain JavaScript and combine the familiarity of writing HTML with the power of JavaScript. super-html takes care of efficiently rendering templates to DOM, including efficiently updating the DOM with new values.

```javascript
import {html, render} from 'super-html';

// This is a super-html template function. It returns a super-html template.
const helloTemplate = (name) => html`<div>Hello ${name}!</div>`;

// This renders <div>Hello byte!</div> to the document body
render(helloTemplate('byte'), document.body);

// This updates to <div>Hello toutiao!</div>, but only updates the ${name} part
render(helloTemplate('toutiao'), document.body);
```

`super-html` provides two main exports:

 * `html`: A JavaScript [template tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) used to produce a `TemplateResult`, which is a container for a template, and the values that should populate the template.
 * `render()`: A function that renders a `TemplateResult` to a DOM container, such as an element or shadow root.

```javascript
import {html, render, Component} from 'super-html';

// make a component
class App extends Component {
    render() {
        return html`
            <h1>hello ${this.props || 'wolrd'}!</h1>
        `
    }
}

// This render App to the document body
render(html`${App.for()}`, document.body);

// This render App with Props to the document body
render(html`${App.for('developer')}`, document.body);
```
 * `Component`: A class the base of Component.

```javascript
import {html, render, Component} from 'super-html';

// make a timer component
class Timer extends Component {
    get time() {
        return new Date() + "";
    }
    render() {
        return html`
            <div>
                <span>${this.time}</span>
            </div>
        `
    }
    connectedCallback() {
        this.timer = setInterval(() => {
            this.requestUpdate();
        }, 1000);
    }
    disconnectedCallback() {
        clearTimeout(this.timer);
    }
}

// This render Timer to the document body
render(html`${Timer.for()}`, document.body);
```
 * `connectedCallback`: Called every time the component is connected to the DOM..
 * `disconnectedCallback`: Called every time the component is disconnected from the DOM.


## Installation

```bash
$ npm install super-html
```

## Contributing

Please send email to [843022618@qq.com](843022618@qq.com).

## feature
    移除组件生命周期 自动更新 或者 装饰器更新
    移除 props 耦合
    dom 操作接口暴露
    更多测试用例
    细节优化、性能优化