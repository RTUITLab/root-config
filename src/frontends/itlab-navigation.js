import { registerApplication } from "single-spa";
import { getFileName } from "../helpers";
import Frontend from "./base-frontend";

class ITLabNavigation extends Frontend {
  activityFunction() {
    return true;
  }

  async registerFrontend(baseURL, customProps) {
    const fileName = (await getFileName(baseURL, "app.txt")).replace(
      /[^a-zA-Z0-9.]/g,
      ""
    );

    let url =
      baseURL +
      "/" +
      (process.env.NODE_ENV === "production"
        ? fileName
          ? "/js/" + fileName
          : ""
        : "js/app.js");

    const app = await System.import(url);

    registerApplication({
      name: "itlab-navigation",
      app: () => Promise.resolve(app),
      activeWhen: this.activityFunction,
      customProps: {
        url: baseURL,
        ...customProps,
      },
    });

    return app;
  }
}

export default new ITLabNavigation();
