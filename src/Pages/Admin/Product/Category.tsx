import { Button, Combobox, Label, Option, Toast, ToastTitle, makeStyles } from "@fluentui/react-components";
import { EditRegular, SendRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";
import { Flex } from "~/Helpers/Styles";
import { use500Toast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  body: {
    ...Flex,
    alignItems: "center"
  },
  input: {
    flexGrow: 1
  }
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.0
 */
export function AdminProductCategory({ ProdId }: { ProdId: number; }) {
  const [cate, setCate] = useState("");
  const [edit, { setTrue, setFalse }] = useBoolean();

  useRequest(AdminHub.Product.Get.Category.bind(AdminHub.Product.Get), {
    defaultParams: [ProdId],
    onSuccess(data) {
      data && setCate(data);
    }
  });

  const { dispatchError, dispatchToast } = use500Toast();

  const { run } = useRequest(AdminHub.Product.Patch.Category.bind(AdminHub.Product.Patch), {
    manual: true,
    onFinally(req, _, e) {
      if (e)
        return dispatchError({
          Message: "Failed Update Category",
          Request: req,
          Error: e
        });

      dispatchToast(
        <Toast>
          <ToastTitle>Category Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      setFalse();
    },
  });

  const { data: cates } = useRequest(Hub.Gallery.Get.Categories.bind(Hub.Gallery.Get), {
    onSuccess(data) {
      setMatchCate(data);
    }
  });

  const [matchCate, setMatchCate] = useState(cates);
  const [createCate, setCreateCate] = useState("");

  const style = useStyles();

  return (
    <div className={style.body}>
      <Label size="large" disabled={!edit}>Category</Label>

      <Combobox
        className={style.input}
        size="large"
        disabled={!edit}
        freeform
        placeholder={cate || "Pending"}
        appearance="underline"
        onChange={e => {
          const v = e.target.value.trim();

          const matches = cates?.filter(option => option.toLowerCase().indexOf(v.toLowerCase()) === 0);
          setMatchCate(matches);

          if (v && matches && matches.length < 1)
            setCreateCate(v);
          else
            setCreateCate("");
        }}
        onOptionSelect={(_, data) => {
          const v = data.optionText!;
          setCate(v);

          if (v && cates?.includes(v))
            setCreateCate("");
          else
            setCreateCate(v);
        }}
      >
        {
          createCate &&
          <Option key={createCate} text={createCate}>
            Create New "{createCate}"
          </Option>
        }

        {matchCate?.map(x => <Option key={x}>{x}</Option>)}
      </Combobox>

      {edit
        ? <Button appearance="subtle" icon={<SendRegular />} onClick={() => cate && run(ProdId, cate)} />
        : <Button appearance="subtle" icon={<EditRegular />} onClick={setTrue} />}
    </div>
  );
}
