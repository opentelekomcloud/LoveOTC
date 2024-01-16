import { makeStyles, mergeClasses, shorthands } from "@fluentui/react-components";
import type { EditorThemeClasses } from "lexical";

const useStyles = makeStyles({
  ltr: { textAlign: "left" },
  rtl: { textAlign: "right" },
  paragraph: {
    ...shorthands.margin(0),
    position: "relative"
  },
  quote: {
    ...shorthands.margin(0),
    marginLeft: "20px",
    marginBottom: "10px",
    fontSize: "15px",
    color: "rgb(101, 103, 107)",
    borderLeftColor: "rgb(206, 208, 212)",
    borderLeftWidth: "4px",
    borderLeftStyle: "solid",
    paddingLeft: "16px"
  },
  h1: {
    fontSize: "24px",
    color: "rgb(5, 5, 5)",
    fontWeight: 400,
    ...shorthands.margin(0)
  },
  h2: {
    fontSize: "15px",
    color: "rgb(101, 103, 107)",
    fontWeight: 700,
    ...shorthands.margin(0),
    textTransform: "uppercase"
  },
  h3: {
    fontSize: "12px",
    ...shorthands.margin(0),
    textTransform: "uppercase"
  },
  textBold: { fontWeight: "bold" },
  textItalic: { fontStyle: "italic" },
  textSubscript: {
    fontSize: "0.8em",
    verticalAlign: "sub !important"
  },
  textSuperscript: {
    fontSize: "0.8em",
    verticalAlign: "super"
  },
  textCode: {
    backgroundColor: "rgb(240, 242, 245)",
    ...shorthands.padding("1px", "0.25rem"),
    fontFamily: "Menlo, Consolas, Monaco, monospace",
    fontSize: "94%"
  },
  code: {
    backgroundColor: "rgb(240, 242, 245)",
    fontFamily: "Menlo, Consolas, Monaco, monospace",
    display: "block",
    ...shorthands.padding("8px", "8px", "8px", "52px"),
    lineHeight: 1.53,
    fontSize: "13px",
    ...shorthands.margin(0),
    marginTop: "8px",
    marginBottom: "8px",
    tabSize: 2,
    overflowX: "auto",
    position: "relative",
    ":before": {
      content: "attr(data-gutter)",
      position: "absolute",
      backgroundColor: "#eee",
      left: 0,
      top: 0,
      ...shorthands.borderRight("1px", "solid", "#ccc"),
      ...shorthands.padding("8px"),
      color: "#777",
      whiteSpace: "pre-wrap",
      textAlign: "right",
      minWidth: "25px"
    }
  },
  table: {
    borderCollapse: "collapse",
    borderSpacing: 0,
    maxWidth: "100%",
    overflowY: "scroll",
    tableLayout: "fixed",
    width: "calc(100% - 25px)",
    ...shorthands.margin("30px", 0)
  },
  tableSelected: {
    ...shorthands.outline("2px", "solid", "rgb(60, 132, 244)")
  },
  tableCell: {
    ...shorthands.border("1px", "solid", "#bbb"),
    minWidth: "75px",
    verticalAlign: "top",
    textAlign: "start",
    ...shorthands.padding("6px", "8px"),
    position: "relative",
    cursor: "default",
    ...shorthands.outline("none")
  },
  tableCellSortedIndicator: {
    display: "block",
    opacity: 0.5,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "4px",
    backgroundColor: "#999"
  },
  tableCellResizer: {
    position: "absolute",
    right: "-4px",
    height: "100%",
    width: "8px",
    cursor: "ew-resize",
    zIndex: 10,
    top: 0
  },
  tableCellHeader: {
    backgroundColor: "#f2f3f5",
    textAlign: "start"
  },
  tableCellSelected: { backgroundColor: "#c9dbf0" },
  tableCellPrimarySelected: {
    ...shorthands.border("2px", "solid", "rgb(60, 132, 244)"),
    display: "block",
    height: "calc(100% - 2px)",
    position: "absolute",
    width: "calc(100% - 2px)",
    left: "-1px",
    top: "-1px",
    zIndex: 2
  },
  tableCellEditing: {
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.4)",
    ...shorthands.borderRadius("3px")
  },
  tableAddColumns: {
    position: "absolute",
    top: 0,
    width: "20px",
    backgroundColor: "#eee",
    height: "100%",
    right: 0,
    ...shorthands.border(0),
    cursor: "pointer",
    ":after": {
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      display: "block",
      content: '" "',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0.4
    },
    ":hover": {
      backgroundColor: "#c9dbf0"
    }
  },
  tableAddRows: {
    position: "absolute",
    bottom: "-25px",
    width: "calc(100% - 25px)",
    backgroundColor: "#eee",
    height: "20px",
    left: 0,
    ...shorthands.border(0),
    cursor: "pointer",
    ":after": {
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      display: "block",
      content: '" "',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0.4
    },
    ":hover": {
      backgroundColor: "#c9dbf0"
    }
  },
  tableCellResizeRuler: {
    display: "block",
    position: "absolute",
    width: "1px",
    backgroundColor: "rgb(60, 132, 244)",
    height: "100%",
    top: 0
  },
  tableCellActionButtonContainer: {
    display: "block",
    right: "5px",
    top: "2px",
    position: "absolute",
    zIndex: 4,
  },
  tableCellActionButton: {
    backgroundColor: "#eee",
    display: "block",
    ...shorthands.border(0),
    ...shorthands.borderRadius("20px"),
    width: "20px",
    height: "20px",
    color: "#222",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#ddd"
    }
  },
  ol1: {
    ...shorthands.padding(0),
    ...shorthands.margin(0),
    marginLeft: "16px",
    listStylePosition: "inside"
  },
  ol2: {
    ...shorthands.padding(0),
    ...shorthands.margin(0),
    marginLeft: "16px",
    listStyleType: "upper-alpha",
    listStylePosition: "inside"
  },
  ol3: {
    ...shorthands.padding(0),
    ...shorthands.margin(0),
    marginLeft: "16px",
    listStyleType: "lower-alpha",
    listStylePosition: "inside"
  },
  ol4: {
    ...shorthands.padding(0),
    ...shorthands.margin(0),
    marginLeft: "16px",
    listStyleType: "upper-roman",
    listStylePosition: "inside"
  },
  ol5: {
    ...shorthands.padding(0),
    ...shorthands.margin(0),
    marginLeft: "16px",
    listStyleType: "lower-roman",
    listStylePosition: "inside"
  },
  ul: {
    ...shorthands.padding(0),
    ...shorthands.margin(0),
    marginLeft: "16px",
    listStylePosition: "inside"
  },
  listItem: { ...shorthands.margin(0, "8px") },
  tokenComment: { color: "slategray" },
  tokenPunctuation: { color: "#999" },
  tokenProperty: { color: "#905" },
  tokenSelector: { color: "#690" },
  tokenOperator: { color: "#9a6e3a" },
  tokenAttr: { color: "#07a" },
  tokenVariable: { color: "#e90" },
  tokenFunction: { color: "#dd4a68" },
  embedBlock: { userSelect: "none" },
  embedBlockFocus: {
    ...shorthands.outline("2px solid rgb(60, 132, 244)")
  }
});

