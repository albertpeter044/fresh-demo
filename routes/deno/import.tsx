export default function() {
  return <div class={"m-4"}>
    <h3>import.meta.url: {import.meta.url}</h3>
    <h3>Deno.mainModule: {Deno.mainModule}</h3>
    <h3>import.meta.main: {import.meta.main+""}</h3>
    <h3>import.meta.filename: {import.meta.filename}</h3>
  </div>
}