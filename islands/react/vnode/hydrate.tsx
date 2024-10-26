import { useEffect } from "preact/hooks";
import { hydrate } from 'preact';

function App(){
  return (
    <div className="m-10" id="demo-hydrate">
      <div class="text-lg">
        Preact's hydrate will clear uncontrolled property(e.g., `defaultValue="12"`), this is wrong :
      </div>
      <div>
        <input class="border" defaultValue="12" />
      </div>
    </div>
  );
};

export default ()=>{
  useEffect(()=>{
    hydrate(<App />, document.getElementById('demo-hydrate')!);
  },[])
  return <App/>
}