export function useLexEditorTheme(): EditorThemeClasses {
  const style = useStyles();
  return {
    blockCursor: "LexEditor_blockCursor",
    code: mergeClasses(style.code, "LexEditor_code"),
    codeHighlight: {
      atrule: style.tokenAttr,
      attr: style.tokenAttr,
      boolean: style.tokenProperty,
      builtin: style.tokenSelector,
      cdata: style.tokenComment,
      char: style.tokenSelector,
      class: style.tokenFunction,
      "class-name": style.tokenFunction,
      comment: style.tokenComment,
      constant: style.tokenProperty,
      deleted: style.tokenProperty,
      doctype: style.tokenComment,
      entity: style.tokenOperator,
      function: style.tokenFunction,
      important: style.tokenVariable,
      inserted: style.tokenSelector,
      namespace: style.tokenVariable,
      number: style.tokenProperty,
      operator: style.tokenOperator,
      prolog: style.tokenComment,
      property: style.tokenProperty,
      punctuation: style.tokenPunctuation,
      regex: style.tokenVariable,
      selector: style.tokenSelector,
      string: style.tokenSelector,
      symbol: style.tokenProperty,
      tag: style.tokenProperty,
      url: style.tokenOperator,
      variable: style.tokenVariable,
    },
    embedBlock: {
      base: style.embedBlock,
      focus: style.embedBlockFocus,
    },
    heading: {
      h1: style.h1,
      h2: style.h2,
      h3: style.h3,
      // h4: style.h4,
      // h5: style.h5,
      // h6: style.h6,
    },
    image: "LexEditor_Image",
    link: "LexEditor_link",
    list: {
      listitem: style.listItem,
      listitemChecked: "LexEditor_listItemChecked",
      listitemUnchecked: "LexEditor_listItemUnchecked",
      nested: {
        listitem: "LexEditor_nestedListItem",
      },
      olDepth: [
        style.ol1,
        style.ol2,
        style.ol3,
        style.ol4,
        style.ol5,
      ],
      ul: style.ul,
    },
    ltr: style.ltr,
    mark: "LexEditor_mark",
    markOverlap: "LexEditor_markOverlap",
    paragraph: style.paragraph,
    quote: style.quote,
    rtl: style.rtl,
    table: style.table,
    tableAddColumns: mergeClasses(style.tableAddColumns, "LexEditor_tableAddColumns"),
    tableAddRows: mergeClasses(style.tableAddRows, "LexEditor_tableAddRows"),
    tableCell: style.tableCell,
    tableCellActionButton: style.tableCellActionButton,
    tableCellActionButtonContainer:
      style.tableCellActionButtonContainer,
    tableCellEditing: style.tableCellEditing,
    tableCellHeader: style.tableCellHeader,
    tableCellPrimarySelected: style.tableCellPrimarySelected,
    tableCellResizer: style.tableCellResizer,
    tableCellSelected: style.tableCellSelected,
    tableCellSortedIndicator: style.tableCellSortedIndicator,
    tableResizeRuler: style.tableCellResizeRuler,
    tableSelected: style.tableSelected,
    text: {
      bold: style.textBold,
      code: style.textCode,
      italic: style.textItalic,
      strikethrough: "LexEditor_textStrikethrough",
      subscript: style.textSubscript,
      superscript: style.textSuperscript,
      underline: "LexEditor_textUnderline",
      underlineStrikethrough: "LexEditor_textUnderlineStrikethrough",
    },
  };
}
