import { registerApplication } from "single-spa";
import { getFileName } from "../helpers";
import Frontend from "./base-frontend";

class ITLabReports extends Frontend {
  async registerFrontend(baseURL, prefixes, customProps) {
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
        : "app.js");

    registerApplication({
      name: "itlab-reports",
      app: () => System.import(url),
      activeWhen: this.activityFunction(prefixes),
      customProps: {
        url: baseURL,
        ...customProps,
      },
    });
  }
}

export default new ITLabReports();
