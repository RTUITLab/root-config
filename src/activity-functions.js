export function prefix(location, ...prefixes) {
  return prefixes.some(
    (prefix) => location.href.indexOf(`${location.origin}/${prefix}`) !== -1
  );
}

export function itLabFront() {
  return true;
}

export function projectsFront() {
  return prefix(location, "projects");
}

export function reportsFront() {
  return prefix(location, "reports");
}
