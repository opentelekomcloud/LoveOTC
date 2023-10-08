/**
 * @author Aloento
 * @since 0.1.1 MusiLand
 * @version 0.2.0
 */
export function Combine(paths: readonly any[]): string {
  const p = paths
    .filter(x => x)
    .map(x => x!.toString().replace(/^\/+/, ""))
    .join("/");

  return `/${p}`;
}
