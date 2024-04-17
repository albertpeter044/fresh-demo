import { h, ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';

interface ComProps {
  onChange?: (v: any) => void;
  title?: string;
}

function Com({ onChange, title }: ComProps) {
  return (
    <div className="flex flex-col">
      Inner prop: {title}
      <input class="border" onChange={(e) => onChange?.(e.currentTarget.value)} defaultValue="1" />
    </div>
  );
}

export default () => {
  const [value, setValue] = useState('');
  const child = <Com title="inner prop" />;
  const props = {
    ...(child as h.JSX.Element).props,
    onChange: setValue,
  };
  const children = child.props.children instanceof Array?  child.props.children :(
    child.props.children?  [child.props.children] : []
  ) as ComponentChildren[];
  const vnode = h(
    child.type as string,
    props,
    ...children
  );
  return (
    <div className="m-10">
      <input class="border" defaultValue="1" />
      Outer prop:{value}
      {vnode}
    </div>
  );
};