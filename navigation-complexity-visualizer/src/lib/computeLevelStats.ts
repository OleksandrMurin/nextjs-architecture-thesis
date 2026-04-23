import { TreeNode } from "../types/tree";

export type LevelStat = {
  level: number;
  total: number;
  reviewed: number;
  access: number;
  coverage: number;
  precision: number;
};

type RawLevelCounter = {
  total: number;
  reviewed: number;
  access: number;
};

type ComputeLevelStatsParams = {
  tree: TreeNode;
  accessPaths: Set<string>;
  visiblePaths: Set<string>;
};

export function computeLevelStats({
  tree,
  accessPaths,
  visiblePaths,
}: ComputeLevelStatsParams): LevelStat[] {
  const levelMap = new Map<number, RawLevelCounter>();

  function ensureLevel(level: number): RawLevelCounter {
    const existing = levelMap.get(level);
    if (existing) return existing;

    const created: RawLevelCounter = {
      total: 0,
      reviewed: 0,
      access: 0,
    };

    levelMap.set(level, created);
    return created;
  }

  function walk(node: TreeNode, level: number): void {
    const stat = ensureLevel(level);

    stat.total += 1;

    if (visiblePaths.has(node.path)) {
      stat.reviewed += 1;
    }

    if (accessPaths.has(node.path)) {
      stat.access += 1;
    }

    node.children?.forEach((child) => walk(child, level + 1));
  }

  walk(tree, 0);

  return Array.from(levelMap.entries())
    .sort((a, b) => a[0] - b[0])
    .filter(([, stat]) => stat.access > 0)
    .map(([level, stat]) => {
      const coverage = stat.total > 0 ? stat.reviewed / stat.total : 0;
      const precision = stat.reviewed > 0 ? stat.access / stat.reviewed : 0;

      return {
        level,
        total: stat.total,
        reviewed: stat.reviewed,
        access: stat.access,
        coverage,
        precision,
      };
    });
}
