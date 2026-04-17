import { TreeIndex } from "@/src/types/tree";

export function computeVisibleNodes(
  accessedPaths: Set<string>,
  treeIndex: TreeIndex,
): Set<string> {
  const visibleScopePaths = new Set<string>([]);

  function fillVisibleScopePaths(path: string) {
    visibleScopePaths.add(path);

    treeIndex.nodeByPath
      .get(path)
      ?.children?.forEach((x) => visibleScopePaths.add(x.path));
  }
  accessedPaths.forEach((x) => fillVisibleScopePaths(x));

  return visibleScopePaths;
}
