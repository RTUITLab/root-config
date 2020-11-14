import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

const configure = async () => {
  const frontends = await (await fetch("config.json")).json();
  let fileName = "";

  if (process.env.NODE_ENV === "production") {
    fileName = (
      await (await fetch(frontends.itlab + "/app.txt")).text()
    ).replace(/[^a-zA-Z0-9.]/g, "");
  }

  registerApplication({
    name: "itlab-front",
    app: () =>
      System.import(frontends.itlab + (fileName ? "/js/" + fileName : "")),
    activeWhen: isActive.itLabFront,
  });

  registerApplication({
    name: "projects",
    app: () => System.import(frontends.projects),
    activeWhen: isActive.projectsFront,
    customProps: {
      projectsAPIUrl:
        (frontends.projects_api_base || "http://localhost:5503") +
        "/api/projects",
      domElement: document.getElementById("projects-page"),
    },
  });

  start({
    urlRerouteOnly: true,
  });
};

configure();
