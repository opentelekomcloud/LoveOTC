import { Input, Switch } from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { useRouter } from "~/Components/Router";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.0
 */
export function AdminUserFilter() {
  const { Paths, Search, Put } = useRouter();
  const path1 = Paths.at(0);
  const path2 = Paths.at(1);

  return (
    path1 === "Admin" && path2 === "User" &&
    <>
      <Input
        placeholder="Search by E-Mail"
        contentBefore={<SearchRegular />}
        appearance="underline"
        onChange={(_, x) => {
          if (x.value)
            Search.set("search", x.value);
          else
            Search.delete("search");

          Put(Search);
        }}
      />

      <Switch
        label="Only Admin"
        checked={Search.get("admin") === ""}
        onChange={(_, d) => {
          if (d.checked)
            Search.set("admin", "");
          else
            Search.delete("admin");

          Put(Search);
        }}
      />
    </>
  )
}
