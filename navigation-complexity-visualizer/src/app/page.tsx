"use client";

import { useMemo, useState } from "react";
import ControlPanel from "../components/ControlPanel";
import Legend from "../components/Legend";
import LevelStatsPanel from "../components/LevelStatsPanel";
import TreeGraph from "../components/TreeGraph";
import { projectTrees } from "../data/projectTrees";
import { ArchitectureKey, FeatureKey, scenarios } from "../data/scenarios";
import { computeLevelStats } from "../lib/computeLevelStats";
import { computeScenarioMetrics } from "../lib/computeScenarioMetrics";
import { buildTreeIndex } from "../lib/tree/buildTreeIndex";
import { computeAccessPaths } from "../lib/tree/computeAccessPaths";
import { computeVisibleNodes } from "../lib/tree/computeVisibleNodes";
import { pruneTreeByVisiblePaths } from "../lib/tree/pruneTree";

type VisibilityMode = "full" | "active-only" | "access-only";

export default function Home() {
  const [architecture, setArchitecture] = useState<ArchitectureKey>("fsd");
  const [feature, setFeature] = useState<FeatureKey>("create-post");
  const [direction, setDirection] = useState<"TB" | "LR">("TB");
  const [visibilityMode, setVisibilityMode] = useState<VisibilityMode>("full");

  const currentTree = useMemo(() => projectTrees[architecture], [architecture]);

  const requiredPaths = useMemo(() => {
    return new Set<string>(scenarios[architecture][feature]);
  }, [architecture, feature]);

  const treeIndex = useMemo(() => buildTreeIndex(currentTree), [currentTree]);

  const accessPaths = useMemo(
    () => computeAccessPaths(requiredPaths, treeIndex),
    [requiredPaths, treeIndex],
  );

  const visiblePaths = useMemo(
    () => computeVisibleNodes(accessPaths, treeIndex),
    [accessPaths, treeIndex],
  );

  const levelStats = useMemo(() => {
    return computeLevelStats({
      tree: currentTree,
      accessPaths,
      visiblePaths,
    });
  }, [currentTree, accessPaths, visiblePaths]);

  const scenarioMetrics = useMemo(() => {
    return computeScenarioMetrics({
      stats: levelStats,
      excludeRoot: true,
    });
  }, [levelStats]);

  const allowedPaths = useMemo(() => {
    if (visibilityMode === "full") return null;
    if (visibilityMode === "access-only") return accessPaths;
    return visiblePaths;
  }, [visibilityMode, accessPaths, visiblePaths]);

  const displayedTree = useMemo(() => {
    if (!allowedPaths) return currentTree;

    const pruned = pruneTreeByVisiblePaths(currentTree, allowedPaths);
    return pruned ?? currentTree;
  }, [currentTree, allowedPaths]);

  return (
    <main
      style={{
        padding: 24,
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: 16,
          textAlign: "center",
          fontSize: 28,
        }}
      >
        Navigation Complexity Visualizer
      </h1>

      <ControlPanel
        architecture={architecture}
        feature={feature}
        direction={direction}
        visibilityMode={visibilityMode}
        onArchitectureChange={(value) =>
          setArchitecture(value as ArchitectureKey)
        }
        onFeatureChange={(value) => setFeature(value as FeatureKey)}
        onDirectionChange={setDirection}
        onVisibilityModeChange={setVisibilityMode}
      />

      <div style={{ position: "relative" }}>
        <Legend />

        <TreeGraph
          tree={displayedTree}
          requiredPaths={requiredPaths}
          accessPaths={accessPaths}
          visiblePaths={visiblePaths}
          direction={direction}
        />
        <LevelStatsPanel stats={levelStats} />
        <div
          style={{
            marginTop: 20,
            padding: 18,
            borderRadius: 18,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
            Scenario metrics
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.7 }}>
            <div>
              Depth: <strong>{scenarioMetrics.depth}</strong>
            </div>
            <div>
              Coverage:{" "}
              <strong>{(scenarioMetrics.coverage * 100).toFixed(1)}%</strong> (
              {scenarioMetrics.reviewed}/{scenarioMetrics.total})
            </div>
            <div>
              Precision:{" "}
              <strong>{(scenarioMetrics.precision * 100).toFixed(1)}%</strong> (
              {scenarioMetrics.access}/{scenarioMetrics.reviewed})
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
