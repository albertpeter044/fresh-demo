// title: Render
import { useEffect } from "preact/hooks";
import { hydrate, render } from "preact";

function App() {
  return <input class="border" defaultValue="bar123" />;
}
export default () => {
  useEffect(() => {
    const entry = document.getElementById("app")!;
    entry.innerHTML = `<input value="foo" />`;
    setTimeout(() => {
      render(<App />, entry!);
    }, 1000);
  }, []);
  return <div id="app"></div>;
};
