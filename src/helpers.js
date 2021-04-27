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

/**
 * getRoutes(frontends): Generate menu links and activation functions' prefixes
 * @param {object} frontends { "frontendName": "URL"}
 * @returns Array or routes and array of prefixes
 */
export const getRoutes = async (frontends) => {
  const prefixes = {};
  let routeParts = await Promise.all(
    Object.values(frontends).map(
      (val) =>
        new Promise((resolve) => {
          fetch(val + "/routes.json")
            .then((res) =>
              res
                .json()
                .then((data) => resolve(data))
                .catch((e) => {
                  console.log("CAN'T LOAD ROUTES:", e); // eslint-disable-line no-console
                  resolve(undefined);
                })
            )
            .catch((e) => {
              console.log("CAN'T LOAD ROUTES:", e); // eslint-disable-line no-console
              resolve(undefined);
            });
        })
    )
  );

  routeParts.forEach((_routes, i) => {
    try {
      let frontend = Object.keys(frontends)[i];
      prefixes[frontend] = _routes.groups.map(({ sections }) =>
        sections.map(({ homeURL }) => homeURL.replace(/^\//, ""))
      );
      prefixes[frontend] = [].concat(...prefixes[frontend]);
    } catch (e) {
      console.log("CAN'T LOAD ROUTES:", e); // eslint-disable-line no-console
    }
  });

  routeParts = routeParts
    .sort((a, b) => a.part - b.part)
    .filter((val) => !!val);

  let routes = [];
  routeParts.forEach(({ groups }) => {
    groups.forEach((_group) => {
      let added = false;

      routes = routes.map((group) => {
        if (group.name === _group.name) {
          added = true;
          group.sections = group.sections.concat(_group.sections);
        }

        return group;
      });

      if (!added) {
        routes.push(_group);
      }
    });
  });

  return { routes, prefixes };
};
