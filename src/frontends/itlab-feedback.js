import { registerApplication } from "single-spa";
import { prefix } from "../helpers";
import Frontend from "./base-frontend";

class ITLabFeedback extends Frontend {
  activityFunction() {
    return prefix(location, "feedback");
  }

  async registerFrontend(baseURL, customProps) {
    const url =
      baseURL + "/" + (process.env.NODE_ENV === "production" ? "" : "app.js");

    registerApplication({
      name: "feedback",
      app: () => System.import(url),
      activeWhen: this.activityFunction,
      customProps: {
        url: baseURL,
        ...customProps,
      },
    });
  }
}

export default new ITLabFeedback();
