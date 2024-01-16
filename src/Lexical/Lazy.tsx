import { Spinner } from "@fluentui/react-components";
import { lazy, Suspense } from "react";
import type { ILexical } from "./Context/Setting";

/**
 * @author Aloento
 * @since 1.2.0
 * @version 0.1.0
 */
export function Lexical(props: ILexical) {
  return (
    <Suspense fallback={<Spinner />}>
      <Wrapper {...props} />
    </Suspense>
  );
}

const Wrapper = lazy(() => import("./"));
