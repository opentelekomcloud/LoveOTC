import { Input, Switch } from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { useRouter } from "~/Components/Router";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function AdminUserSearch() {
  const { Paths } = useRouter();
  const path1 = Paths.at(0);
  const path2 = Paths.at(1);

  return (
    path1 === "Admin" && path2 === "User" &&
    <>
      <Input contentBefore={<SearchRegular />} appearance="underline" />
      <Switch label="Only Admin" />
    </>
  )
}
