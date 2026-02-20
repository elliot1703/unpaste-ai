import { renderToString } from "react-dom/server";
import App from "./App";

export function render(url: string) {
  const helmetContext: { helmet?: any } = {};
  const html = renderToString(
    <App ssrPath={url} helmetContext={helmetContext} />
  );
  return { html, helmet: helmetContext.helmet };
}
