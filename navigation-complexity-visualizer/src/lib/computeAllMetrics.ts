import { projectTrees } from "../data/projectTrees";
import { ArchitectureKey, FeatureKey, scenarios } from "../data/scenarios";
import { computeLevelStats } from "./computeLevelStats";
import { computeNavigationScore } from "./computeNavigationScore";
import { computeScenarioMetrics } from "./computeScenarioMetrics";
import { buildTreeIndex } from "./tree/buildTreeIndex";
import { computeAccessPaths } from "./tree/computeAccessPaths";
import { computeVisibleNodes } from "./tree/computeVisibleNodes";

export type ScenarioMetricsRow = {
  feature: FeatureKey;
  architecture: ArchitectureKey;
  ftuf: number;
  visitedNodes: number;
  depth: number;
  coverage: number;
  precision: number;
  navigationScore: number;
};

export type AverageMetricsRow = {
  architecture: ArchitectureKey;
  ftuf: number;
  visitedNodes: number;
  depth: number;
  coverage: number;
  precision: number;
  navigationScore: number;
};

const architectures = Object.keys(scenarios) as ArchitectureKey[];

const features = Object.keys(scenarios.monolith) as FeatureKey[];

export function computeMetricsForScenario(
  architecture: ArchitectureKey,
  feature: FeatureKey,
): ScenarioMetricsRow {
  const tree = projectTrees[architecture];
  const requiredPaths = new Set<string>(scenarios[architecture][feature]);

  const treeIndex = buildTreeIndex(tree);
  const accessPaths = computeAccessPaths(requiredPaths, treeIndex);
  const visiblePaths = computeVisibleNodes(accessPaths, treeIndex);

  const levelStats = computeLevelStats({
    tree,
    accessPaths,
    visiblePaths,
  });

  const scenarioMetrics = computeScenarioMetrics({
    stats: levelStats,
    excludeRoot: true,
  });

  const navigationScore = computeNavigationScore({
    tree,
    requiredPaths,
    visiblePaths,
    directoryWeight: 0.5,
    fileWeight: 1,
    repeatFactor: 0.5,
  });

  return {
    feature,
    architecture,
    ftuf: requiredPaths.size,
    visitedNodes: scenarioMetrics.reviewed,
    depth: scenarioMetrics.depth,
    coverage: scenarioMetrics.coverage,
    precision: scenarioMetrics.precision,
    navigationScore: navigationScore.totalScore,
  };
}

export function computeAllScenarioMetrics(): ScenarioMetricsRow[] {
  return features.flatMap((feature) =>
    architectures.map((architecture) =>
      computeMetricsForScenario(architecture, feature),
    ),
  );
}

export function computeAverageMetrics(
  rows: ScenarioMetricsRow[],
): AverageMetricsRow[] {
  return architectures.map((architecture) => {
    const architectureRows = rows.filter(
      (row) => row.architecture === architecture,
    );

    const count = architectureRows.length;

    const sum = architectureRows.reduce(
      (acc, row) => {
        acc.ftuf += row.ftuf;
        acc.visitedNodes += row.visitedNodes;
        acc.depth += row.depth;
        acc.coverage += row.coverage;
        acc.precision += row.precision;
        acc.navigationScore += row.navigationScore;
        return acc;
      },
      {
        ftuf: 0,
        visitedNodes: 0,
        depth: 0,
        coverage: 0,
        precision: 0,
        navigationScore: 0,
      },
    );

    return {
      architecture,
      ftuf: sum.ftuf / count,
      visitedNodes: sum.visitedNodes / count,
      depth: sum.depth / count,
      coverage: sum.coverage / count,
      precision: sum.precision / count,
      navigationScore: sum.navigationScore / count,
    };
  });
}
