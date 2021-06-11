import { registerApplication } from "single-spa";
import { prefix } from "../helpers";
import Frontend from "./base-frontend";

class ITLabProjects extends Frontend {
  activityFunction() {
    return prefix(location, "projects");
  }

  async registerFrontend(baseURL, customProps) {
    const url =
      baseURL +
      "/" +
      (process.env.NODE_ENV === "production" ? "" : "rtuitlab-projects.js");

    registerApplication({
      name: "projects",
      app: () => System.import(url),
      activeWhen: this.activityFunction,
      customProps: {
        url: baseURL,
        ...customProps,
      },
    });
  }
}

export default new ITLabProjects();
