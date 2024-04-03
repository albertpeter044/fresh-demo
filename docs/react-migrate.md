# types
## Preact.ReactNode 
在 Preact 中，你可以使用 preact.ComponentChildren来代替 React.ReactNode。以下是如何在代码中进行替换：

    children?: preact.ComponentChildren;

    type ComponentChildren = ComponentChild[] | ComponentChild;
    type ComponentChild =
        | VNode<any>
        | object
        | string
        | number
        | bigint
        | boolean
        | null
        | undefined;
    interface VNode<P = {}> {
        type: ComponentType<P> | string;
        props: P & { children: ComponentChildren };
        key: Key;
    }

还有 react Component 替代(function or class)

    preact.Component = {
       componentWillMount?(): void;
        componentDidMount?(): void;
        componentWillUnmount?(): void; 
        ....
    }

## ReactElement
代替

    import { h, JSX } from 'preact';

    const myComponent: JSX.Element

## css
import type {CSSProperties} from 'preact/compat'

# hook

    import {useContext, useEffect, useMemo, useState, useRef} from 'preact/hooks';

    // import {createPortal} from 'react-dom';
    import { createPortal } from 'preact/compat';

## Children
    // React.Children.foreach(children, fn)
    import {Children} from 'preact/compat'
