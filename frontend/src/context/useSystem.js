import {
  useContext,
} from "react";

import {
  SystemContext,
} from "./systemContextObject";

export const useSystem = () =>
  useContext(SystemContext);