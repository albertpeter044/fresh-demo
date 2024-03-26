import { type Config } from "tailwindcss";
// import {daisyThemes} from "@/conf/daisy.ts"
// import DaisyUI from "daisyui";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  // plugins: [
  //   // deno-lint-ignore no-explicit-any
  //   DaisyUI as any,
  // ],
  // daisyui: {
  //   themes: daisyThemes,
  //   logs: false,
  // },
} satisfies Config;
