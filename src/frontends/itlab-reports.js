import { registerApplication } from "single-spa";
import { getFileName, prefix } from "../helpers";
import Frontend from "./base-frontend";

class ITLabReports extends Frontend {
  activityFunction() {
    return prefix(location, "reports");
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
        : "app.js");

    registerApplication({
      name: "itlab-reports",
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
