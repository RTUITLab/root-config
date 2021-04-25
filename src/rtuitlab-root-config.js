import { start } from "single-spa";
import { getRoutes } from "./helpers";
import ITLabFront from "./frontends/itlab-front";
import ITLabProjects from "./frontends/itlab-projects";
import ITLabReports from "./frontends/itlab-reports";

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
