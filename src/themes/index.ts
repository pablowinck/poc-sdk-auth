import { css, CSSResult } from "lit";
import { dark } from "./dark";
import { light } from "./light";

export function getTheme(theme = ""): CSSResult {
  if (theme === "light") return light;
  if (theme === "dark") return dark;

  return css``;
}
