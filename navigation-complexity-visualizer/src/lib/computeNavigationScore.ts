import { TreeNode } from "../types/tree";

export type NavigationScoreResult = {
  totalScore: number;
  costByPath: Map<string, number>;
};

type ComputeNavigationScoreParams = {
  tree: TreeNode;
  accessPaths: Set<string>;
  visiblePaths: Set<string>;
  directoryWeight?: number;
  fileWeight?: number;
  repeatFactor?: number;
};

function getNodeWeight(
  node: TreeNode,
  directoryWeight: number,
  fileWeight: number,
): number {
  return node.type === "directory" ? directoryWeight : fileWeight;
}

export function computeNavigationScore({
  tree,
  accessPaths,
  visiblePaths,
  directoryWeight = 0.5,
  fileWeight = 1,
  repeatFactor = 0.5,
}: ComputeNavigationScoreParams): NavigationScoreResult {
  const costByPath = new Map<string, number>();
  let totalScore = 0;

  function addCost(path: string, value: number) {
    const prev = costByPath.get(path) ?? 0;
    costByPath.set(path, prev + value);
  }

  function walk(node: TreeNode): void {
    if (node.type !== "directory" || !node.children?.length) {
      return;
    }

    const reviewedChildren = node.children.filter((child) =>
      visiblePaths.has(child.path),
    );

    const accessChildren = node.children.filter((child) =>
      accessPaths.has(child.path),
    );

    const k = accessChildren.length;

    if (k > 0 && reviewedChildren.length > 0) {
      const baseCost = reviewedChildren.reduce((sum, child) => {
        return sum + getNodeWeight(child, directoryWeight, fileWeight);
      }, 0);

      const score = baseCost * (1 + repeatFactor * (k - 1));
      totalScore += score;

      // Самой директории записываем суммарную стоимость обзора ее содержимого
      addCost(node.path, score);

      // Базовую стоимость раскладываем по просмотренным дочерним элементам
      reviewedChildren.forEach((child) => {
        const childWeight = getNodeWeight(child, directoryWeight, fileWeight);
        addCost(child.path, childWeight);
      });

      // Повторный поиск раскладываем только по полезным дочерним элементам
      if (k > 1) {
        const repeatCost = baseCost * repeatFactor * (k - 1);
        const perAccessChildRepeat = repeatCost / k;

        accessChildren.forEach((child) => {
          addCost(child.path, perAccessChildRepeat);
        });
      }
    }

    node.children.forEach((child) => walk(child));
  }

  walk(tree);

  return {
    totalScore,
    costByPath,
  };
}
