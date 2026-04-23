import { LevelStat } from "./computeLevelStats";

export type ScenarioMetrics = {
  depth: number;
  total: number;
  reviewed: number;
  access: number;
  coverage: number;
  precision: number;
};

type ComputeScenarioMetricsOptions = {
  stats: LevelStat[];
  excludeRoot?: boolean;
};

export function computeScenarioMetrics({
  stats,
  excludeRoot = true,
}: ComputeScenarioMetricsOptions): ScenarioMetrics {
  const filteredStats = excludeRoot
    ? stats.filter((stat) => stat.level !== 0)
    : stats;

  const total = filteredStats.reduce((sum, stat) => sum + stat.total, 0);
  const reviewed = filteredStats.reduce((sum, stat) => sum + stat.reviewed, 0);
  const access = filteredStats.reduce((sum, stat) => sum + stat.access, 0);

  return {
    depth: filteredStats.length,
    total,
    reviewed,
    access,
    coverage: total > 0 ? reviewed / total : 0,
    precision: reviewed > 0 ? access / reviewed : 0,
  };
}
