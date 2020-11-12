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

const configure = async () => {
  let fileName = "";

  if (process.env.NODE_ENV === "production") {
    fileName = (
      await (await fetch(frontends.itlab + "/app.txt")).text()
    ).replace(/[^a-zA-Z0-9.]/g, "");
  }

  console.log(frontends.itlab + (fileName ? "/js/" + fileName : ""));

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
      projectsAPIUrl: "http://localhost:5503/api/projects",
      domElement: document.getElementById("projects-page"),
    },
  });

  start({
    urlRerouteOnly: true,
  });
};

configure();
