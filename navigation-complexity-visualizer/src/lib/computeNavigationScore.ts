import { TreeNode } from "../types/tree";

export type NavigationNodeCost = {
  baseCost: number;
  extraCost: number;
  totalCost: number;
};

export type NavigationScoreResult = {
  totalScore: number;
  costByPath: Map<string, NavigationNodeCost>;
};

type ComputeNavigationScoreParams = {
  tree: TreeNode;
  requiredPaths: Set<string>;
  visiblePaths: Set<string>;
  directoryWeight?: number;
  fileWeight?: number;
  repeatFactor?: number;
  repeatExcludedPaths?: Set<string>;
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
  requiredPaths,
  visiblePaths,
  directoryWeight = 0.5,
  fileWeight = 1,
  repeatFactor = 0.5,
  repeatExcludedPaths = new Set(["src"]),
}: ComputeNavigationScoreParams): NavigationScoreResult {
  const costByPath = new Map<string, NavigationNodeCost>();

  function ensureCost(path: string): NavigationNodeCost {
    const existing = costByPath.get(path);
    if (existing) return existing;

    const created: NavigationNodeCost = {
      baseCost: 0,
      extraCost: 0,
      totalCost: 0,
    };

    costByPath.set(path, created);
    return created;
  }

  function addBaseCost(path: string, value: number): void {
    const item = ensureCost(path);
    item.baseCost += value;
    item.totalCost += value;
  }

  function addExtraCost(path: string, value: number): void {
    const item = ensureCost(path);
    item.extraCost += value;
    item.totalCost += value;
  }

  function walk(node: TreeNode): boolean {
    if (visiblePaths.has(node.path)) {
      addBaseCost(node.path, getNodeWeight(node, directoryWeight, fileWeight));
    }

    if (node.type === "file") {
      return requiredPaths.has(node.path);
    }

    const children = node.children ?? [];

    const relevantChildren: TreeNode[] = [];

    children.forEach((child) => {
      const childContainsRequiredFile = walk(child);

      if (childContainsRequiredFile) {
        relevantChildren.push(child);
      }
    });

    const reviewedChildren = children.filter((child) =>
      visiblePaths.has(child.path),
    );

    const hasMultipleRelevantBranches = relevantChildren.length > 1;
    const canApplyRepeatCost = !repeatExcludedPaths.has(node.path);

    if (
      hasMultipleRelevantBranches &&
      canApplyRepeatCost &&
      reviewedChildren.length > 0
    ) {
      const reviewCost = reviewedChildren.reduce((sum, child) => {
        return sum + getNodeWeight(child, directoryWeight, fileWeight);
      }, 0);

      const repeatCount = relevantChildren.length - 1;
      const repeatBonus = reviewCost * repeatFactor * repeatCount;
      const perReviewedChildBonus = repeatBonus / reviewedChildren.length;

      reviewedChildren.forEach((child) => {
        addExtraCost(child.path, perReviewedChildBonus);
      });
    }

    return relevantChildren.length > 0;
  }

  walk(tree);

  const totalScore = Array.from(costByPath.values()).reduce(
    (sum, item) => sum + item.totalCost,
    0,
  );

  return {
    totalScore,
    costByPath,
  };
}
