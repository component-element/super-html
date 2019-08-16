import 'reflect-metadata';

export type propsOptionTypes = 'string' | 'number' | 'boolean' | 'json'; //| String | Number | Boolean | JSON;

export interface PropsOption {
    type?: propsOptionTypes;
    attributeName?: string;
    shouldUpdate?: Boolean;
}

export type PropertyKey = string | symbol;

const defaultOption: PropsOption = {
    type: 'string',
    shouldUpdate: true
};

export const propsToken = Symbol('props');

function Props(option: PropsOption = {}) {
    return function(target: Object, key: PropertyKey) {
        const oldOption = Reflect.getMetadata(propsToken, target) || {};
        const attributeName = String(key).toLocaleLowerCase();
        Reflect.defineMetadata(
            propsToken,
            {
                ...oldOption,
                [key]: {
                    ...defaultOption,
                    attributeName,
                    ...option
                }
            },
            target
        );
    };
}

// export function PropsMethod(target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
//     const method = descriptor.value;
//     return {
//         ...descriptor,
//         value: function(...args) {
//             const option = Reflect.getMetadata(token, this instanceof target.constructor ? this.__proto__ : target);
//             return method.apply(this, [...args, option]);
//         }
//     };
// }

export default Props;
