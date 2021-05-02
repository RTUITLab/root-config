/**
 * prefix(): Checks if prefix is part of URL
 * @param {Location} location
 * @param  {...string} prefixes
 */
export function prefix(location, ...prefixes) {
  return prefixes.some(
    (prefix) => location.href.indexOf(`${location.origin}/${prefix}`) !== -1
  );
}

/**
 * getFileName(): Get app.txt
 * @param {string} url Base URL of frontend
 * @param {string} file File with .js filename
 */
export const getFileName = async (url, file) => {
  return await (await fetch(url + "/" + file)).text();
};
