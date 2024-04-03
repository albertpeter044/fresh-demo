import { h, render } from "preact";
import { useRef} from "preact/hooks";
import { JSX } from "preact";
import htm from 'htm';

const html = htm.bind(h);
const sampleCode = `
import { useSignal } from "@preact/signals";
export default fcuntion App() {
  const count = useSignal(3);
  return (
    <div> 
      <div>{count} </div>
      <div onClick={count.value+=1}>+</div>
    </div>
  )
}
`;
export default () => {
  const ref = useRef(null);
  const onChange = (e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
    const sampleCode = e.currentTarget!.value;
    const App = import(sampleCode);// Is there a convenient way to import a string as a module in browser?
    render(html`<${App}/>`, ref.current!);
    // const vnode = html`${sampleCode}`;
    // render(vnode, ref.current!)
  };

  return (
    <div class={"m-2"}>
      <h1>Preact Playground</h1>
      <fieldset>
        <legend>Code:</legend>
        <textarea class="code border w-full h-96" onChange={onChange}>
          {sampleCode}
        </textarea>
      </fieldset>
      <fieldset>
        <legend>Output</legend>
        <div class="output border" ref={ref}></div>
      </fieldset>
    </div>
  );
};
