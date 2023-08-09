import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, ToolbarButton } from "@fluentui/react-components";
import { Text16Regular, TextFontSizeRegular } from "@fluentui/react-icons";
import { $patchStyleText } from "@lexical/selection";
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { useCallback } from "react";

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
  ["10px", "10px"],
  ["11px", "11px"],
  ["12px", "12px"],
  ["13px", "13px"],
  ["14px", "14px"],
  ["15px", "15px"],
  ["16px", "16px"],
  ["17px", "17px"],
  ["18px", "18px"],
  ["19px", "19px"],
  ["20px", "20px"],
];

interface IFontDropDown {
  editor: LexicalEditor;
  value: string;
  style: "font-family" | "font-size";
  disabled?: boolean;
}

export function FontDropDown({ editor, value, style, disabled = false }: IFontDropDown): JSX.Element {
  const handleClick = useCallback((option: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          [style]: option,
        });
      }
    });
  }, [editor, style]);

  const buttonAriaLabel = style === "font-family"
    ? "Formatting options for font family"
    : "Formatting options for font size";

  return (
    <Menu>
      <MenuTrigger>
        <ToolbarButton
          disabled={disabled}
          aria-label={buttonAriaLabel}
          icon={style === "font-family" ? <Text16Regular /> : <TextFontSizeRegular />}
          children={value}
        />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {(style === "font-family" ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(
            ([option, text]) => <MenuItem children={text} onClick={() => handleClick(option)} />
          )}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
