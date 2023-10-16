import { useBoolean } from "ahooks";
import { useEffect } from "react";
import { Subject } from "rxjs";
import { WithAuth } from "./Auth/With";
import { Setting } from "./Setting";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export const OnNewUserSubject = new Subject<boolean>();

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.1
 */
export function NewUser() {
  const [open, { toggle }] = useBoolean();

  useEffect(() => {
    OnNewUserSubject.subscribe(x => x && toggle());
  }, []);

  return (
    <WithAuth>
      <Setting Open={open} Toggle={toggle} New />
    </WithAuth>
  )
}
