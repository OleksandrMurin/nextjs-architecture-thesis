import { TreeIndex } from "@/src/types/tree";

export function computeAccessPaths(
  requiredPaths: Set<string>,
  treeIndex: TreeIndex,
): Set<string> {
  const accessPaths = new Set<string>();
  const addPath = (key: string) => {
    accessPaths.add(key);
    const value = treeIndex.parentByPath.get(key);
    if (value) {
      addPath(value);
    }
  };
  requiredPaths.forEach((x) => addPath(x));
  return accessPaths;
}
