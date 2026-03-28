export function setCookie(
  name: string,
  value: string,
  maxAgeSeconds = 60 * 60 * 24 * 7,
) {
  if (typeof document === "undefined") return;
  document.cookie =
    `${name}=${encodeURIComponent(value)}; ` +
    `Path=/; ` +
    `Max-Age=${maxAgeSeconds}; ` +
    `SameSite=Lax`;
}

export function setJsonCookie(
  name: string,
  value: unknown,
  maxAgeSeconds?: number,
) {
  setCookie(name, JSON.stringify(value), maxAgeSeconds);
}

export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export const getCSRCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
};
