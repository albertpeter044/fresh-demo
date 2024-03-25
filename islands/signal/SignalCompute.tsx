import { effect, useComputed, useSignal } from "@preact/signals";
import Counter from "./Counter.tsx";

export function SignalCompute() {
  const count = useSignal(3);
  const double = useComputed(() => {
    console.log("double computed")
    return count.value * 2
  });
  // const destroy = effect(() => console.log(double.value));
  // destroy()
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac] flex flex-col">
      <div class="flex justify-center">
        <p>{count} x 2 = {double}(server side doesnot change)</p>
      </div>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">React signal demo</h1>
        <Counter count={count} double={double} />
      </div>
    </div>
  );
}
