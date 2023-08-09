import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, ToolbarButton } from "@fluentui/react-components";
import {
  CodeRegular, MoreHorizontalRegular, TaskListLtrRegular, TextBulletListLtrRegular,
  TextHeader1Regular, TextHeader2Regular, TextHeader3Regular,
  TextNumberListLtrRegular, TextParagraphDirectionRegular, TextQuoteRegular
} from "@fluentui/react-icons";
import { $createCodeNode } from "@lexical/code";
import { INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode, $getSelection,
  $isRangeSelection, DEPRECATED_$isGridSelection, LexicalEditor
} from "lexical";

export const BlockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

interface IBlockFormat {
  blockType: keyof typeof BlockTypeToBlockName;
  editor: LexicalEditor;
  disabled?: boolean;
}

export function BlockFormat({ editor, blockType, disabled = false }: IBlockFormat): JSX.Element {
  function formatParagraph() {
    if (blockType !== "paragraph")
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection))
          $setBlocksType(selection, () => $createParagraphNode());
      });
  }

  function formatHeading(headingSize: HeadingTagType) {
    if (blockType !== headingSize)
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection))
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
  }

  function formatBulletList() {
    if (blockType !== "bullet")
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    else
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  }

  function formatCheckList() {
    if (blockType !== "check")
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    else
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  }

  function formatNumberedList() {
    if (blockType !== "number")
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    else
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  }

  function formatQuote() {
    if (blockType !== "quote")
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection))
          $setBlocksType(selection, () => $createQuoteNode());
      });
  }

  function formatCode() {
    if (blockType !== "code")
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection))
          if (selection.isCollapsed())
            $setBlocksType(selection, () => $createCodeNode());
          else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection.insertRawText(textContent);
          }
      });
  }

  return (
    <Menu>
      <MenuTrigger>
        <ToolbarButton
          disabled={disabled}
          aria-label="Formatting options for text style"
          children={BlockTypeToBlockName[blockType]}
          icon={(() => {
            switch (blockType) {
              case "paragraph":
                return <TextParagraphDirectionRegular />;
              case "h1":
                return <TextHeader1Regular />;
              case "h2":
                return <TextHeader2Regular />;
              case "h3":
                return <TextHeader3Regular />;
              case "bullet":
                return <TextBulletListLtrRegular />;
              case "check":
                return <TaskListLtrRegular />;
              case "number":
                return <TextNumberListLtrRegular />;
              case "quote":
                return <TextQuoteRegular />;
              case "code":
                return <CodeRegular />;
              default:
                return <MoreHorizontalRegular />;
            }
          })()}
        />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem
            icon={<TextParagraphDirectionRegular />}
            onClick={formatParagraph}
          >
            Normal
          </MenuItem>

          <MenuItem
            icon={<TextHeader1Regular />}
            onClick={() => formatHeading("h1")}
          >
            Heading 1
          </MenuItem>

          <MenuItem
            icon={<TextHeader2Regular />}
            onClick={() => formatHeading("h2")}
          >
            Heading 2
          </MenuItem>

          <MenuItem
            icon={<TextHeader3Regular />}
            onClick={() => formatHeading("h3")}
          >
            Heading 3
          </MenuItem>

          <MenuItem
            icon={<TextBulletListLtrRegular />}
            onClick={formatBulletList}
          >
            Bullet List
          </MenuItem>

          <MenuItem
            icon={<TextNumberListLtrRegular />}
            onClick={formatNumberedList}
          >
            Numbered List
          </MenuItem>

          <MenuItem
            icon={<TaskListLtrRegular />}
            onClick={formatCheckList}
          >
            Check List
          </MenuItem>

          <MenuItem
            icon={<TextQuoteRegular />}
            onClick={formatQuote}
          >
            Quote
          </MenuItem>

          <MenuItem
            icon={<CodeRegular />}
            onClick={formatCode}
          >
            Code Block
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
