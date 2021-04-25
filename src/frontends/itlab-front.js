import { registerApplication } from "single-spa";
import { getFileName } from "../helpers";
import Frontend from "./base-frontend";

class ITLabFront extends Frontend {
  async registerFrontend(baseURL, prefixes) {
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

    const app = await System.import(url);

    registerApplication({
      name: "itlab-front",
      app: () => Promise.resolve(app),
      activeWhen: this.activityFunction(prefixes),
      customProps: {
        url: baseURL,
      },
    });

    return app;
  }
}

export default new ITLabFront();
