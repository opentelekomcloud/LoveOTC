import { Button, Combobox, Label, Option, Toast, ToastTitle, makeStyles } from "@fluentui/react-components";
import { EditRegular, SendRegular } from "@fluentui/react-icons";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
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

const log = new Logger("Admin", "Product", "Detail", "Category");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.4
 */
export function AdminProductCategory({ ProdId }: { ProdId: number; }) {
  const [cate, setCate] = useState("");
  const [edit, { setTrue, setFalse }] = useBoolean();

  useRequest(() => AdminHub.Product.Get.Category(ProdId), {
    onSuccess(data) {
      data && setCate(data);
    },
    onError: log.error
  });

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run } = AdminHub.Product.Patch.useCategory({
    onError(e, params) {
      dispatch({
        Message: "Failed Update Category",
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Category Updated</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      setFalse();
    }
  });

  const { run: det } = AdminHub.Product.Delete.useCategory({
    onError(e, params) {
      dispatch({
        Message: "Failed Detach Category",
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Category Detached</ToastTitle>
        </Toast>,
        { intent: "success" }
      );

      setFalse();
    }
  });

  const { data: cates } = useRequest(() => Hub.Gallery.Get.Categories(), {
    onSuccess(data) {
      setMatchCate(data);
    },
    onError: log.error
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

        {
          matchCate?.length === cates?.length
            ?
            <Option key="" text="">
              Pending
            </Option>
            : null
        }
      </Combobox>

      {edit
        ? <Button
          appearance="subtle"
          icon={<SendRegular />}
          onClick={() => {
            if (cate)
              run(ProdId, cate);
            else
              det(ProdId);
          }}
        />
        : <Button
          appearance="subtle"
          icon={<EditRegular />}
          onClick={setTrue}
        />}
    </div>
  );
}
