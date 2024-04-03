import { useEffect } from 'preact/hooks';

export default function MyComponent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.example.com/some-library.js";
    script.async = true;
    script.onload = () => {
      console.log("Script loaded");
    }
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div></div>
  );
}
