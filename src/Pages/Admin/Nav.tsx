import { Link, Tab, TabList, Text, makeStyles, tokens } from "@fluentui/react-components";
import { useRouter } from "~/Components/Router";
import { Flex } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyle = makeStyles({
  box: {
    ...Flex,
    flexGrow: 1,
    height: "inherit",
    marginLeft: tokens.spacingHorizontalS,
    alignItems: "center"
  },
  div: {
    color: tokens.colorNeutralForegroundDisabled
  },
  link: {
    textDecorationLine: "unset !important"
  }
})

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.1
 */
export function AdminTopNav() {
  const style = useStyle();
  const { Paths } = useRouter();
  const path1 = Paths.at(0);
  const path2 = Paths.at(1) || "Product";

  return (
    path1 === "Admin" &&

    <div className={style.box}>
      <Text size={600} font="monospace" className={style.div}>|</Text>

      <TabList selectedValue={path2} >
        <Link appearance="subtle" href="/Admin" className={style.link}>
          <Tab value="Product">Product List</Tab>
        </Link>

        <Link appearance="subtle" href="/Admin/Order" className={style.link}>
          <Tab value="Order">Order List</Tab>
        </Link>

        <Link appearance="subtle" href="/Admin/User" className={style.link}>
          <Tab value="User">User List</Tab>
        </Link>
      </TabList>
    </div>
  )
}
