import 'reflect-metadata';
export { Injectable, Inject } from 'injection-js';
import render, { boostrap, parts } from './render/index';
import html from './templateTag/index';
import Component from './component/index';

export * from './decorators/index';

export { render, html, Component, parts, boostrap };

export default {
    render,
    html,
    Component,
    parts
};
