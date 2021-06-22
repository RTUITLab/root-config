import { registerApplication } from "single-spa";
import { getFileName, prefix } from "../helpers";
import Frontend from "./base-frontend";

class ITLabReports extends Frontend {
  activityFunction() {
    return prefix(location, "purchases");
  }

  async registerFrontend(baseURL, customProps) {
    let url = baseURL + "/app.js";

    registerApplication({
      name: "itlab-purchases",
      app: () => System.import(url),
      activeWhen: this.activityFunction,
      customProps: {
        url: baseURL,
        ...customProps,
      },
    });
  }
}

export default new ITLabReports();
