import { Avatar, Menu, MenuGroupHeader, MenuItem, MenuList, MenuPopover, MenuTrigger } from "@fluentui/react-components";
import { useBoolean } from "ahooks";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function AvatarMenu() {
  const [open, { toggle }] = useBoolean();

  return (
    <Menu open={open} onOpenChange={toggle}>
      <MenuTrigger>
        <Avatar size={36} active={open ? "active" : "unset"} />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuGroupHeader>Hi Aloento</MenuGroupHeader>
          <MenuItem>Setting</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}
