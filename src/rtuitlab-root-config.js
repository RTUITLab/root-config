import { start } from "single-spa";
import ITLabFront from "./frontends/itlab-front";
import ITLabProjects from "./frontends/itlab-projects";
import ITLabReports from "./frontends/itlab-reports";

// Generate menu links and activation functions' prefixes
const getRoutes = async (frontends) => {
  const prefixes = {};
  let routeParts = await Promise.all(
    Object.values(frontends).map((val) => fetch(val + "/routes.json"))
  );
  routeParts = await Promise.all(routeParts.map((route) => route.json()));

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

  routeParts = routeParts.sort((a, b) => a.part - b.part);

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

// Configuration of microfrontends (e.g. registration)
const configure = async () => {
  // Get base URLs of all frontends (config.json)
  const frontends = await (await fetch("/config.json")).json();

  const { routes, prefixes } = await getRoutes(frontends);

  const mainFront = await ITLabFront.registerFrontend(
    frontends.itlab,
    prefixes.itlab
  );
  ITLabReports.registerFrontend(frontends.reports, prefixes.reports, {
    userManager: mainFront.manager,
  });
  ITLabProjects.registerFrontend(frontends.projects, prefixes.projects, {
    projectsAPIUrl:
      frontends.projects_api_base || "http://localhost:5503" + "/api/projects",
  });

  start({
    urlRerouteOnly: false,
  });
};

configure();
