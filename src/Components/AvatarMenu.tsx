import { Avatar, Link, Menu, MenuGroupHeader, MenuItem, MenuList, MenuPopover, MenuTrigger } from "@fluentui/react-components";
import { useBoolean } from "ahooks";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { Logger } from "~/Helpers/Logger";
import { Hub } from "~/ShopNet";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "./Auth/With";
import { OnNewUserSubject } from "./NewUser";
import { Setting } from "./Setting";

const log = new Logger("Avatar", "Menu");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.2
 */
export function AvatarMenu() {
  const [isMenu, { toggle: toggleMenu }] = useBoolean();
  const [isModal, { toggle: toggleModal }] = useBoolean();

  const auth = useAuth();
  const [mount, { set: setMount }] = useBoolean(true);

  useEffect(() => {
    OnNewUserSubject.subscribe(x => setMount(!x));
  }, []);

  const { data } = Hub.User.Get.useMe(log);

  const name = auth.user?.profile.preferred_username;

  return <>
    <Menu open={isMenu} onOpenChange={toggleMenu}>
      <MenuTrigger>
        <Avatar size={36} active={isMenu ? "active" : "unset"} name={name} />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>

          <AuthenticatedTemplate>
            <MenuGroupHeader>Hi {name}</MenuGroupHeader>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <MenuItem onClick={() => auth.signinRedirect()}>
              Login
            </MenuItem>
          </UnauthenticatedTemplate>

          <AuthenticatedTemplate>
            <Link appearance="subtle" href="/History">
              <MenuItem>History</MenuItem>
            </Link>

            {
              data?.Admin &&
              <Link appearance="subtle" href="/Admin">
                <MenuItem>Admin</MenuItem>
              </Link>
            }

            <MenuItem onClick={toggleModal}>Setting</MenuItem>

            <MenuItem onClick={() => auth.signoutRedirect()}>
              Logout
            </MenuItem>
          </AuthenticatedTemplate>

        </MenuList>
      </MenuPopover>
    </Menu>

    {
      mount &&
      <AuthenticatedTemplate>
        <Setting Open={isModal} Toggle={toggleModal} />
      </AuthenticatedTemplate>
    }
  </>
}
