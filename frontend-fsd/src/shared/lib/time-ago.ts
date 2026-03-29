export function timeAgo(date: string | Date) {
  const now = new Date().getTime();
  const past = new Date(date).getTime();
  const diffMs = now - past;

  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;

  const days = Math.floor(hours / 24);
  return `${days} d ago`;
}
