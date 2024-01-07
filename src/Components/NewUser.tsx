import { useBoolean, useMount } from "ahooks";
import { Subject } from "rxjs";
import { AuthenticatedTemplate } from "./Auth/With";
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
 * @version 0.1.2
 */
export function NewUser() {
  const [open, { toggle }] = useBoolean();

  useMount(() => {
    OnNewUserSubject.subscribe(x => x && toggle());
  });

  return (
    <AuthenticatedTemplate>
      <Setting Open={open} Toggle={toggle} New />
    </AuthenticatedTemplate>
  )
}
