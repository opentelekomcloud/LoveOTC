import { Button } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { useConst } from "@fluentui/react-hooks";
import { DismissRegular, OpenRegular } from "@fluentui/react-icons";
import { useBoolean, useInViewport } from "ahooks";
import { useEffect, useRef } from "react";
import { useRouter } from "~/Components/Router";
import { ICompLog } from "~/Helpers/Logger";
import { OrderDetailDrawer } from "./Drawer";

export interface IOrderComp extends ICompLog {
  OrderId: number;
  Admin?: true;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 1.1.0
 */
export function OrderDetail({ OrderId, Admin, ParentLog }: IOrderComp) {
  const log = useConst(() => ParentLog.With("Detail"));

  const [open, { set }] = useBoolean();
  const { Nav, Paths } = useRouter();
  const curr = parseInt(Paths.at(Admin ? 2 : 1)!);

  useEffect(() => set(curr === OrderId), [curr]);
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);

  return <>
    <Button
      appearance="subtle"
      icon={<OpenRegular />}
      onClick={() => Nav(Admin ? "Admin/Order" : "History", OrderId)}
    />

    <Drawer
      open={open}
      position="end"
      size="medium"
      modalType="alert"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<DismissRegular />}
              onClick={() => Nav(Admin ? "Admin/Order" : "History")}
            />
          }
        >
          Order Detail
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody ref={ref}>
        {inViewport && <OrderDetailDrawer OrderId={OrderId} ParentLog={log} Admin={Admin} />}
      </DrawerBody>
    </Drawer>
  </>
}
