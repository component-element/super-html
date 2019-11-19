import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const commonPlugins = [
    nodeResolve(),
    babel({
        // exclude: ['node_modules/**', '../../node_modules/**']
        // plugins: ["external-helpers"],
        // externalHelpers: true
    }),
    commonjs({
        ignoreGlobal: true
    }),
    terser()
];

const browserConfig = {
    input: 'dist/component/src/core/index.js',
    plugins: commonPlugins,
    output: [
        {
            file: './index.mjs',
            format: 'module',
            exports: 'Component, default, html, parts, render'
            // sourcemap: true
        },
        {
            file: './index.js',
            format: 'cjs',
            exports: 'Component, default, html, parts, render'
            // sourcemap: true
        }
        // {
        //     file: 'output/umd/index.js',
        //     format: 'umd',
        //     name: 'bytehtml',
        //     // sourcemap: true
        // }
    ]
};

export default [browserConfig];
