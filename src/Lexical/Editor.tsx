import { makeStyles, mergeClasses, shorthands, tokens } from "@fluentui/react-components";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { useState } from "react";
import { useLexical } from "./Context/Setting";
import { TableCellNodes } from "./Nodes/TableCellNodes";
import { ActionsPlugin } from "./Plugins/ActionsPlugin";
import { LexAutoLinkPlugin } from "./Plugins/AutoLinkPlugin";
import { ClickableLinkPlugin } from "./Plugins/ClickableLinkPlugin";
import { CodeActionMenuPlugin } from "./Plugins/CodeActionMenuPlugin";
import { CodeHighlightPlugin } from "./Plugins/CodeHighlightPlugin";
import { CollapsiblePlugin } from "./Plugins/CollapsiblePlugin";
import { DraggableBlockPlugin } from "./Plugins/DraggableBlockPlugin";
import { FloatingLinkEditorPlugin } from "./Plugins/FloatingLinkEditorPlugin";
import { FloatingTextFormatToolbarPlugin } from "./Plugins/FloatingTextFormatToolbarPlugin";
import { HorizontalRulePlugin } from "./Plugins/HorizontalRulePlugin";
import { ImagesPlugin } from "./Plugins/ImagesPlugin";
import { LinkPlugin } from "./Plugins/LinkPlugin";
import { ListMaxIndentLevelPlugin } from "./Plugins/ListMaxIndentLevelPlugin";
import { MarkdownShortcutPlugin } from "./Plugins/MarkdownShortcutPlugin";
import { TabFocusPlugin } from "./Plugins/TabFocusPlugin";
import { TablePlugin } from "./Plugins/TablePlugin";
import { ToolbarPlugin } from "./Plugins/ToolbarPlugin";
import { useLexEditorTheme } from "./Themes/LexEditorTheme";
import { LexContentEditable } from "./UI/ContentEditable";
import { Placeholder } from "./UI/Placeholder";
import { SetCurrentEditor } from "./Utils";

const useStyle = makeStyles({
  shell: {
    lineHeight: "1.7"
  },
  container: {
    position: "relative",
  },
  noTreeView: {
    borderBottomLeftRadius: tokens.borderRadiusLarge,
    borderBottomRightRadius: tokens.borderRadiusLarge
  },
  scroller: {
    minHeight: "150px",
    ...shorthands.overflow("auto"),
    resize: "vertical"
  },
});

export function LexEditor(): JSX.Element {
  SetCurrentEditor(useLexicalComposerContext()[0]);

  const { Namespace, OnError, Placeholder: ph, Display, Plugin: {
    Actions,
    AutoFocus,
    AutoLink,
    CheckList,
    ClickableLink,
    CodeActionMenu,
    CodeHighlight,
    Collapsible,
    DraggableBlock,
    FloatingLinkEditor,
    FloatingTextFormatToolbar,
    HorizontalRule,
    Images,
    Link,
    ListMaxIndentLevel,
    List,
    MarkdownShortcut,
    TabFocus,
    TabIndentation,
    Table,
    Toolbar,
  } } = useLexical();

  const placeholder = <Placeholder children={ph || "Let's say something awesome...."} />
  const [anchor, setAnchor] = useState<HTMLDivElement>();
  const style = useStyle();

  return (
    <div className={mergeClasses("LexEditor_Shell", style.shell)}>
      {Toolbar && <ToolbarPlugin />}

      <div
        className={mergeClasses(...(
          Display ? [] : [
            style.container,
            style.noTreeView,
            style.scroller
          ])
        )}
        ref={x => x && setAnchor(x)}
      >
        {AutoFocus && <AutoFocusPlugin />}
        {AutoLink && <LexAutoLinkPlugin />}

        {CheckList && <CheckListPlugin />}
        {ClickableLink && <ClickableLinkPlugin />}
        {CodeHighlight && <CodeHighlightPlugin />}
        {Collapsible && <CollapsiblePlugin />}

        {HorizontalRule && <HorizontalRulePlugin />}

        {Images && <ImagesPlugin />}

        {Link && <LinkPlugin />}
        {ListMaxIndentLevel && <ListMaxIndentLevelPlugin maxDepth={ListMaxIndentLevel} />}
        {List && <ListPlugin />}

        {MarkdownShortcut && <MarkdownShortcutPlugin />}

        <RichTextPlugin
          contentEditable={<LexContentEditable />}
          placeholder={(!Display && placeholder) as any}
          ErrorBoundary={LexicalErrorBoundary}
        />

        {TabFocus && <TabFocusPlugin />}
        {TabIndentation && <TabIndentationPlugin />}

        {Table && <TablePlugin cellEditorConfig={{
          namespace: Namespace,
          nodes: [...TableCellNodes],
          onError: OnError,
          theme: useLexEditorTheme(),
        }}>
          <AutoFocusPlugin />
          <ClickableLinkPlugin />
          <FloatingTextFormatToolbarPlugin />
          <ImagesPlugin captionsEnabled={false} />
          <LinkPlugin />
          <RichTextPlugin
            contentEditable={<LexContentEditable table />}
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </TablePlugin>}

        {anchor && <>
          {Actions && <ActionsPlugin anchor={anchor} />}
          {CodeActionMenu && <CodeActionMenuPlugin anchor={anchor} />}
          {DraggableBlock && <DraggableBlockPlugin anchor={anchor} />}
          {FloatingLinkEditor && <FloatingLinkEditorPlugin anchor={anchor} />}
          {FloatingTextFormatToolbar && <FloatingTextFormatToolbarPlugin anchor={anchor} />}
        </>}
      </div>

    </div>
  );
}
