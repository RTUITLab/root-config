import { registerApplication } from "single-spa";
import Frontend from "./base-frontend";

class ITLabProjects extends Frontend {
  async registerFrontend(baseURL, prefixes, customProps) {
    const url =
      baseURL +
      "/" +
      (process.env.NODE_ENV === "production" ? "" : "rtuitlab-projects.js");

    registerApplication({
      name: "itlab-projects",
      app: () => System.import(url),
      activeWhen: this.activityFunction(prefixes),
      customProps: {
        url: baseURL,
        ...customProps,
      },
    });
  }
}

export default new ITLabProjects();
