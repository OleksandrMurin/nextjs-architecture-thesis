"use client";

import { useMemo, useState } from "react";
import ControlPanel from "../components/ControlPanel";
import Legend from "../components/Legend";
import LevelStatsPanel from "../components/LevelStatsPanel";
import TreeGraph from "../components/TreeGraph";
import { projectTrees } from "../data/projectTrees";
import { ArchitectureKey, FeatureKey, scenarios } from "../data/scenarios";
import {
  computeAllScenarioMetrics,
  computeAverageMetrics,
} from "../lib/computeAllMetrics";
import { computeLevelStats } from "../lib/computeLevelStats";
import { computeNavigationScore } from "../lib/computeNavigationScore";
import { computeScenarioMetrics } from "../lib/computeScenarioMetrics";
import {
  exportAverageMetricsToCsv,
  exportScenarioMetricsToCsv,
} from "../lib/exportMetricsToCsv";
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
  const [showNavigationCost, setShowNavigationCost] = useState<boolean>(true);

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

  const navigationScore = useMemo(() => {
    return computeNavigationScore({
      tree: currentTree,
      requiredPaths,
      visiblePaths,
      directoryWeight: 0.5,
      fileWeight: 1,
      repeatFactor: 0.5,
    });
  }, [currentTree, requiredPaths, visiblePaths]);

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

  const allScenarioMetrics = useMemo(() => {
    return computeAllScenarioMetrics();
  }, []);

  const averageMetrics = useMemo(() => {
    return computeAverageMetrics(allScenarioMetrics);
  }, [allScenarioMetrics]);

  return (
    <main
      style={{
        padding: 24,
        background: "#f3f6fb",
        minHeight: "100vh",
      }}
    >
      <ControlPanel
        architecture={architecture}
        feature={feature}
        direction={direction}
        visibilityMode={visibilityMode}
        showNavigationCost={showNavigationCost}
        onArchitectureChange={(value) =>
          setArchitecture(value as ArchitectureKey)
        }
        onFeatureChange={(value) => setFeature(value as FeatureKey)}
        onDirectionChange={setDirection}
        onVisibilityModeChange={setVisibilityMode}
        onShowNavigationCostChange={setShowNavigationCost}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <button
          type="button"
          onClick={() => exportScenarioMetricsToCsv(allScenarioMetrics)}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Export scenario metrics CSV
        </button>

        <button
          type="button"
          onClick={() => exportAverageMetricsToCsv(averageMetrics)}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Export average metrics CSV
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 380px",
          gap: 20,
          alignItems: "start",
        }}
      >
        <div
          style={{
            position: "relative",
            minWidth: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              zIndex: 10,
            }}
          >
            <Legend />
          </div>

          <TreeGraph
            tree={displayedTree}
            requiredPaths={requiredPaths}
            accessPaths={accessPaths}
            visiblePaths={visiblePaths}
            direction={direction}
            costByPath={navigationScore.costByPath}
            showNavigationCost={showNavigationCost}
          />
        </div>

        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <LevelStatsPanel stats={levelStats} />

          <div
            style={{
              padding: 18,
              borderRadius: 18,
              background: "##eef2ff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
              Scenario metrics
            </div>

            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              <div>
                FTUF: <strong>{requiredPaths.size}</strong>
              </div>
              <div>
                Visited nodes: <strong>{scenarioMetrics.reviewed}</strong>
              </div>
              <div>
                Depth: <strong>{scenarioMetrics.depth}</strong>
              </div>
              <div>
                Coverage:{" "}
                <strong>{(scenarioMetrics.coverage * 100).toFixed(1)}%</strong>{" "}
                ({scenarioMetrics.reviewed}/{scenarioMetrics.total})
              </div>
              <div>
                Precision:{" "}
                <strong>{(scenarioMetrics.precision * 100).toFixed(1)}%</strong>{" "}
                ({scenarioMetrics.access}/{scenarioMetrics.reviewed})
              </div>
              <div>
                Navigation score:{" "}
                <strong>{navigationScore.totalScore.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
