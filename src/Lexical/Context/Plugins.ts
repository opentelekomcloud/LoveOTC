/**
 * Lexcial 插件配置
 */
export interface ILexPlugin {
  /** 右下角四个功能按钮 */
  Actions?: true;
  /** 自动聚焦 */
  AutoFocus?: true;
  /** 自动插入链接 */
  AutoLink?: true;
  /** 检查列表 */
  CheckList?: true;
  /** 可点击链接 */
  ClickableLink?: true;
  /** 代码块右上角按钮 */
  CodeActionMenu?: true;
  /** 代码高亮 */
  CodeHighlight?: true;
  /** 可折叠块 */
  Collapsible?: true;
  /** 段落左侧可拖动块 */
  DraggableBlock?: true;
  /** 弹出的超链接编辑器 */
  FloatingLinkEditor?: true;
  /** 弹出的文本格式工具条 */
  FloatingTextFormatToolbar?: true;
  /** 水平分割线 */
  HorizontalRule?: true;
  /** 图片 */
  Images?: true;
  /** 插入链接 */
  Link?: true;
  /** 列表最大缩进 */
  ListMaxIndentLevel?: number;
  /** 列表 */
  List?: true;
  /** MD 转换 */
  MarkdownShortcut?: true;
  /** Tab键聚焦 */
  TabFocus?: true;
  /** Tab键缩进 */
  TabIndentation?: true;
  /** 表格 */
  Table?: true;
  /** 顶部工具栏 */
  Toolbar?: true;
}
