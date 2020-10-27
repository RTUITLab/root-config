import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";
import frontends from "./config.json";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "itlab-front",
  app: () => System.import(frontends.itlab),
  activeWhen: isActive.itLabFront,
});

registerApplication({
  name: "projects",
  app: () => System.import(frontends.projects),
  activeWhen: isActive.projectsFront,
  customProps: {
    projectsAPIUrl: "http://localhost:5503/api/",
    domElement: document.getElementById("projects-page"),
  },
});

start({
  urlRerouteOnly: true,
});
