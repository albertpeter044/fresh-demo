import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center m-12">
          <h1 class="text-4xl font-bold">404 - Page not found</h1>
          <a href="/" class="underline">Go back home</a>
        </div>
    </>
  );
}
