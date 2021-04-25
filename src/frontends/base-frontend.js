import { prefix } from "../helpers";

export default class Frontend {
  activityFunction(prefixes) {
    return () => prefix(location, ...prefixes);
  }

  /**
   * registerApplication(): Register frontend
   * @param {string} baseURL Base URL of frontend
   * @param {...string} prefixes Paths for activation function (default = [])
   * @param {object} customProps Custom props of frontend (default = {})
   */
  async registerFrontend(baseURL, prefixes = [], customProps = {}) {
    throw new Error("You have to implement the method activityFunction!");
  }
}
