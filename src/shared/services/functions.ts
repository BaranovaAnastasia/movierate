export function constructRequestUrl(
  host: string,
  path: string,
  param?: string,
  query?: any
): string {
  const result = `${host}${path}${param ? param : ''}`;
  if (query) {
    return Object.keys(query).reduce(
      (result, key) => result += `${key}=${query[key]}&`,
      `${result}?`
    );
  }
  return result;
}