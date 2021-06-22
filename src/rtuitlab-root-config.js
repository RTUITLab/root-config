import { start } from "single-spa";
import ITLabFront from "./frontends/itlab-front";
import ITLabProjects from "./frontends/itlab-projects";
import ITLabPurchases from "./frontends/itlab-purchases";
import ITLabReports from "./frontends/itlab-reports";

// registerApplication({
//   name: '@single-spa/welcome',
//   app: () =>
//     System.import(
//       'https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js'
//     ),
//   activeWhen: ['/'],
// });

const configure = async () => {
  // Get base URLs of all frontends (config.json)
  const frontends = await (await fetch("/config.json")).json();

  const mainFront = await ITLabFront.registerFrontend(frontends.itlab);
  ITLabReports.registerFrontend(frontends.reports, {
    userManager: mainFront.manager,
  });
  ITLabProjects.registerFrontend(frontends.projects, {
    projectsAPIUrl:
      frontends.projects_api_base || "http://localhost:5503" + "/api/projects",
  });
  ITLabPurchases.registerFrontend(frontends.purchases, {
    userManager: mainFront.manager,
  });

  start({
    urlRerouteOnly: false,
  });
};

configure();
