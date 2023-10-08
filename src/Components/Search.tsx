import { Input, Switch } from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { useRouter } from "~/Components/Router";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
export function AdminSearch() {
  const { Paths, Search, Put } = useRouter();
  const path1 = Paths.at(0);
  const path2 = Paths.at(1);

  const user = path2 === "User";
  const order = path2 === "Order";
  const set = user ? "admin" : "pending";

  return (
    path1 === "Admin" && (user || order) &&
    <>
      <Input
        placeholder="Search in Any Field"
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
        label={`Only ${user ? "Admin" : "Pending"}`}
        checked={Search.get(set) === ""}
        onChange={(_, d) => {
          if (d.checked)
            Search.set(set, "");
          else
            Search.delete(set);

          Put(Search);
        }}
      />
    </>
  )
}
