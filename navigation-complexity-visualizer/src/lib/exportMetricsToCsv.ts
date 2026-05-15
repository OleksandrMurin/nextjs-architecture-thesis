import { AverageMetricsRow, ScenarioMetricsRow } from "./computeAllMetrics";

const featureLabels: Record<string, string> = {
  "post-feed": "Post feed",
  "user-post-feed": "User`s post feed",
  registration: "Registration",
  authorization: "Authorization",
  "create-post": "Create post",
  "delete-post": "Delete post",
  "update-post": "Update post",
  "add-comment": "Add comment",
  "toggle-like": "Toggle like",
  "search-filter-sort": "Search/ filter/ sort",
};

const architectureLabels: Record<string, string> = {
  monolith: "Monolith",
  modular: "Modular",
  fsd: "FSD",
};

function formatDecimal(value: number, fractionDigits = 2): string {
  return value.toFixed(fractionDigits).replace(".", ",");
}

function formatPercent(value: number): string {
  return `${formatDecimal(value * 100, 2)}%`;
}

function downloadCsv(filename: string, content: string): void {
  const blob = new Blob([`\uFEFF${content}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export function exportScenarioMetricsToCsv(rows: ScenarioMetricsRow[]): void {
  const header = [
    "Feature",
    "Architecture",
    "FTUF",
    "Visited nodes",
    "Depth",
    "Coverage",
    "Precision",
    "Navigation Score",
  ].join(";");

  const body = rows.map((row) =>
    [
      featureLabels[row.feature],
      architectureLabels[row.architecture],
      row.ftuf,
      row.visitedNodes,
      row.depth,
      formatPercent(row.coverage),
      formatPercent(row.precision),
      formatDecimal(row.navigationScore),
    ].join(";"),
  );

  const csv = [header, ...body].join("\n");

  downloadCsv("scenario-navigation-metrics.csv", csv);
}

export function exportAverageMetricsToCsv(rows: AverageMetricsRow[]): void {
  const header = [
    "Architecture",
    "FTUF",
    "Visited nodes",
    "Depth",
    "Coverage",
    "Precision",
    "Navigation Score",
  ].join(";");

  const body = rows.map((row) =>
    [
      architectureLabels[row.architecture],
      formatDecimal(row.ftuf),
      formatDecimal(row.visitedNodes),
      formatDecimal(row.depth),
      formatPercent(row.coverage),
      formatPercent(row.precision),
      formatDecimal(row.navigationScore),
    ].join(";"),
  );

  const csv = [header, ...body].join("\n");

  downloadCsv("average-navigation-metrics.csv", csv);
}
