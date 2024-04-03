export default function(){
  const usage = Deno.memoryUsage()
  const data = JSON.stringify(usage, null, 2);
  return <div class={"m-4"}>
    {data}
  </div>
}