/** Локальный путь из `public` или полный URL. Для `https://` возвращает как есть. */
export function assetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path
  }
  const parts = path.split('/').filter((p) => p.length > 0)
  return '/' + parts.map(encodeURIComponent).join('/')
}
