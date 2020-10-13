import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "@rtuitlab/itlab-front",
  app: () => System.import("@rtuitlab/itlab-front"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@rtuitlab/projects",
  app: () => System.import("@rtuitlab/projects"),
  activeWhen: ["/projects"],
  customProps: { projectsAPIUrl: "http://localhost:5506/api/projects" },
});

start({
  urlRerouteOnly: true,
});
